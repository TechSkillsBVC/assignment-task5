import { createContext } from 'react';
import { User } from '../types/User';

/**
 * Shape of our auth context.
 * - value: current logged-in user data.
 * - setValue: updates the user (use `undefined` to log out).
 */
export type AuthenticationContextObject = {
  value: User;
  setValue: (newValue: User | undefined) => void;
};

/**
 * AuthenticationContext
 * Holds the current user across the app.
 *
 * Usage:
 * 1) Wrap the app with a Provider:
 *    <AuthenticationContext.Provider value={{ value: user, setValue: setUser }}>
 *      <App />
 *    </AuthenticationContext.Provider>
 *
 * 2) Read it inside components:
 *    const auth = useContext(AuthenticationContext);
 *    auth?.setValue(undefined) // logout
 */
export const AuthenticationContext = createContext<AuthenticationContextObject | null>(null);
