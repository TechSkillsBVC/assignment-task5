import axios, { AxiosResponse } from 'axios';

// Connection to the app's API, used to log in and get data.
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

// Takes an email and password and sends them to the API to log in.
// Returns the API's response, which holds the user's details and access token.
export const authenticateUser = (email: string, password: string): Promise<AxiosResponse> => {
    return api.post(`/login`, { email, password });
};
