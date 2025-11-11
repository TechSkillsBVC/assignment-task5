import axios, { AxiosResponse } from 'axios';

/**
 * Axios instance for our API calls.
 * NOTE: Update `baseURL` to your machine's IP when running json-server locally.
 * Example: http://192.168.0.10:3333
 *
 * You can also use my-json-server (read the comments below).
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
 * Authenticates a user with email and password.
 * @param email - user email (string)
 * @param password - user password (string)
 * @returns AxiosResponse with { user, accessToken } on success
 */
export const authenticateUser = (
  email: string,
  password: string
): Promise<AxiosResponse> => {
  return api.post(`/login`, { email, password });
};
