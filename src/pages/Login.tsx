import { useIsFocused } from '@react-navigation/native'; // Hook to check if the current screen is focused.
import { StackScreenProps } from '@react-navigation/stack'; // TypeScript type for screen props in a stack navigator.
import { LinearGradient } from 'expo-linear-gradient'; // Provides a gradient background.
import { StatusBar } from 'expo-status-bar'; // Customizes the appearance of the status bar.
import React, { useContext, useEffect, useState } from 'react'; // React hooks for state management and lifecycle methods.
import { Alert, Image, StyleSheet, Text, TextInput, View } from 'react-native'; // Core React Native components.
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'; // Scroll view to manage keyboard overlaps.
import Spinner from 'react-native-loading-spinner-overlay'; // Displays a loading spinner.
import BigButton from '../components/BigButton'; // Custom button component.
import Spacer from '../components/Spacer'; // Spacer component for consistent spacing.
import { AuthenticationContext } from '../context/AuthenticationContext'; // Context for authentication state.
import logoImg from '../images/logo.png'; // Logo image.
import * as api from '../services/api'; // API service functions.
import { getFromCache, setInCache } from '../services/caching'; // Functions for caching data locally.
import { User } from '../types/User'; // Type definition for a User object.
import { isTokenExpired, sanitizeEmail, validateEmail } from '../utils'; // Utility functions.

export default function Login({ navigation }: StackScreenProps<any>) {
    const authenticationContext = useContext(AuthenticationContext); // Access the authentication context.
    const [email, setEmail] = useState(''); // Stores the entered email.
    const [password, setPassword] = useState(''); // Stores the entered password.
    const [emailIsInvalid, setEmailIsInvalid] = useState<boolean>(); // Tracks if the email is invalid.
    const [passwordIsInvalid, setPasswordIsInvalid] = useState<boolean>(); // Tracks if the password is invalid.
    const [authError, setAuthError] = useState<string>(); // Stores any authentication error message.

    const [accessTokenIsValid, setAccessTokenIsValid] = useState<boolean>(false); // Tracks if the access token is valid.
    const [isAuthenticating, setIsAuthenticating] = useState<boolean>(false); // Tracks if the app is currently authenticating.
    const isFocused = useIsFocused(); // Tracks if the screen is currently focused.

    // Effect to check for cached user and access token when the component mounts or the screen is focused.
    useEffect(() => {
        getFromCache('userInfo').then(
            (cachedUserInfo) => authenticationContext?.setValue(cachedUserInfo as User), // Set cached user info in context.
            (error: any) => console.log(error) // Log any errors while fetching user info.
        );
        getFromCache('accessToken').then(
            (accessToken) => accessToken && !isTokenExpired(accessToken as string) && setAccessTokenIsValid(true), // Validate access token.
            (error: any) => console.log(error) // Log errors while fetching the token.
        );

        // Display authentication error alert if an error exists.
        if (authError)
            Alert.alert('Authentication Error', authError, [{ text: 'Ok', onPress: () => setAuthError(undefined) }]);
    }, [authError]);

    // Navigate to the EventsMap screen if the user is authenticated.
    useEffect(() => {
        if (accessTokenIsValid && authenticationContext?.value) navigation.navigate('EventsMap');
    }, [accessTokenIsValid]);

    // Handles user login authentication.
    const handleAuthentication = () => {
        if (formIsValid()) { // Proceed only if the form is valid.
            setIsAuthenticating(true); // Show the loading spinner.
            api.authenticateUser(sanitizeEmail(email), password) // Call the API to authenticate the user.
                .then((response) => {
                    setInCache('userInfo', response.data.user); // Cache user info.
                    setInCache('accessToken', response.data.accessToken); // Cache access token.
                    authenticationContext?.setValue(response.data.user); // Update context with user info.
                    setIsAuthenticating(false); // Hide the loading spinner.
                    navigation.navigate('EventsMap'); // Navigate to the EventsMap screen.
                })
                .catch((error) => {
                    // Handle authentication errors.
                    if (error.response) {
                        setAuthError(error.response.data); // Set error message from API response.
                    } else {
                        setAuthError('Something went wrong.'); // Set generic error message.
                    }
                    setIsAuthenticating(false); // Hide the loading spinner.
                });
        }
    };

    // Validates the email and password fields before authentication.
    const formIsValid = () => {
        const emailIsValid = !isEmailInvalid(); // Check if the email is valid.
        const passwordIsValid = !isPasswordInvalid(); // Check if the password is valid.
        return emailIsValid && passwordIsValid; // Return true if both fields are valid.
    };

    // Checks if the password meets the required conditions.
    const isPasswordInvalid = (): boolean => {
        const invalidCheck = password.length < 6; // Password must be at least 6 characters long.
        setPasswordIsInvalid(invalidCheck); // Update the state based on the check.
        return invalidCheck ? true : false;
    };

    // Validates the email format using a utility function.
    const isEmailInvalid = (): boolean => {
        const invalidCheck = !validateEmail(email); // Use a utility to validate email format.
        setEmailIsInvalid(invalidCheck); // Update the state based on the check.
        return invalidCheck ? true : false;
    };

    return (
        <LinearGradient
            start={{ x: 0.0, y: 0.0 }}
            end={{ x: 1.0, y: 1.0 }}
            colors={['#031A62', '#00A3FF']} // Gradient colors for the background.
            style={styles.gradientContainer}
        >
            {isFocused && <StatusBar animated translucent style="light" />} {/* Set light status bar style when focused */}
            <KeyboardAwareScrollView
                style={styles.container}
                contentContainerStyle={{
                    padding: 24,
                    flexGrow: 1,
                    justifyContent: 'center',
                    alignItems: 'stretch',
                }}
            >
                <Image
                    resizeMode="contain"
                    style={{
                        width: 240,
                        height: 142,
                        alignSelf: 'center',
                    }}
                    source={logoImg} // Display the logo at the center.
                />
                <Spacer size={80} /> {/* Spacer for consistent spacing */}
                <View style={styles.inputLabelRow}>
                    <Text style={styles.label}>Email</Text>
                    {emailIsInvalid && <Text style={styles.error}>invalid email</Text>} {/* Show error if email is invalid */}
                </View>
                <TextInput
                    style={[styles.input, emailIsInvalid && styles.invalid]} // Highlight input field if invalid.
                    onChangeText={(value) => setEmail(value)} // Update email state on input change.
                    onEndEditing={isEmailInvalid} // Validate email on blur.
                />

                <View style={styles.inputLabelRow}>
                    <Text style={styles.label}>Password</Text>
                    {passwordIsInvalid && <Text style={styles.error}>invalid password</Text>} {/* Show error for invalid password */}
                </View>
                <TextInput
                    style={[styles.input, passwordIsInvalid && styles.invalid]} // Highlight input field if invalid.
                    secureTextEntry={true} // Mask the password input.
                    onChangeText={(value) => setPassword(value)} // Update password state on input change.
                    onEndEditing={isPasswordInvalid} // Validate password on blur.
                />
                <Spacer size={80} /> {/* Spacer for consistent spacing */}
                <BigButton style={{ marginBottom: 8 }} onPress={handleAuthentication} label="Log in" color="#FF8700" />
                <Spinner
                    visible={isAuthenticating} // Show spinner during authentication.
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
        borderColor: 'red', // Highlight invalid inputs
