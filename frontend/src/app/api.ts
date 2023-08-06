import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { UserRegistrationResponse, UserRegistrationRequest, UserLoginRequest, UserLoginOriginalResponse, UserLoginResponse } from './models';


const api = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8000' }),
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
    }),
});

export const { useRegisterUserMutation, useLoginUserMutation, useLogoutUserMutation } = api;
export default api;