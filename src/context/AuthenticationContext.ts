import { createContext } from 'react';
import { User } from '../types/User';

/**
 * Shape of the value exposed through AuthenticationContext.
 */
export type AuthenticationContextObject = {
    /** The currently logged in user, or `undefined` when no one is logged in. */
    value: User;
    /** Updates the currently logged in user. Pass `undefined` to log out. */
    setValue: (newValue: User | undefined) => void;
};

/**
 * AuthenticationContext shares the current user's identity with every
 * screen in the app, so screens such as EventsMap and Login do not need to
 * pass the user down manually through props.
 *
 * Responsibilities:
 * - Hold a reference to the currently authenticated user (`value`).
 * - Expose a setter (`setValue`) that screens call after a successful login
 *   or on logout, so the rest of the app reacts to the change.
 *
 * The context's own state (the `User` object and the setter function) lives
 * in `AppStack`, which creates the Provider that supplies this context's
 * value to the navigator and every screen inside it.
 */
export const AuthenticationContext = createContext<AuthenticationContextObject | null>(null);
