/**
 * Small helpers shared across the app: formatting, date handling, email
 * checks, environment variables and token expiry.
 */
import Constants from 'expo-constants';
import jwtDecode, { JwtPayload } from 'jwt-decode';
import { Platform } from 'react-native';
import { LatLng } from 'react-native-maps';

/**
 * Turns a byte count into something readable next to a file name.
 *
 * @param bytes - Size in bytes.
 * @param decimals - Decimal places to keep. Defaults to 2, negatives count as 0.
 * @returns A string such as "245.57 KB", or "0 Bytes" for 0 or an invalid number.
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
 * Formats the time part of a date in 12 hour form.
 *
 * @param date - The date to read the time from.
 * @returns A string such as "9:05 am". Midnight reads as "12:00 am".
 */
export const formatAMPM = (date: Date): string => {
    const dateObj = new Date(date);
    const hours = dateObj.getHours();
    const minutes = dateObj.getMinutes();
    const ampm = hours >= 12 ? 'pm' : 'am';
    const newHours = hours % 12 ? hours : 12; // the hour '0' should be '12'
    const newMinutes = minutes < 10 ? '0' + minutes : minutes;
    var strTime = newHours + ':' + newMinutes + ' ' + ampm;
    return strTime;
};

/**
 * Shifts a date forward by a number of hours without changing the original.
 *
 * @param dateTime - Starting date and time.
 * @param hoursToAdd - Hours to add. Negative values move backwards.
 * @returns A new Date, `hoursToAdd` later.
 */
export const addHours = (dateTime: Date, hoursToAdd: number) => {
    const milisecondsToAdd = hoursToAdd * 60 * 60 * 1000;
    const newDate = new Date(dateTime);
    return new Date(newDate.setTime(newDate.getTime() + milisecondsToAdd));
};

/**
 * Puts a day and a time together, which is what the create event form needs
 * when the date and the time are picked in two separate fields.
 *
 * @param existingDate - Supplies the day, month and year.
 * @param newTime - Supplies the hours and minutes. Seconds are zeroed.
 * @returns A new Date combining the two. Neither argument is modified.
 */
export const updateDateWithNewTime = (existingDate: Date, newTime: Date): Date => {
    const newDate = new Date(new Date(existingDate).setHours(newTime.getHours(), newTime.getMinutes(), 0, 0));
    return newDate;
};

/**
 * Normalises an address before it is validated or sent, so "  Luigi@X.IT "
 * and "luigi@x.it" are treated as the same account.
 *
 * @param email - Address as the user typed it.
 * @returns The address trimmed and lowercased.
 */
export const sanitizeEmail = (email: string): string => {
    return email.trim().toLowerCase();
};

/**
 * Checks whether an address looks usable, before the login request is sent.
 *
 * The address is sanitized first, so capitals and stray spaces are fine.
 *
 * @param email - Address as the user typed it.
 * @returns True if it looks like an email address, false if it is empty or malformed.
 */
export const validateEmail = (email: string): boolean => {
    if (!email) return false;
    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{3})+$/;
    const sanitizedEmail = email.trim().toLowerCase();
    const result = sanitizedEmail.match(regex);
    return !!result?.[0];
};

/**
 * Converts one date field from string to Date across a list, because JSON has
 * no date type and the API hands dates back as ISO strings.
 *
 * Note that this edits the objects in the array in place and returns the same
 * array, rather than building a new one.
 *
 * @param array - Items straight from a JSON response.
 * @param fieldName - Name of the field holding the date string, e.g. "dateTime".
 * @returns The same array, with that field now holding Date objects.
 */
export const parseDateFieldFromJSONResponse = (array: [], fieldName: string): any[] => {
    return array.map((x: any) => {
        x[fieldName] = new Date(x[fieldName]);
        return x;
    });
};

/**
 * Converts text from a numeric input into a number.
 *
 * @param text - The field's current text.
 * @returns The number, or NaN if the text is not numeric. An empty string gives 0.
 */
export const castToNumber = (text: string) => {
    return Number(text);
};

/**
 * Reads a value supplied through the `extra` block in `app.config.ts`, which
 * is how secrets such as the image API key reach the running app.
 *
 * @param variableName - Key to look up, for example "IMGBB_API_KEY".
 * @returns The value, or undefined if it was not configured. A missing value
 * is logged as a warning rather than thrown, so the app still starts.
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
 * Builds a link that opens the device's maps app at a set of coordinates,
 * using the scheme each platform expects.
 *
 * @param coordinates - Latitude and longitude of the destination.
 * @returns A `maps:` URL on iOS and a `geo:` URL on Android, ready for `Linking.openURL`.
 */
export const getMapsUrl = (coordinates: LatLng): string => {
    const { latitude, longitude } = coordinates;
    const latLng = `${latitude},${longitude}`;
    const label = 'Custom Label';
    return Platform.OS === 'ios' ? `maps:0,0?q=${label}@${latLng}` : `geo:0,0?q=${latLng}(${label})`;
};

/**
 * Decides whether a cached access token can still be used, so a returning
 * user is only sent straight to the map when the session is still good.
 *
 * @param token - The JWT access token.
 * @returns True if its expiry has passed.
 * @throws If the token is not a readable JWT.
 */
export const isTokenExpired = (token: string) => {
    const decodedToken = jwtDecode(token) as JwtPayload;
    const currentDate = Date.now();
    if ((decodedToken.exp as number) * 1000 < currentDate) {
        return true;
    } else {
        return false;
    }
};
