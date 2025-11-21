import axios, { AxiosResponse } from 'axios';

/**
 * API Service
 * -----------
 * This module configures an Axios HTTP client used for all API requests
 * in the application.
 *
 * Responsibilities:
 * - Define a centralized Axios instance shared across the app.
 * - Provide functions that interact with the backend API.
 *
 * Notes:
 * - The `baseURL` should point to a running JSON server instance.
 * - When working locally, replace `0.0.0.0` with your machine's LAN IP.
 * - When using `my-json-server`, ensure `db.json` is at the repository root.
 */
const api = axios.create({
    /**
     * Base URL for all API calls.
     *
     * Examples:
     * - Local development:
     *   http://<your-ip>:3333
     *
     * - GitHub-hosted JSON server:
     *   https://my-json-server.typicode.com/<username>/<repo>
     *
     * Current default:
     * - http://0.0.0.0:3333 (placeholder for development)
     */
    baseURL: 'http://0.0.0.0:3333',
});

/**
 * authenticateUser
 * ----------------
 * Sends a POST request to the backend to authenticate a user.
 *
 * @param email - The user's email address.
 * @param password - The user's plaintext password.
 *
 * @returns Promise<AxiosResponse>
 *  - `response.data.user` → The authenticated user object.
 *  - `response.data.accessToken` → The access token for session validation.
 *
 * This function is used in the Login screen.
 */
export const authenticateUser = (email: string, password: string): Promise<AxiosResponse> => {
    return api.post(`/login`, { email, password });
};
