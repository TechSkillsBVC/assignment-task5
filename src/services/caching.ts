import AsyncStorage from '@react-native-async-storage/async-storage';

// Fetches data from the network using the request promise and caches it under key, or 
// falls back to cached data if offline.
export const getFromNetworkFirst = async <T>(key: string, request: Promise<T>): Promise<T> => {
    try {
        const response = await request;
        setInCache(key, response);
        return response;
    } catch (e) {
        return getFromCache<T>(key);
    }
};

// Stringifies the value and saves it into AsyncStorage under the specified key.
export const setInCache = (key: string, value: any) => {
    const jsonValue = JSON.stringify(value);
    return AsyncStorage.setItem(key, jsonValue);
};

// Reads and parses cached JSON data for the key, rejects if nothing is stored.
export const getFromCache = async <T>(key: string): Promise<T> => {
    const json = await AsyncStorage.getItem(key);
    return await (json != null ? Promise.resolve(JSON.parse(json)) : Promise.reject(`Key "${key}" not in cache`));
};
