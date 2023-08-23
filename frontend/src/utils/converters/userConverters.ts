import { UserLoginOriginalResponse } from "../../app/models";
import User from "../../models/User";

export function convertToUser(response: UserLoginOriginalResponse): User {
    return {
        email: response.email,
        firstName: response.first_name,
        lastName: response.last_name,
        id: response.id,
        username: response.username,
        token: response.token,
        image: response.image,
    };
}