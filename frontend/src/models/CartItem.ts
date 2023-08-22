import Product from "./Product";

export default interface CartItem {
    id: number,
    cartId: number,
    product: Product,
    quantity: number,
}