import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage for persistent key-value storage.

// Function to fetch data from the network first and fall back to the cache if the network request fails.
export const getFromNetworkFirst = async <T>(key: string, request: Promise<T>): Promise<T> => {
    try {
        // Attempt to get the response from the network.
        const response = await request;
        setInCache(key, response); // Store the response in the cache for future use.
        return response; // Return the fetched data.
    } catch (e) {
        // If the network request fails, attempt to retrieve data from the cache.
        return getFromCache<T>(key);
    }
};

// Function to store data in the cache.
export const setInCache = (key: string, value: any) => {
    const jsonValue = JSON.stringify(value); // Convert the value to a JSON string for storage.
    return AsyncStorage.setItem(key, jsonValue); // Store the JSON string in AsyncStorage with the given key.
};

// Function to retrieve data from the cache.
export const getFromCache = async <T>(key: string): Promise<T> => {
    const json = await AsyncStorage.getItem(key); // Get the cached JSON string for the specified key.
    // If the key exists, parse the JSON string and return the value; otherwise, reject the promise.
    return await (json != null ? Promise.resolve(JSON.parse(json)) : Promise.reject(`Key "${key}" not in cache`));
};
