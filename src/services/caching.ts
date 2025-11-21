import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * getFromNetworkFirst
 * -------------------
 * Attempts to fetch data from the network first. If the request succeeds,
 * the result is cached. If the request fails (offline or server error),
 * the function falls back to returning the cached value.
 *
 * This approach is useful when you want fresh data but still need
 * offline support.
 *
 * @typeParam T - The expected return type of the response.
 *
 * @param key - Cache key used to store and retrieve the value.
 * @param request - A Promise (usually an API call) whose result should be cached.
 *
 * @returns Promise<T> - Data from the network or from cache if the request fails.
 */
export const getFromNetworkFirst = async <T>(
    key: string,
    request: Promise<T>
): Promise<T> => {
    try {
        const response = await request;
        setInCache(key, response);
        return response;
    } catch (e) {
        // If network fails, return cached value
        return getFromCache<T>(key);
    }
};

/**
 * setInCache
 * ----------
 * Saves a value into AsyncStorage under the given key.
 *
 * @param key - The key used to identify the cached value.
 * @param value - Any serializable JavaScript value.
 *
 * @returns Promise<void> - Resolves when the value has been written to storage.
 */
export const setInCache = (key: string, value: any) => {
    const jsonValue = JSON.stringify(value);
    return AsyncStorage.setItem(key, jsonValue);
};

/**
 * getFromCache
 * -------------
 * Retrieves a value from AsyncStorage and parses it back to its original type.
 *
 * @typeParam T - The expected type of the returned object.
 *
 * @param key - The key associated with the cached value.
 *
 * @returns Promise<T>
 *  - Resolves with the parsed object if the key exists.
 *  - Rejects with an error message if the key is not found in storage.
 */
export const getFromCache = async <T>(key: string): Promise<T> => {
    const json = await AsyncStorage.getItem(key);

    return json != null
        ? Promise.resolve(JSON.parse(json))
        : Promise.reject(`Key "${key}" not in cache`);
};
