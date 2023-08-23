import Product from "./Product";

export interface PurchaseItem {
    id: string;
    purchase: string;
    product: Product;
    quantity: number;
    priceAtPurchase: number;
}