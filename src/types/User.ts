// Defines the structure of a user profile object, including their first/last name, email, ID, and phone number.
export interface User {
    name: {
        first: string;
        last: string;
    };
    email: string;
    id: string;
    mobile: string;
}
