import axios, { AxiosResponse } from 'axios';
import { getEnvironentVariable } from '../utils';

// Set up Axios instance for ImgBB API
// ImgBB is a free image hosting service that allows you to upload images via their API.
// You can sign up at https://imgbb.com/signup and get your API key to use in your app.
// The API key should be stored in a .env file for security reasons.

const imageApi = axios.create({
    baseURL: 'https://api.imgbb.com/1', // Base URL for the ImgBB API
    headers: { 'Content-Type': 'multipart/form-data' }, // Set content type to handle file uploads
    params: { key: getEnvironentVariable('IMGBB_API_KEY') }, // Fetch the API key from environment variables
});

/**
 * Upload an image to ImgBB API.
 * 
 * @param {string} imageBase64 - The base64 encoded image string to be uploaded.
 * @returns {Promise<AxiosResponse>} A promise resolving with the Axios response from ImgBB API.
 * 
 * Example usage:
 * ```ts
 * const response = await uploadImage(imageBase64String);
 * ```
 */
export const uploadImage = (imageBase64: string): Promise<AxiosResponse> => {
    const data = new FormData(); // Create a FormData object to hold the image
    data.append('image', imageBase64); // Append the base64 image to the FormData object

    // Send the image data to ImgBB using a POST request
    return imageApi.post('/upload', data);
};
