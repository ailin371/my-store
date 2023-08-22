import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { UserRegistrationResponse, UserRegistrationRequest, UserLoginRequest, UserLoginOriginalResponse, UserLoginResponse, ProductResponse } from './models';
import Product from '../models/Product';
import { convertToProduct } from '../utils/converters/convertToProduct';


const api = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8000/api' }),
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
    }),
});

export const {
    useRegisterUserMutation, useLoginUserMutation, useLogoutUserMutation,
    useGetProductsQuery, useGetProductQuery, useLazyGetProductQuery,
} = api;
export default api;