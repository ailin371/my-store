import CartItem from "./CartItem";


export default interface Cart {
    id: number,
    items: CartItem[],
    totalQuantity: number,
    totalPrice: number,
    user: number,
}