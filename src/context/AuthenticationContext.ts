import { createContext } from 'react';
import { User } from '../types/User';

// The logged-in user and a way to change it.
export type AuthenticationContextObject = {
    value: User; // The logged-in user
    setValue: (newValue: User | undefined) => void; // Sets the logged-in user, or undefined to log out
};

// Shares the logged-in user with every screen in the app.
export const AuthenticationContext = createContext<AuthenticationContextObject | null>(null);
