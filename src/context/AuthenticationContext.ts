import { createContext } from 'react'; 
// Importing React's createContext function to create a context for managing global state.

import { User } from '../types/User'; 
// Importing the User type to define the structure of user-related data used in this context.

export type AuthenticationContextObject = {
    value: User; 
    // Holds the current authenticated user details.

    setValue: (newValue: User | undefined) => void; 
    // Function to update the authenticated user value or clear it when undefined is passed.
};

// Creating a context for authentication with an initial value of `null` (not authenticated by default).
export const AuthenticationContext = createContext<AuthenticationContextObject | null>(null);
