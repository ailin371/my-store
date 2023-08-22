import { CartItemResponse, GetCartResponse } from "../../app/models";
import Cart from "../../models/Cart";
import CartItem from "../../models/CartItem";
import { convertToProduct } from "./productConverters";

export function convertToCartItem(response: CartItemResponse): CartItem {
    return {
        ...response,
        product: convertToProduct(response.product),
    };
}

export function convertToCart(response: GetCartResponse): Cart {
    return {
        ...response,
        items: response.items.map(convertToCartItem),
        totalPrice: parseFloat(response.totalPrice),
    };
}