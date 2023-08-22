import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { UserRegistrationResponse, UserRegistrationRequest, UserLoginRequest, UserLoginOriginalResponse, UserLoginResponse, ProductResponse, AddReviewRequest, UpdateReviewRequest, GetCartResponse } from './models';
import Product from '../models/Product';
import { convertToProduct } from '../utils/converters/productConverters';
import Review from '../models/Review';
import Cart from '../models/Cart';
import CartItem from '../models/CartItem';
import { convertToCart } from '../utils/converters/cartConverters';


const baseQuery = fetchBaseQuery({
    baseUrl: "http://localhost:8000/api",
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
    tagTypes: ['reviews', 'cart'],
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
            transformResponse: (res: UserLoginOriginalResponse) => ({
                email: res.email,
                firstName: res.first_name,
                lastName: res.last_name,
                userId: res.user_id,
                username: res.username,
                token: res.token,
            })
        }),
        logoutUser: builder.mutation({
            query: () => ({
                url: '/logout/',
                method: 'POST',
                body: {}
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
        }),
        getProductReviews: builder.query<Review[], { productId: number }>({
            query: ({ productId }) => ({
                url: '/reviews',
                method: 'GET',
                params: {
                    productId
                }
            }),
        }),
        getReview: builder.query<Review, { id: number }>({
            query: ({ id }) => ({
                url: `/reviews/${id}/`,
                method: 'GET',
            }),
        }),
        addReview: builder.mutation<Review, AddReviewRequest>({
            query: (review) => ({
                url: '/reviews/',
                method: 'POST',
                body: review,
                credentials: 'include',
            }),
            invalidatesTags: ['reviews'],
        }),
        updateReview: builder.mutation<Review, UpdateReviewRequest>({
            query: ({ id, ...review }) => ({
                url: `/reviews/${id}/`,
                method: 'PUT',
                body: review,
                credentials: 'include',
            }),
            invalidatesTags: ['reviews'],
        }),
        deleteReview: builder.mutation<{ success: boolean }, { id: number }>({
            query: ({ id }) => ({
                url: `/reviews/${id}/`,
                method: 'DELETE',
                credentials: 'include',
            }),
            invalidatesTags: ['reviews'],
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
            query: (id) => ({
                url: `cart/items/${id}/`,
                method: 'DELETE',
                credentials: 'include',
            }),
            invalidatesTags: ['cart'],
        }),
    }),
});

export const {
    useRegisterUserMutation, useLoginUserMutation, useLogoutUserMutation,
    useGetProductsQuery, useGetProductQuery, useLazyGetProductQuery,
    useGetProductReviewsQuery, useLazyGetProductReviewsQuery, useAddReviewMutation, useUpdateReviewMutation,
    useGetCartQuery, useAddItemToCartMutation, useUpdateCartItemMutation, useRemoveCartItemMutation,
} = api;
export default api;