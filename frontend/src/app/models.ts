import Review from "../models/Review";

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

export interface ProductResponse {
    id: number;
    name: string;
    description: string;
    price: string;
    imageUrl: string;
    category: string;
    stock: number;
    createdAt?: string;
    updatedAt?: string;
    averageRating: string,
}

export type AddReviewRequest = Omit<Review, 'id' | 'createdAt'>;
export type UpdateReviewRequest = Omit<Review, 'createdAt'>;