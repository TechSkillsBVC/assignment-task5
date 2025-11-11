import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Tries the network first; if it fails, returns the last cached value.
 * Also saves successful network responses into the cache.
 *
 * @param key - cache key in AsyncStorage
 * @param request - a promise that resolves to the data we want
 * @returns data from network (if ok) or from cache (if offline/error)
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
 * Saves any JSON-serializable value in AsyncStorage.
 * @param key - cache key
 * @param value - data to store
 */
export const setInCache = (key: string, value: any) => {
  const jsonValue = JSON.stringify(value);
  return AsyncStorage.setItem(key, jsonValue);
};

/**
 * Gets and parses a value from AsyncStorage.
 * @param key - cache key
 * @returns parsed value if found, or rejects if missing
 */
export const getFromCache = async <T>(key: string): Promise<T> => {
  const json = await AsyncStorage.getItem(key);
  return await (json != null
    ? Promise.resolve(JSON.parse(json))
    : Promise.reject(`Key "${key}" not in cache`));
};
