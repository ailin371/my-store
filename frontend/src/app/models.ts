import Cart from "../models/Cart";
import CartItem from "../models/CartItem";
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
    id: number,
    first_name: string,
    last_name: string,
    email: string,
    username: string,
    token: string,
    image: string | null,
}

export interface UserLoginResponse {
    id: number,
    firstName: string,
    lastName: string,
    email: string,
    username: string,
    token: string,
    image: string | null,
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

export interface CartItemResponse extends Omit<CartItem, 'product'> {
    product: ProductResponse,
}
export interface GetCartResponse extends Omit<Cart, 'items' | 'totalPrice'> {
    items: CartItemResponse[],
    totalPrice: string,
}

export interface CheckoutResponse {
    status: string;
}

export interface UserPurchasedProductResponse {
    purchased: boolean;
}