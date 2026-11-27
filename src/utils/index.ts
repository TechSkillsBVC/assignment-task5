import Constants from 'expo-constants';
import jwtDecode, { JwtPayload } from 'jwt-decode';
import { Platform } from 'react-native';
import { LatLng } from 'react-native-maps';

// Converts a raw byte number into a readable size string rounded to the specified 
// decimal places.
export const formatBytes = (bytes: number, decimals = 2): string => {
    if (!+bytes) return '0 Bytes';

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
};
// Formats a Date object into a 12-hour time string with 'am' or 'pm' at the end.
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
// Takes a starting Date and adds the given number of hours, returning the 
// updated Date object.
export const addHours = (dateTime: Date, hoursToAdd: number) => {
    const milisecondsToAdd = hoursToAdd * 60 * 60 * 1000;
    const newDate = new Date(dateTime);
    return new Date(newDate.setTime(newDate.getTime() + milisecondsToAdd));
};
// Copies the hours and minutes from newTime onto existingDate and returns the 
// resulting Date.
export const updateDateWithNewTime = (existingDate: Date, newTime: Date): Date => {
    const newDate = new Date(new Date(existingDate).setHours(newTime.getHours(), newTime.getMinutes(), 0, 0));
    return newDate;
};
// Trims leading/trailing whitespace from an email string and converts it to lowercase.
export const sanitizeEmail = (email: string): string => {
    return email.trim().toLowerCase();
};
// Checks if an email string matches a standard email format and returns true if valid.
export const validateEmail = (email: string): boolean => {
    if (!email) return false;
    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{3})+$/;
    const sanitizedEmail = email.trim().toLowerCase();
    const result = sanitizedEmail.match(regex);
    return !!result?.[0];
};
// Iterates over an array of JSON objects and converts the specified string field 
// into a Date object.
export const parseDateFieldFromJSONResponse = (array: [], fieldName: string): any[] => {
    return array.map((x: any) => {
        x[fieldName] = new Date(x[fieldName]);
        return x;
    });
};
// Converts a numeric string into a Number type.
export const castToNumber = (text: string) => {
    return Number(text);
};
// Looks up a config variable by name from Expo's extra settings and returns its value, 
// logging a warning if missing.
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
// Builds a native Maps from the given latitude and longitude coordinates.
export const getMapsUrl = (coordinates: LatLng): string => {
    const { latitude, longitude } = coordinates;
    const latLng = `${latitude},${longitude}`;
    const label = 'Custom Label';
    return Platform.OS === 'ios' ? `maps:0,0?q=${label}@${latLng}` : `geo:0,0?q=${latLng}(${label})`;
};
// Decodes a JWT token string and returns true if its expiration timestamp is in the past.
export const isTokenExpired = (token: string) => {
    const decodedToken = jwtDecode(token) as JwtPayload;
    const currentDate = Date.now();
    if ((decodedToken.exp as number) * 1000 < currentDate) {
        return true;
    } else {
        return false;
    }
};
