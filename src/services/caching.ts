/**
 * Thin wrapper over Async Storage used to keep a copy of anything fetched from
 * the API, so the app still has something to show when the network is gone.
 */
import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Runs a request, caches whatever comes back, and falls back to the cached
 * copy if the request fails.
 *
 * @typeParam T - Type of the value the request resolves with.
 * @param key - Cache key to store the result under, for example "events".
 * @param request - The in-flight request.
 * @returns The fresh value, or the cached one if the request failed.
 * @throws If the request fails and nothing is cached under `key`.
 */
export const getFromNetworkFirst = async <T>(key: string, request: Promise<T>): Promise<T> => {
    try {
        const response = await request;
        setInCache(key, response);
        return response;
    } catch (e) {
        return getFromCache<T>(key);
    }
};

/**
 * Writes a value to the cache as JSON.
 *
 * @param key - Cache key to write to.
 * @param value - Anything `JSON.stringify` can handle.
 * @returns A promise that resolves once the write finishes.
 */
export const setInCache = (key: string, value: any) => {
    const jsonValue = JSON.stringify(value);
    return AsyncStorage.setItem(key, jsonValue);
};

/**
 * Reads a value back out of the cache.
 *
 * @typeParam T - Type the stored JSON is expected to parse into.
 * @param key - Cache key to read.
 * @returns The parsed value.
 * @throws If nothing is stored under `key`. Callers either catch this or
 * handle the rejection, as the Login screen does on a cold start.
 */
export const getFromCache = async <T>(key: string): Promise<T> => {
    const json = await AsyncStorage.getItem(key);
    return await (json != null ? Promise.resolve(JSON.parse(json)) : Promise.reject(`Key "${key}" not in cache`));
};
