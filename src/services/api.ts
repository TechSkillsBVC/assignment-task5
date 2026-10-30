/**
 * Client for the fake backend (json-server with json-server-auth).
 *
 * See the README for how to start the server and point `baseURL` at it.
 */
import axios, { AxiosResponse } from 'axios';

const api = axios.create({
    // Before running your 'json-server', get your computer's IP address and
    // update your baseURL to `http://your_ip_address_here:3333` and then run:
    // `npx json-server --watch db.json --port 3333 --host your_ip_address_here`
    //
    // To access your server online without running json-server locally,
    // you can set your baseURL to:
    // `https://my-json-server.typicode.com/<your-github-username>/<your-github-repo>`
    //
    // To use `my-json-server`, make sure your `db.json` is located at the repo root.

    baseURL: 'http://0.0.0.0:3333',
});

/**
 * Exchanges an email and password for an access token.
 *
 * @param email - Address to sign in with, already trimmed and lowercased by
 * {@link sanitizeEmail}.
 * @param password - The account's password, sent as typed.
 * @returns The response, whose `data` holds `user` and `accessToken`.
 * @throws An axios error if the credentials are wrong or the server is
 * unreachable; `error.response.data` carries the server's message.
 */
export const authenticateUser = (email: string, password: string): Promise<AxiosResponse> => {
    return api.post(`/login`, { email, password });
};
