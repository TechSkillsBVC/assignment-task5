import { createContext } from 'react'; // Import the createContext function from React to create a new context.
import { User } from '../types/User';  // Import the User type from the types folder, defining the shape of a User object.

/**
 * Type definition for the authentication context object.
 * - `value`: The current authenticated user's data of type `User`.
 * - `setValue`: A function to update the `value`, accepting a new `User` object or `undefined` (to clear the value).
 */
export type AuthenticationContextObject = {
    value: User; // The current user data stored in the context.
    setValue: (newValue: User | undefined) => void; // Function to update the current user data.
};

/**
 * Creates a new context for managing authentication data.
 * - Initial value is `null`, meaning no user is logged in by default.
 * - The context provides both the user data (`value`) and a way to update it (`setValue`).
 */
export const AuthenticationContext = createContext<AuthenticationContextObject | null>(null);
