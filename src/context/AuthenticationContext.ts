import { createContext } from 'react';
import { User } from '../types/User';

/** The value held by {@link AuthenticationContext}. */
export type AuthenticationContextObject = {
    /** The user who is signed in. Undefined in practice until login succeeds. */
    value: User;
    /**
     * Replaces the signed in user. Login calls it with the account returned by
     * the API; logout calls it with `undefined` to clear the session.
     */
    setValue: (newValue: User | undefined) => void;
};

/**
 * Carries the signed in user to every screen without prop drilling.
 *
 * Provided in {@link Routes}. It is null when read outside that provider,
 * so consumers use optional chaining.
 */
export const AuthenticationContext = createContext<AuthenticationContextObject | null>(null);
