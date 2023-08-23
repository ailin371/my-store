import { PurchaseItem } from "./PurchaseItem";

export interface Purchase {
    id: number;
    user: number;
    purchaseDate: string;
    totalCost: number;
    items: PurchaseItem[];
}