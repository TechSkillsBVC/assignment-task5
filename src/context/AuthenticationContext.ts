import { createContext } from 'react';
import { User } from '../types/User';
// Defines the auth context holding the current user object and a setter function to update or clear it.
export type AuthenticationContextObject = {
    value: User;
    setValue: (newValue: User | undefined) => void;
};
// Established the authentication state across components, defaulting to null when unauthenticated.
export const AuthenticationContext = createContext<AuthenticationContextObject | null>(null);
