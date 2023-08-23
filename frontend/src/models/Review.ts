export default interface Review {
    id: number;
    product: number;
    user: number;
    rating: number;
    comment: string;
    createdAt?: string;
}