/**
 * User Interface
 * ---------------
 * Represents the structure of a user object stored and used
 * throughout the application.
 *
 * Responsibilities:
 * - Defines the expected shape of user data returned from the API.
 * - Provides strong typing for authentication, caching, and UI components.
 *
 * Properties:
 * @property name
 *  - Contains the user's first and last name.
 *
 * @property email
 *  - User's email address (used for login and display).
 *
 * @property id
 *  - Unique identifier for the user.
 *
 * @property mobile
 *  - User's mobile phone number.
 */
export interface User {
    name: {
        first: string;
        last: string;
    };
    email: string;
    id: string;
    mobile: string;
}
