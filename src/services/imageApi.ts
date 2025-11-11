import axios, { AxiosResponse } from 'axios';
import { getEnvironentVariable } from '../utils'; // TODO: check spelling in utils (Environment vs Environent)

/**
 * ImgBB API client.
 * Requires IMGBB_API_KEY to be set in environment/.env (see README).
 */
const imageApi = axios.create({
  baseURL: 'https://api.imgbb.com/1',
  headers: { 'Content-Type': 'multipart/form-data' },
  params: { key: getEnvironentVariable('IMGBB_API_KEY') },
});

/**
 * Uploads a base64 image string to ImgBB.
 * @param imageBase64 - image content as base64 (no data URI prefix)
 * @returns AxiosResponse with upload result (status, image URL, etc.)
 */
export const uploadImage = (imageBase64: string): Promise<AxiosResponse> => {
  const data = new FormData();
  data.append('image', imageBase64);

  return imageApi.post('/upload', data);
};
