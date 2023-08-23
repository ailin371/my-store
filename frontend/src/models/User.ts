export default interface User {
    username: string,
    email: string,
    firstName: string,
    lastName: string,
    id: number,
    token: string,
    image: string | null; // URL to the image
};