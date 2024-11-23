import axios, { AxiosResponse } from 'axios';

// Create an Axios instance with predefined configuration
const api = axios.create({
    /**
     * The baseURL specifies the root URL for all API requests made using this Axios instance.
     * 
     * Notes:
     * 1. Before running your local 'json-server', replace `0.0.0.0` with your computer's IP address.
     *    Example: `http://192.168.1.100:3333`
     * 
     * 2. Run the following command to start the server:
     *    `npx json-server --watch db.json --port 3333 --host your_ip_address_here`
     * 
     * 3. Alternatively, for online access without running 'json-server', set the baseURL to:
     *    `https://my-json-server.typicode.com/<your-github-username>/<your-github-repo>`
     *    Ensure the `db.json` file is located at the root of your GitHub repository.
     */
    baseURL: 'http://0.0.0.0:3333', // Replace with the appropriate URL
});

/**
 * Authenticates a user with their email and password.
 *
 * @param {string} email - The user's email address.
 * @param {string} password - The user's password.
 * @returns {Promise<AxiosResponse>} A promise resolving to the API's response object.
 *
 * Example usage:
 * ```ts
 * authenticateUser('user@example.com', 'password123')
 *     .then(response => {
 *         console.log(response.data);
 *     })
 *     .catch(error => {
 *         console.error(error);
 *     });
 * ```
 */
export const authenticateUser = (email: string, password: string): Promise<AxiosResponse> => {
    // Send a POST request to the /login endpoint with the email and password
    return api.post(`/login`, { email, password });
};
