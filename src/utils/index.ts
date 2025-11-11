import Constants from 'expo-constants';
import jwtDecode, { JwtPayload } from 'jwt-decode';
import { Platform } from 'react-native';
import { LatLng } from 'react-native-maps';

/**
 * Converts a byte number to a readable string (KB, MB, GB, etc.).
 * @param bytes - size in bytes
 * @param decimals - decimal places (default 2)
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
 * Formats a Date into 12h time like "1:05 pm".
 */
export const formatAMPM = (date: Date): string => {
  const dateObj = new Date(date);
  const hours = dateObj.getHours();
  const minutes = dateObj.getMinutes();
  const ampm = hours >= 12 ? 'pm' : 'am';
  const newHours = hours % 12 ? hours : 12; // the hour '0' should be '12'
  const newMinutes = minutes < 10 ? '0' + minutes : minutes;
  const strTime = newHours + ':' + newMinutes + ' ' + ampm;
  return strTime;
};

/**
 * Returns a new Date by adding N hours to the given date.
 */
export const addHours = (dateTime: Date, hoursToAdd: number) => {
  const milisecondsToAdd = hoursToAdd * 60 * 60 * 1000;
  const newDate = new Date(dateTime);
  return new Date(newDate.setTime(newDate.getTime() + milisecondsToAdd));
};

/**
 * Updates an existing date with the time (HH:mm) from another date.
 */
export const updateDateWithNewTime = (existingDate: Date, newTime: Date): Date => {
  const newDate = new Date(new Date(existingDate).setHours(newTime.getHours(), newTime.getMinutes(), 0, 0));
  return newDate;
};

/**
 * Trims and lowercases an email string.
 */
export const sanitizeEmail = (email: string): string => {
  return email.trim().toLowerCase();
};

/**
 * Checks if an email looks valid with a simple regex.
 * NOTE: This regex only allows 3-letter TLDs (like ".com").
 * TODO: consider a broader regex if you need longer TLDs.
 */
export const validateEmail = (email: string): boolean => {
  if (!email) return false;
  const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{3})+$/;
  const sanitizedEmail = email.trim().toLowerCase();
  const result = sanitizedEmail.match(regex);
  return !!result?.[0];
};

/**
 * Parses a date field inside each item of an array (mutates items).
 * @param array - list of objects
 * @param fieldName - key that contains a date string
 * @returns same array with field converted to Date
 */
export const parseDateFieldFromJSONResponse = (array: [], fieldName: string): any[] => {
  return array.map((x: any) => {
    x[fieldName] = new Date(x[fieldName]);
    return x;
  });
};

/**
 * Converts a string to number (wraps Number()).
 */
export const castToNumber = (text: string) => {
  return Number(text);
};

/**
 * Reads an environment variable from Expo config (app.json/app.config).
 * @param variableName - name of the variable (e.g., "IMGBB_API_KEY")
 * @returns value if found, otherwise logs a warning
 *
 * NOTE: function name has a small typo ("Environent"). Kept as-is for compatibility.
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
 * Builds a platform-specific maps deep link for given coordinates.
 * iOS: maps:0,0?q=<label>@<lat>,<lng>
 * Android: geo:0,0?q=<lat>,<lng>(<label>)
 */
export const getMapsUrl = (coordinates: LatLng): string => {
  const { latitude, longitude } = coordinates;
  const latLng = `${latitude},${longitude}`;
  const label = 'Custom Label';
  return Platform.OS === 'ios' ? `maps:0,0?q=${label}@${latLng}` : `geo:0,0?q=${latLng}(${label})`;
};

/**
 * Checks if a JWT access token is expired based on its "exp" field.
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
