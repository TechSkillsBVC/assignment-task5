import Constants from 'expo-constants'; // Provides environment-specific constants for the app.
import jwtDecode, { JwtPayload } from 'jwt-decode'; // For decoding JWT tokens and extracting payload information.
import { Platform } from 'react-native'; // Identifies the platform (iOS or Android) the app is running on.
import { LatLng } from 'react-native-maps'; // Represents latitude and longitude coordinates for mapping.

export const formatBytes = (bytes: number, decimals = 2): string => {
    // Converts a size in bytes to a human-readable format (e.g., KB, MB).
    if (!+bytes) return '0 Bytes';

    const k = 1024; // Base for conversion (1 KB = 1024 Bytes).
    const dm = decimals < 0 ? 0 : decimals; // Ensure decimal places are non-negative.
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']; // Units of measurement.

    const i = Math.floor(Math.log(bytes) / Math.log(k)); // Determine the unit index based on the size.

    // Return the formatted string with the appropriate unit.
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
};

export const formatAMPM = (date: Date): string => {
    // Formats a date to a 12-hour time string with AM/PM.
    const dateObj = new Date(date);
    const hours = dateObj.getHours(); // Get the hour.
    const minutes = dateObj.getMinutes(); // Get the minutes.
    const ampm = hours >= 12 ? 'pm' : 'am'; // Determine AM/PM.
    const newHours = hours % 12 ? hours : 12; // Convert 0 hours to 12 for readability.
    const newMinutes = minutes < 10 ? '0' + minutes : minutes; // Ensure two-digit minutes.
    return `${newHours}:${newMinutes} ${ampm}`; // Return the formatted time string.
};

export const addHours = (dateTime: Date, hoursToAdd: number) => {
    // Adds a specified number of hours to a given date.
    const milisecondsToAdd = hoursToAdd * 60 * 60 * 1000; // Convert hours to milliseconds.
    const newDate = new Date(dateTime);
    return new Date(newDate.setTime(newDate.getTime() + milisecondsToAdd)); // Return the updated date.
};

export const updateDateWithNewTime = (existingDate: Date, newTime: Date): Date => {
    // Updates the time of an existing date with the hours and minutes of another date.
    return new Date(new Date(existingDate).setHours(newTime.getHours(), newTime.getMinutes(), 0, 0));
};

export const sanitizeEmail = (email: string): string => {
    // Removes leading/trailing spaces and converts the email to lowercase.
    return email.trim().toLowerCase();
};

export const validateEmail = (email: string): boolean => {
    // Validates an email address against a regex pattern.
    if (!email) return false;
    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{3})+$/; // Email validation pattern.
    const sanitizedEmail = email.trim().toLowerCase(); // Clean up the email.
    const result = sanitizedEmail.match(regex); // Test the email against the regex.
    return !!result?.[0]; // Return true if valid, false otherwise.
};

export const parseDateFieldFromJSONResponse = (array: [], fieldName: string): any[] => {
    // Converts a specific field in an array of objects to Date objects.
    return array.map((x: any) => {
        x[fieldName] = new Date(x[fieldName]); // Replace the field value with a Date object.
        return x;
    });
};

export const castToNumber = (text: string) => {
    // Converts a string to a number.
    return Number(text);
};

export const getEnvironentVariable = (variableName: string) => {
    // Retrieves the value of an environment variable from Expo's configuration.
    try {
        const value = Constants.expoConfig?.extra?.[variableName]; // Get the variable value.
        if (value != null) {
            return value; // Return the value if found.
        } else {
            throw new Error(`${variableName} not found.`); // Throw an error if not found.
        }
    } catch (e) {
        console.warn(e); // Log the error as a warning.
    }
};

export const getMapsUrl = (coordinates: LatLng): string => {
    // Generates a URL for opening the given coordinates in a map application.
    const { latitude, longitude } = coordinates;
    const latLng = `${latitude},${longitude}`; // Format the coordinates as a string.
    const label = 'Custom Label'; // Define a label for the location.
    // Return a platform-specific URL for the maps app.
    return Platform.OS === 'ios' ? `maps:0,0?q=${label}@${latLng}` : `geo:0,0?q=${latLng}(${label})`;
};

export const isTokenExpired = (token: string) => {
    // Checks if a JWT token has expired.
    const decodedToken = jwtDecode(token) as JwtPayload; // Decode the token to access its payload.
    const currentDate = Date.now(); // Get the current timestamp.
    // Compare the expiration time in the token to the current time.
    return (decodedToken.exp as number) * 1000 < currentDate;
};
