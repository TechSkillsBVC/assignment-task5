import axios, { AxiosResponse } from 'axios';

/**
 * api is the HTTP client used for every request to the app's backend (a
 * json-server instance, see README.md for setup). Its responsibility is to
 * hold the one base URL every request is sent to, so individual service
 * functions (such as `authenticateUser` below) only need to specify a path.
 */
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
 * Logs a user in against the fake API.
 *
 * Inputs:
 * - `email`: the user's email address, as typed on the Login screen.
 * - `password`: the user's password, as typed on the Login screen.
 *
 * Output: a promise that resolves with the server's response. On success,
 * the response body contains the authenticated user and an access token
 * (see `Login.tsx`, which stores both in the cache). On failure, the
 * promise rejects with the Axios error for the caller to handle.
 */
export const authenticateUser = (email: string, password: string): Promise<AxiosResponse> => {
    return api.post(`/login`, { email, password });
};
