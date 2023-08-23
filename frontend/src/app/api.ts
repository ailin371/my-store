import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { UserRegistrationResponse, UserRegistrationRequest, UserLoginRequest, UserLoginOriginalResponse, UserLoginResponse, ProductResponse, AddReviewRequest, UpdateReviewRequest, CheckoutResponse, UserPurchasedProductResponse } from './models';
import Product from '../models/Product';
import { convertToProduct } from '../utils/converters/productConverters';
import Review from '../models/Review';
import Cart from '../models/Cart';
import CartItem from '../models/CartItem';
import { convertToCart } from '../utils/converters/cartConverters';
import { Purchase } from '../models/Purchase';
import { convertToUser } from '../utils/converters/userConverters';
import { BASE_URL } from './constants';
import User from '../models/User';


const baseQuery = fetchBaseQuery({
    baseUrl: `${BASE_URL}/api`,
    prepareHeaders: (headers) => {
        const userString = sessionStorage.getItem("user");
        if (userString) {
            const user: UserLoginResponse = JSON.parse(userString);

            if (user) {
                const token = user.token;

                if (token) {
                    headers.set('authorization', `Token ${token}`);
                }
            }
        }

        return headers;
    },
});

const api = createApi({
    reducerPath: 'api',
    baseQuery,
    tagTypes: ['reviews', 'cart', 'product'],
    endpoints: (builder) => ({
        registerUser: builder.mutation<UserRegistrationResponse, Partial<UserRegistrationRequest>>({
            query: (newUser) => ({
                url: '/register/',
                method: 'POST',
                body: newUser,
            }),
        }),
        loginUser: builder.mutation<UserLoginResponse, Partial<UserLoginRequest>>({
            query: (credentials) => ({
                url: '/login/',
                method: 'POST',
                body: credentials,
            }),
            transformResponse: convertToUser,
            invalidatesTags: ['reviews', 'cart'],
        }),
        logoutUser: builder.mutation({
            query: () => ({
                url: '/logout/',
                method: 'POST',
                body: {}
            }),
            invalidatesTags: ['reviews', 'cart'],
        }),
        updateProfilePicture: builder.mutation<Omit<User, 'token'>, File>({
            query: (file: File) => {
                const formData = new FormData();
                formData.append('image', file);
                return {
                    url: 'user/update-profile-picture/',
                    method: 'PUT',
                    body: formData,
                }
            },
            transformResponse: (res: UserLoginOriginalResponse) => ({
                ...res,
                firstName: res.first_name,
                lastName: res.last_name
            }),
        }),
        getProducts: builder.query<Product[], { category?: string }>({
            query: ({ category }) => ({
                url: '/products/',
                method: 'GET',
                params: {
                    category
                }
            }),
            transformResponse: (response: ProductResponse[]) => response.map(convertToProduct),
        }),
        getProduct: builder.query<Product, { id: string }>({
            query: ({ id }) => ({
                url: `/products/${id}`,
                method: 'GET',
            }),
            transformResponse: convertToProduct,
            providesTags: ['product'],
        }),
        getProductReviews: builder.query<Review[], { productId: number }>({
            query: ({ productId }) => ({
                url: `/products/${productId}/reviews/`,
                method: 'GET',
            }),
            providesTags: ['reviews'],
        }),
        addReview: builder.mutation<Review, AddReviewRequest>({
            query: ({ product: productId, user: userId, ...review }) => {
                return {
                    url: `/products/${productId}/reviews/`,
                    method: 'POST',
                    body: {
                        ...review,
                        product: productId,
                        user: userId,
                    },
                    credentials: 'include',
                };
            },
            invalidatesTags: ['reviews', 'product'],
        }),
        updateReview: builder.mutation<Review, UpdateReviewRequest>({
            query: ({ product: productId, id, ...review }) => ({
                url: `/products/${productId}/reviews/${id}/`,
                method: 'PUT',
                body: {
                    ...review,
                    product: productId,
                },
                credentials: 'include',
            }),
            invalidatesTags: ['reviews', 'product'],
        }),
        deleteReview: builder.mutation<{ success: boolean }, { productId: number, id: number }>({
            query: ({ productId, id }) => {
                return {
                    url: `/products/${productId}/reviews/${id}/`,
                    method: 'DELETE',
                    credentials: 'include',
                };
            },
            invalidatesTags: ['reviews', 'product'],
        }),
        getCart: builder.query<Cart, void>({
            query: () => 'cart/',
            transformResponse: convertToCart,
            providesTags: ['cart'],
        }),
        addItemToCart: builder.mutation<CartItem, Partial<CartItem>>({
            query: (newItem) => {
                return {
                    url: 'cart/items/',
                    method: 'POST',
                    body: newItem,
                    credentials: 'include',
                };
            },
            invalidatesTags: ['cart'],
        }),
        updateCartItem: builder.mutation<CartItem, { id: number, updates: Partial<Omit<CartItem, 'cartId' | 'id'>> }>({
            query: ({ id, updates }) => ({
                url: `cart/items/${id}/`,
                method: 'PATCH',  // Use PATCH for partial updates
                body: updates,
                credentials: 'include',
            }),
            invalidatesTags: ['cart'],
        }),
        removeCartItem: builder.mutation<{ success: boolean, id: number }, number>({
            query: (id) => {
                return {
                    url: `cart/items/${id}/`,
                    method: 'DELETE',
                    credentials: 'include',
                };
            },
            invalidatesTags: ['cart'],
        }),
        checkout: builder.mutation<CheckoutResponse, void>({
            query: () => ({
                url: 'cart/checkout/',
                method: 'POST',
            }),
            invalidatesTags: ['cart']
        }),
        userPurchasedProduct: builder.query<UserPurchasedProductResponse, number>({
            query: (productId) => `user/purchased/${productId}/`,
            providesTags: ['cart'],
        }),
        getPurchaseHistory: builder.query<Purchase[], void>({
            query: () => '/user/purchases/',
            providesTags: ['cart'],
        }),
    }),
});

export const {
    useRegisterUserMutation, useLoginUserMutation, useLogoutUserMutation, useUpdateProfilePictureMutation,
    useGetProductsQuery, useGetProductQuery, useLazyGetProductQuery,
    useGetProductReviewsQuery, useLazyGetProductReviewsQuery, useAddReviewMutation, useUpdateReviewMutation,
    useGetCartQuery, useAddItemToCartMutation, useUpdateCartItemMutation, useRemoveCartItemMutation, useCheckoutMutation,
    useUserPurchasedProductQuery, useGetPurchaseHistoryQuery,
} = api;
export default api;