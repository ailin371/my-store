import { ProductResponse } from "../../app/models";
import Product from "../../models/Product";

export function convertToProduct(response: ProductResponse): Product {
    return {
        ...response,
        price: parseFloat(response.price),
        averageRating: parseFloat(response.averageRating),
    };
}
