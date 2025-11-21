import { createContext } from 'react';
import { User } from '../types/User';

/**
 * AuthenticationContextObject
 * ---------------------------
 * Describes the shape of the Authentication Context.
 *
 * @property value
 *  - The currently authenticated user.
 *  - If no user is logged in, this may be undefined.
 *
 * @property setValue
 *  - Function used to update the current authenticated user.
 *  - Accepts either a User object or undefined (for logout).
 */
export type AuthenticationContextObject = {
    value: User;
    setValue: (newValue: User | undefined) => void;
};

/**
 * AuthenticationContext
 * ---------------------
 * A React Context that holds the authentication state for the entire app.
 *
 * Responsibilities:
 * - Provide access to the authenticated user.
 * - Allow screens to update authentication information (login/logout).
 *
 * The default value is `null` until provided by <AuthenticationContext.Provider>.
 */
export const AuthenticationContext = createContext<AuthenticationContextObject | null>(null);
