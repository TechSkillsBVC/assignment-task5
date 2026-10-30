/**
 * A volunteam account, shaped the way the API returns it after a successful
 * login. Stored in {@link AuthenticationContext} and cached under "userInfo".
 */
export interface User {
    /** Given and family name kept apart so a screen can show either one. */
    name: {
        first: string;
        last: string;
    };
    /** Address used to sign in. Always trimmed and lowercased before it is sent. */
    email: string;
    /**
     * Server generated identifier, for example "3UN3-2L". Events reference it in
     * `organizerId` and `volunteersIds`.
     */
    id: string;
    /** Contact number in national format, for example "(306) 805-5821". */
    mobile: string;
}
