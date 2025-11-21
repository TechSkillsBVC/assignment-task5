import Constants from 'expo-constants';
import jwtDecode, { JwtPayload } from 'jwt-decode';
import { Platform } from 'react-native';
import { LatLng } from 'react-native-maps';

/**
 * formatBytes
 * -----------
 * Converts a raw byte count into a human-readable string such as:
 * "10 KB", "4.3 MB", "1 GB", etc.
 *
 * @param bytes - Number of bytes.
 * @param decimals - Number of decimal places for formatting.
 *
 * @returns A formatted string representing the byte size.
 */
export const formatBytes = (bytes: number, decimals = 2): string => {
    if (!+bytes) return '0 Bytes';

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
};

/**
 * formatAMPM
 * ----------
 * Converts a Date object into a 12-hour time string (e.g. "3:45 pm").
 *
 * @param date - Date object to format.
 *
 * @returns Formatted time string.
 */
export const formatAMPM = (date: Date): string => {
    const dateObj = new Date(date);
    const hours = dateObj.getHours();
    const minutes = dateObj.getMinutes();
    const ampm = hours >= 12 ? 'pm' : 'am';
    const newHours = hours % 12 ? hours : 12; // 0 becomes 12
    const newMinutes = minutes < 10 ? '0' + minutes : minutes;
    return `${newHours}:${newMinutes} ${ampm}`;
};

/**
 * addHours
 * --------
 * Adds a given number of hours to a Date object.
 *
 * @param dateTime - Original date.
 * @param hoursToAdd - Number of hours to add.
 *
 * @returns A new Date with added hours.
 */
export const addHours = (dateTime: Date, hoursToAdd: number) => {
    const milisecondsToAdd = hoursToAdd * 60 * 60 * 1000;
    const newDate = new Date(dateTime);
    return new Date(newDate.setTime(newDate.getTime() + milisecondsToAdd));
};

/**
 * updateDateWithNewTime
 * ----------------------
 * Combines an existing date with a new time value (hours/minutes).
 *
 * @param existingDate - The original date.
 * @param newTime - A Date whose time portion will be copied.
 *
 * @returns A new Date with updated time.
 */
export const updateDateWithNewTime = (existingDate: Date, newTime: Date): Date => {
    return new Date(
        new Date(existingDate).setHours(newTime.getHours(), newTime.getMinutes(), 0, 0)
    );
};

/**
 * sanitizeEmail
 * -------------
 * Lowercases and trims an email string for safe comparison and storage.
 *
 * @param email - Raw email string input.
 *
 * @returns Normalized email string.
 */
export const sanitizeEmail = (email: string): string => {
    return email.trim().toLowerCase();
};

/**
 * validateEmail
 * -------------
 * Validates an email using a regex pattern.
 *
 * @param email - Email string to validate.
 *
 * @returns True if valid; otherwise false.
 */
export const validateEmail = (email: string): boolean => {
    if (!email) return false;
    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{3})+$/;
    const sanitizedEmail = email.trim().toLowerCase();
    const result = sanitizedEmail.match(regex);
    return !!result?.[0];
};

/**
 * parseDateFieldFromJSONResponse
 * -------------------------------
 * Converts specific fields in an API response array from strings to Date objects.
 *
 * @param array - Array of objects received from API.
 * @param fieldName - The field to convert to Date.
 *
 * @returns New array with updated values.
 */
export const parseDateFieldFromJSONResponse = (array: [], fieldName: string): any[] => {
    return array.map((x: any) => {
        x[fieldName] = new Date(x[fieldName]);
        return x;
    });
};

/**
 * castToNumber
 * ------------
 * Converts a string to a number.
 *
 * @param text - String representing a number.
 *
 * @returns Parsed number.
 */
export const castToNumber = (text: string) => {
    return Number(text);
};

/**
 * getEnvironentVariable
 * ---------------------
 * Retrieves an environment variable value from Expo constants.
 *
 * Used for secrets such as API keys.
 *
 * @param variableName - Environment variable name.
 *
 * @returns The value if found, otherwise logs a warning.
 */
export const getEnvironentVariable = (variableName: string) => {
    try {
        const value = Constants.expoConfig?.extra?.[variableName];
        if (value != null) {
            return value;
        } else {
            throw new Error(`${variableName} not found.`);
        }
    } catch (e) {
        console.warn(e);
    }
};

/**
 * getMapsUrl
 * ----------
 * Generates a platform-specific deep link to open coordinates
 * in the default maps application.
 *
 * @param coordinates - Latitude and longitude.
 *
 * @returns A formatted URL string.
 */
export const getMapsUrl = (coordinates: LatLng): string => {
    const { latitude, longitude } = coordinates;
    const latLng = `${latitude},${longitude}`;
    const label = 'Custom Label';

    return Platform.OS === 'ios'
        ? `maps:0,0?q=${label}@${latLng}`
        : `geo:0,0?q=${latLng}(${label})`;
};

/**
 * isTokenExpired
 * --------------
 * Checks whether a JWT token has expired.
 *
 * @param token - JWT token string.
 *
 * @returns True if expired, otherwise false.
 */
export const isTokenExpired = (token: string) => {
    const decodedToken = jwtDecode(token) as JwtPayload;
    const currentDate = Date.now();
    return (decodedToken.exp as number) * 1000 < currentDate;
};
