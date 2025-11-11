/**
 * User
 * Basic user info used across the app.
 */
export interface User {
  /** First and last name. */
  name: {
    /** Given name (e.g., "Tam"). */
    first: string;
    /** Family name (e.g., "Nguyen"). */
    last: string;
  };

  /** Email address (used for login/communication). */
  email: string;

  /** Unique user id (string). */
  id: string;

  /** Mobile phone number (string). */
  mobile: string;
}
