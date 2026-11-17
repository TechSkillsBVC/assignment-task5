import Constants from 'expo-constants';
import jwtDecode, { JwtPayload } from 'jwt-decode';
import { Platform } from 'react-native';
import { LatLng } from 'react-native-maps';

/**
 * utils/index.ts collects small, self-contained helper functions (formatting,
 * validation, date math, and environment access) that do not belong to any
 * single screen or service, and are shared across the app.
 */

/**
 * Formats a byte count as a human-readable size (e.g. "1.5 KB").
 *
 * Inputs:
 * - `bytes`: the size, in bytes.
 * - `decimals`: how many decimal places to keep, defaults to 2. Negative
 *   values are treated as 0.
 *
 * Output: a string such as "0 Bytes", "12 KB", or "3.4 MB".
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
 * Formats a Date's time of day in 12-hour clock format.
 *
 * Inputs:
 * - `date`: the date/time to format.
 *
 * Output: a string such as "9:05 am" or "12:00 pm".
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
 * Adds a number of hours to a date and time.
 *
 * Inputs:
 * - `dateTime`: the starting date and time.
 * - `hoursToAdd`: how many hours to add. A negative number subtracts hours.
 *
 * Output: a new Date, `hoursToAdd` hours after `dateTime`. The original
 * `dateTime` is not modified.
 */
export const addHours = (dateTime: Date, hoursToAdd: number) => {
    const milisecondsToAdd = hoursToAdd * 60 * 60 * 1000;
    const newDate = new Date(dateTime);
    return new Date(newDate.setTime(newDate.getTime() + milisecondsToAdd));
};

/**
 * Combines an existing date with a different time of day.
 *
 * Inputs:
 * - `existingDate`: the date (year, month, day) to keep.
 * - `newTime`: the time of day (hours and minutes) to apply to that date.
 *
 * Output: a new Date with `existingDate`'s year, month, and day, and
 * `newTime`'s hours and minutes (seconds and milliseconds are reset to 0).
 * Neither input is modified.
 */
export const updateDateWithNewTime = (existingDate: Date, newTime: Date): Date => {
    const newDate = new Date(new Date(existingDate).setHours(newTime.getHours(), newTime.getMinutes(), 0, 0));
    return newDate;
};

/**
 * Normalizes an email address for comparison and storage.
 *
 * Inputs:
 * - `email`: the raw email address, as typed by the user.
 *
 * Output: the same email with surrounding whitespace removed and every
 * letter lowercased.
 */
export const sanitizeEmail = (email: string): string => {
    return email.trim().toLowerCase();
};

/**
 * Checks whether a string is a well-formed email address.
 *
 * Inputs:
 * - `email`: the email address to check.
 *
 * Output: `true` when `email` is non-empty and matches the expected email
 * pattern (after trimming and lowercasing it), `false` otherwise.
 */
export const validateEmail = (email: string): boolean => {
    if (!email) return false;
    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{3})+$/;
    const sanitizedEmail = email.trim().toLowerCase();
    const result = sanitizedEmail.match(regex);
    return !!result?.[0];
};

/**
 * Converts one field of every object in an array from a JSON date string
 * into an actual Date object. Useful after fetching JSON data (such as
 * events) whose date fields arrive as strings.
 *
 * Inputs:
 * - `array`: the array of objects to convert. Each object is mutated in
 *   place.
 * - `fieldName`: the name of the field, on each object, to convert.
 *
 * Output: the same array, with `fieldName` on every item replaced by a
 * Date instance.
 */
export const parseDateFieldFromJSONResponse = (array: [], fieldName: string): any[] => {
    return array.map((x: any) => {
        x[fieldName] = new Date(x[fieldName]);
        return x;
    });
};

/**
 * Converts a text input's value into a number.
 *
 * Inputs:
 * - `text`: the text to convert, typically from a numeric TextInput.
 *
 * Output: the numeric value of `text`, or `NaN` when `text` cannot be
 * parsed as a number.
 */
export const castToNumber = (text: string) => {
    return Number(text);
};

/**
 * Reads a configuration value that was set as an environment variable at
 * build/start time (see `app.config.ts`'s `extra` section).
 *
 * Inputs:
 * - `variableName`: the name of the variable to read, as defined under
 *   `extra` in `app.config.ts`.
 *
 * Output: the variable's value when it is set. When it is missing, a
 * warning is logged to the console and `undefined` is returned, instead of
 * throwing, so a missing optional variable does not crash the app.
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
 * Builds a URL that opens the device's native maps app at a given
 * location.
 *
 * Inputs:
 * - `coordinates`: the latitude and longitude to point the maps app at.
 *
 * Output: a `maps:` URL on iOS, or a `geo:` URL on Android, suitable for
 * `Linking.openURL`.
 */
export const getMapsUrl = (coordinates: LatLng): string => {
    const { latitude, longitude } = coordinates;
    const latLng = `${latitude},${longitude}`;
    const label = 'Custom Label';
    return Platform.OS === 'ios' ? `maps:0,0?q=${label}@${latLng}` : `geo:0,0?q=${latLng}(${label})`;
};

/**
 * Checks whether a JSON Web Token has expired.
 *
 * Inputs:
 * - `token`: the access token to check, as a JWT string.
 *
 * Output: `true` when the token's `exp` claim is in the past, `false`
 * otherwise.
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
