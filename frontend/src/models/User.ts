import Product from "./Product";

export default interface User {
    username: string,
    email: string,
    firstName: string,
    lastName: string,
    userId: number,
    purchasedProducts: Product[],
};