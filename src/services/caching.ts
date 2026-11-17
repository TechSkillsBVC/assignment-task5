import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * caching.ts is responsible for persisting small pieces of app data (such
 * as the logged in user, the access token, or a list of events) on the
 * device, using AsyncStorage, so the app can fall back to the last known
 * data when the network is unavailable.
 */

/**
 * Resolves a value from the network when possible, and keeps a local copy
 * for the next time the network is unavailable.
 *
 * Inputs:
 * - `key`: the cache key the value is stored and later read under.
 * - `request`: a promise that performs the network request (e.g. an Axios
 *   call) and resolves with the value to cache.
 *
 * Output: a promise that resolves with the network response when the
 * request succeeds, after also saving it to the cache under `key`. When the
 * request fails (for example, no network connection), the promise instead
 * resolves with whatever was last cached under `key`, or rejects if nothing
 * was ever cached.
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
 * Saves a value to the on-device cache.
 *
 * Inputs:
 * - `key`: the cache key to store the value under.
 * - `value`: the value to store. It is serialized to JSON before saving, so
 *   it must be JSON-serializable.
 *
 * Output: a promise that resolves once the value has been written to
 * AsyncStorage.
 */
export const setInCache = (key: string, value: any) => {
    const jsonValue = JSON.stringify(value);
    return AsyncStorage.setItem(key, jsonValue);
};

/**
 * Reads a previously cached value back from the on-device cache.
 *
 * Inputs:
 * - `key`: the cache key to read.
 *
 * Output: a promise that resolves with the parsed value previously saved
 * under `key`, or rejects with an error message if no value is cached under
 * that key.
 */
export const getFromCache = async <T>(key: string): Promise<T> => {
    const json = await AsyncStorage.getItem(key);
    return await (json != null ? Promise.resolve(JSON.parse(json)) : Promise.reject(`Key "${key}" not in cache`));
};
