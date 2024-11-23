import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Fetches data from the network first. If the network request fails, it falls back to cached data.
 *
 * @template T - The expected type of the data.
 * @param {string} key - The key used for caching the response in AsyncStorage.
 * @param {Promise<T>} request - The network request to fetch the data.
 * @returns {Promise<T>} A promise resolving to the data from the network or the cache.
 *
 * Usage Example:
 * ```ts
 * const data = await getFromNetworkFirst('events', fetchEvents());
 * ```
 */
export const getFromNetworkFirst = async <T>(key: string, request: Promise<T>): Promise<T> => {
    try {
        // Attempt to fetch data from the network
        const response = await request;
        // Cache the network response
        setInCache(key, response);
        return response;
    } catch (e) {
        // If the network request fails, attempt to fetch data from the cache
        return getFromCache<T>(key);
    }
};

/**
 * Saves a value in AsyncStorage as a JSON string.
 *
 * @param {string} key - The key under which the value will be stored.
 * @param {any} value - The value to store, which will be stringified as JSON.
 * @returns {Promise<void>} A promise that resolves when the data is successfully saved.
 *
 * Usage Example:
 * ```ts
 * await setInCache('userInfo', { name: 'John Doe' });
 * ```
 */
export const setInCache = (key: string, value: any) => {
    const jsonValue = JSON.stringify(value); // Convert the value to a JSON string
    return AsyncStorage.setItem(key, jsonValue); // Store the JSON string in AsyncStorage
};

/**
 * Retrieves a value from AsyncStorage using the given key.
 *
 * @template T - The expected type of the data.
 * @param {string} key - The key used to retrieve the cached value.
 * @returns {Promise<T>} A promise resolving to the parsed JSON object or rejecting if the key does not exist.
 *
 * Usage Example:
 * ```ts
 * const userInfo = await getFromCache<User>('userInfo');
 * ```
 */
export const getFromCache = async <T>(key: string): Promise<T> => {
    // Fetch the value associated with the key from AsyncStorage
    const json = await AsyncStorage.getItem(key);

    // Parse the JSON string and return the data or reject if the key is not found
    return await (json != null 
        ? Promise.resolve(JSON.parse(json)) 
        : Promise.reject(`Key "${key}" not in cache`));
};
