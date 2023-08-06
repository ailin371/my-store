export type ResponseStatus = "success" | "error";

export interface ApiResponse<T> {
    status: ResponseStatus,
    data: T,
}

export interface UserRegistrationRequest {
    first_name: string,
    last_name: string,
    email: string,
    username: string,
    password: string,
}

export type UserRegistrationResponse = ApiResponse<UserRegistrationRequest>;

export interface UserLoginRequest {
    username: string,
    password: string,
}

export interface UserLoginOriginalResponse {
    user_id: number,
    first_name: string,
    last_name: string,
    email: string,
    username: string,
}

export interface UserLoginResponse {
    userId: number,
    firstName: string,
    lastName: string,
    email: string,
    username: string,
}