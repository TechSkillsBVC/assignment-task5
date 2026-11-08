import AsyncStorage from '@react-native-async-storage/async-storage';

// Saves data on the device and loads it back later.

// Takes a key and a request. Returns the request's result and saves it on the device,
// or returns the saved copy if the request fails.
export const getFromNetworkFirst = async <T>(key: string, request: Promise<T>): Promise<T> => {
    try {
        const response = await request;
        setInCache(key, response);
        return response;
    } catch (e) {
        return getFromCache<T>(key);
    }
};

// Takes a key and a value, and saves the value on the device under that key.
// Returns a promise that finishes once it's saved.
export const setInCache = (key: string, value: any) => {
    const jsonValue = JSON.stringify(value);
    return AsyncStorage.setItem(key, jsonValue);
};

// Takes a key and returns the value saved under it.
// Fails if nothing is saved under that key.
export const getFromCache = async <T>(key: string): Promise<T> => {
    const json = await AsyncStorage.getItem(key);
    return await (json != null ? Promise.resolve(JSON.parse(json)) : Promise.reject(`Key "${key}" not in cache`));
};
