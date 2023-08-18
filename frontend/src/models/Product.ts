export default interface Product {
    id: number;                // Unique identifier for the product
    name: string;              // Name of the product
    description: string;       // Product description
    price: number;             // Product price
    imageUrl: string;          // URL to the product image
    category: string;          // Category to which the product belongs
    stock: number;             // Number of items in stock
    createdAt?: Date;          // Date when the product was added (optional)
    updatedAt?: Date;          // Date when the product was last updated (optional)
}