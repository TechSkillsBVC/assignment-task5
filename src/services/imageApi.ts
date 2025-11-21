import axios, { AxiosResponse } from 'axios';
import { getEnvironentVariable } from '../utils';

/**
 * Image Upload Service
 * --------------------
 * This module provides a simple interface for uploading images
 * to the ImgBB image hosting service.
 *
 * Responsibilities:
 * - Create an Axios instance configured for ImgBB API.
 * - Append the API key automatically from environment variables.
 * - Provide a function for uploading Base64 images.
 *
 * Requirements:
 * - We must have an ImgBB account and API key.
 * - API key must be supplied as an environment variable: IMGBB_API_KEY
 *
 * Example (local development):
 * ```
 * IMGBB_API_KEY="your_api_key" npx expo start
 * ```
 *
 * When building via EAS:
 * - Run `eas secret:push` to securely store IMGBB_API_KEY.
 */

/**
 * Axios instance for ImgBB API
 *
 * Configuration:
 * - baseURL: ImgBB API root endpoint
 * - headers: multipart/form-data for file uploads
 * - params: automatically includes the required API key
 */
const imageApi = axios.create({
    baseURL: 'https://api.imgbb.com/1',
    headers: { 'Content-Type': 'multipart/form-data' },
    params: { key: getEnvironentVariable('IMGBB_API_KEY') },
});

/**
 * uploadImage
 * -----------
 * Uploads a Base64-encoded image to ImgBB.
 *
 * @param imageBase64 - The Base64 string representation of the image.
 *
 * @returns Promise<AxiosResponse>
 *  - On success: Contains data.url, data.display_url, etc.
 *  - On failure: Axios throws an error that should be handled by the caller.
 *
 * Usage:
 * ```ts
 * const response = await uploadImage(base64String);
 * console.log(response.data.data.url);
 * ```
 */
export const uploadImage = (imageBase64: string): Promise<AxiosResponse> => {
    const data = new FormData();
    data.append('image', imageBase64);

    return imageApi.post('/upload', data);
};
