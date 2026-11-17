/**
 * User describes a person using the app, as returned by the fake API's
 * `/login` endpoint and stored in `AuthenticationContext` while they are
 * logged in.
 */
export interface User {
    /** The user's full name, split into first and last. */
    name: {
        first: string;
        last: string;
    };
    /** The user's email address, used to log in. */
    email: string;
    /** The user's unique identifier in the backend. */
    id: string;
    /** The user's mobile phone number, as a formatted string. */
    mobile: string;
}
