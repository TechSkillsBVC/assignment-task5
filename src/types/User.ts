// Define the structure of a User object with strict typing.
export interface User {
    name: {
        first: string; // The user's first name.
        last: string;  // The user's last name.
    };
    email: string;     // The user's email address.
    id: string;        // A unique identifier for the user.
    mobile: string;    // The user's mobile phone number.
}
