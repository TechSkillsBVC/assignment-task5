import { useIsFocused } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import React, { useContext, useEffect, useState } from 'react';
import { Alert, Image, StyleSheet, Text, TextInput, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Spinner from 'react-native-loading-spinner-overlay';

import BigButton from '../components/BigButton';
import Spacer from '../components/Spacer';
import { AuthenticationContext } from '../context/AuthenticationContext';
import logoImg from '../images/logo.png';
import * as api from '../services/api';
import { getFromCache, setInCache } from '../services/caching';
import { User } from '../types/User';
import { isTokenExpired, sanitizeEmail, validateEmail } from '../utils';

/**
 * Login screen.
 *
 * Responsibilities:
 * - Render the login form (email + password).
 * - Validate input fields before sending a request.
 * - Authenticate the user against the API.
 * - Persist user info and access token into cache on success.
 * - Update the global AuthenticationContext with the logged-in user.
 * - Redirect authenticated users to the EventsMap screen.
 *
 * @param navigation - React Navigation stack navigation prop used to
 *                     navigate to other screens (e.g., "EventsMap").
 */
export default function Login({ navigation }: StackScreenProps<any>) {
    /**
     * Authentication context that stores and updates the current user.
     */
    const authenticationContext = useContext(AuthenticationContext);

    /**
     * Email entered by the user in the form.
     */
    const [email, setEmail] = useState('');

    /**
     * Password entered by the user in the form.
     */
    const [password, setPassword] = useState('');

    /**
     * Indicates whether the email input is considered invalid.
     * Used to show an inline validation error and red border.
     */
    const [emailIsInvalid, setEmailIsInvalid] = useState<boolean>();

    /**
     * Indicates whether the password input is considered invalid.
     * Used to show an inline validation error and red border.
     */
    const [passwordIsInvalid, setPasswordIsInvalid] = useState<boolean>();

    /**
     * Stores authentication error messages returned from the API.
     * When this value is set, an Alert is displayed to the user.
     */
    const [authError, setAuthError] = useState<string>();

    /**
     * Indicates whether a non-expired access token exists in cache.
     * If true and user info is available, the user is redirected automatically.
     */
    const [accessTokenIsValid, setAccessTokenIsValid] = useState<boolean>(false);

    /**
     * Flag that controls the display of the loading spinner while
     * the authentication request is in progress.
     */
    const [isAuthenticating, setIsAuthenticating] = useState<boolean>(false);

    /**
     * Returns true if this screen is currently focused in the navigation stack.
     * Used here to conditionally render the StatusBar configuration.
     */
    const isFocused = useIsFocused();

    /**
     * On mount or when `authError` changes:
     * - Loads cached user info and updates the authentication context.
     * - Loads cached access token and checks if it is still valid.
     * - Shows an alert when there is an authentication error.
     */
    useEffect(() => {
        getFromCache('userInfo').then(
            (cachedUserInfo) => authenticationContext?.setValue(cachedUserInfo as User),
            (error: any) => console.log(error)
        );

        getFromCache('accessToken').then(
            (accessToken) =>
                accessToken && !isTokenExpired(accessToken as string) && setAccessTokenIsValid(true),
            (error: any) => console.log(error)
        );

        if (authError)
            Alert.alert('Authentication Error', authError, [
                { text: 'Ok', onPress: () => setAuthError(undefined) },
            ]);
    }, [authError]);

    /**
     * When a valid access token is detected and user info is present in the
     * authentication context, automatically navigate to the EventsMap screen.
     */
    useEffect(() => {
        if (accessTokenIsValid && authenticationContext?.value) navigation.navigate('EventsMap');
    }, [accessTokenIsValid]);

    /**
     * Attempts to authenticate the user using the provided email and password.
     *
     * Flow:
     * - Validates the form fields.
     * - Sends the credentials to the API if valid.
     * - On success:
     *   - Caches the user and access token.
     *   - Updates the AuthenticationContext with the logged-in user.
     *   - Navigates to the EventsMap screen.
     * - On failure:
     *   - Sets an error message so that an alert can be displayed.
     */
    const handleAuthentication = () => {
        if (formIsValid()) {
            setIsAuthenticating(true);

            api.authenticateUser(sanitizeEmail(email), password)
                .then((response) => {
                    setInCache('userInfo', response.data.user);
                    setInCache('accessToken', response.data.accessToken);
                    authenticationContext?.setValue(response.data.user);
                    setIsAuthenticating(false);
                    123;
                    navigation.navigate('EventsMap');
                })
                .catch((error) => {
                    if (error.response) {
                        setAuthError(error.response.data);
                    } else {
                        setAuthError('Something went wrong.');
                    }
                    setIsAuthenticating(false);
                });
        }
    };

    /**
     * Validates the entire login form.
     *
     * @returns `true` if both email and password are valid,
     *          otherwise `false`.
     */
    const formIsValid = () => {
        const emailIsValid = !isEmailInvalid();
        const passwordIsValid = !isPasswordInvalid();
        return emailIsValid && passwordIsValid;
    };

    /**
     * Checks whether the current password value is invalid.
     * A password is considered invalid if it has fewer than 6 characters.
     *
     * @returns `true` when the password is invalid, otherwise `false`.
     */
    const isPasswordInvalid = (): boolean => {
        const invalidCheck = password.length < 6;
        setPasswordIsInvalid(invalidCheck);
        return invalidCheck ? true : false;
    };

    /**
     * Checks whether the current email value is invalid.
     * Uses the shared `validateEmail` utility to perform validation.
     *
     * @returns `true` when the email is invalid, otherwise `false`.
     */
    const isEmailInvalid = (): boolean => {
        const invalidCheck = !validateEmail(email);
        setEmailIsInvalid(invalidCheck);
        return invalidCheck ? true : false;
    };

    return (
        <LinearGradient
            start={{ x: 0.0, y: 0.0 }}
            end={{ x: 1.0, y: 1.0 }}
            colors={['#031A62', '#00A3FF']}
            style={styles.gradientContainer}
        >
            {/* Status bar styled for this screen only when focused */}
            {isFocused && <StatusBar animated translucent style="light" />}

            <KeyboardAwareScrollView
                style={styles.container}
                contentContainerStyle={{
                    padding: 24,
                    flexGrow: 1,
                    justifyContent: 'center',
                    alignItems: 'stretch',
                }}
            >
                {/* Application logo */}
                <Image
                    resizeMode="contain"
                    style={{
                        width: 240,
                        height: 142,
                        alignSelf: 'center',
                    }}
                    source={logoImg}
                />

                <Spacer size={80} />

                {/* Email field with inline error label */}
                <View style={styles.inputLabelRow}>
                    <Text style={styles.label}>Email</Text>
                    {emailIsInvalid && <Text style={styles.error}>invalid email</Text>}
                </View>
                <TextInput
                    style={[styles.input, emailIsInvalid && styles.invalid]}
                    onChangeText={(value) => setEmail(value)}
                    onEndEditing={isEmailInvalid}
                />

                {/* Password field with inline error label */}
                <View style={styles.inputLabelRow}>
                    <Text style={styles.label}>Password</Text>
                    {passwordIsInvalid && <Text style={styles.error}>invalid password</Text>}
                </View>
                <TextInput
                    style={[styles.input, passwordIsInvalid && styles.invalid]}
                    secureTextEntry={true}
                    onChangeText={(value) => setPassword(value)}
                    onEndEditing={isPasswordInvalid}
                />

                <Spacer size={80} />

                {/* Primary action button used to submit the login form */}
                <BigButton
                    style={{ marginBottom: 8 }}
                    onPress={handleAuthentication}
                    label="Log in"
                    color="#FF8700"
                />

                {/* Overlay spinner shown while authentication is in progress */}
                <Spinner
                    visible={isAuthenticating}
                    textContent={'Authenticating...'}
                    overlayColor="#031A62BF"
                    textStyle={styles.spinnerText}
                />
            </KeyboardAwareScrollView>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    gradientContainer: {
        flex: 1,
    },

    container: {
        flex: 1,
    },

    spinnerText: {
        fontSize: 16,
        fontFamily: 'Nunito_700Bold',
        color: '#fff',
    },

    label: {
        color: '#fff',
        fontFamily: 'Nunito_600SemiBold',
        fontSize: 15,
    },

    inputLabelRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'baseline',
        marginBottom: 4,
    },

    input: {
        backgroundColor: '#fff',
        borderWidth: 1.4,
        borderColor: '#D3E2E5',
        borderRadius: 8,
        height: 56,
        paddingTop: 16,
        paddingBottom: 16,
        paddingHorizontal: 24,
        marginBottom: 16,
        color: '#5C8599',
        fontFamily: 'Nunito_600SemiBold',
        fontSize: 15,
    },

    invalid: {
        borderColor: 'red',
    },

    error: {
        color: 'white',
        fontFamily: 'Nunito_600SemiBold',
        fontSize: 12,
    },
});
