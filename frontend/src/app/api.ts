import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { UserRegistrationResponse, UserRegistrationRequest, UserLoginRequest, UserLoginOriginalResponse, UserLoginResponse, ProductResponse, AddReviewRequest, UpdateReviewRequest } from './models';
import Product from '../models/Product';
import { convertToProduct } from '../utils/converters/convertToProduct';
import Review from '../models/Review';


const api = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8000/api' }),
    tagTypes: ['reviews'],
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
                username: res.username
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
                    product_id: productId
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
            }),
            invalidatesTags: ['reviews'],
        }),
        updateReview: builder.mutation<Review, UpdateReviewRequest>({
            query: ({ id, ...review }) => ({
                url: `/reviews/${id}/`,
                method: 'PUT',
                body: review,
            }),
            invalidatesTags: ['reviews'],
        }),
        deleteReview: builder.mutation<{ success: boolean }, { id: number }>({
            query: ({ id }) => ({
                url: `/reviews/${id}/`,
                method: 'DELETE',
            }),
            invalidatesTags: ['reviews'],
        }),
    }),
});

export const {
    useRegisterUserMutation, useLoginUserMutation, useLogoutUserMutation,
    useGetProductsQuery, useGetProductQuery, useLazyGetProductQuery,
    useGetProductReviewsQuery, useLazyGetProductReviewsQuery, useAddReviewMutation, useUpdateReviewMutation,
} = api;
export default api;