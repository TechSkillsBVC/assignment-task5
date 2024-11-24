import { useIsFocused } from '@react-navigation/native'; // Hook to check if the screen is focused
import { StackScreenProps } from '@react-navigation/stack'; // Type definition for stack screen props
import { LinearGradient } from 'expo-linear-gradient'; 
import { StatusBar } from 'expo-status-bar'; // To manage the status bar appearance
import React, { useContext, useEffect, useState } from 'react'; 
import { Alert, Image, StyleSheet, Text, TextInput, View } from 'react-native'; // Basic UI components
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'; // For scroll handling when keyboard appears
import Spinner from 'react-native-loading-spinner-overlay'; // For displaying a loading spinner during authentication
import BigButton from '../components/BigButton'; // Custom button component
import Spacer from '../components/Spacer'; // Custom spacer component
import { AuthenticationContext } from '../context/AuthenticationContext'; // Context for authentication state
import logoImg from '../images/logo.png'; 
import * as api from '../services/api'; // API service for authentication
import { getFromCache, setInCache } from '../services/caching'; // Caching utilities for storing user data
import { User } from '../types/User'; 
import { isTokenExpired, sanitizeEmail, validateEmail } from '../utils'; // Utility functions for email validation, token expiry check, and sanitizing email

// Login component definition
export default function Login({ navigation }: StackScreenProps<any>) {
    // Authentication context to manage authenticated user data
    const authenticationContext = useContext(AuthenticationContext);

    // State variables for managing form inputs and validation
    const [email, setEmail] = useState('');  // Stores the email entered by the user
    const [password, setPassword] = useState('');  // Stores the password entered by the user
    const [emailIsInvalid, setEmailIsInvalid] = useState<boolean>();  // Flags invalid email input
    const [passwordIsInvalid, setPasswordIsInvalid] = useState<boolean>();  // Flags invalid password input
    const [authError, setAuthError] = useState<string>();  // Holds error message if authentication fails

    // States for handling authentication and token validity
    const [accessTokenIsValid, setAccessTokenIsValid] = useState<boolean>(false);  // Flags if the access token is valid
    const [isAuthenticating, setIsAuthenticating] = useState<boolean>(false);  // Flags if the authentication process is ongoing
    const isFocused = useIsFocused();  // Checks if the login screen is currently focused

    // useEffect to handle caching and token validation when the screen is focused or when there is an auth error
    useEffect(() => {
        // Load cached user info and set it in the context
        getFromCache('userInfo').then(
            (cachedUserInfo) => authenticationContext?.setValue(cachedUserInfo as User),
            (error: any) => console.log(error)
        );
        // Check cached access token validity
        getFromCache('accessToken').then(
            (accessToken) => accessToken && !isTokenExpired(accessToken as string) && setAccessTokenIsValid(true),
            (error: any) => console.log(error)
        );

        // Display error alert if there's an authentication error
        if (authError)
            Alert.alert('Authentication Error', authError, [{ text: 'Ok', onPress: () => setAuthError(undefined) }]);
    }, [authError]);

    // Redirect to EventsMap screen if the access token is valid and the user is authenticated
    useEffect(() => {
        if (accessTokenIsValid && authenticationContext?.value) navigation.navigate('EventsMap');
    }, [accessTokenIsValid]);

    // Handle authentication when the login button is pressed
    const handleAuthentication = () => {
        if (formIsValid()) {
            setIsAuthenticating(true);  // Start the authentication process
            api.authenticateUser(sanitizeEmail(email), password)  // Call the API to authenticate the user
                .then((response) => {
                    // On success, store user info and token in cache, set user context, and navigate to the map screen
                    setInCache('userInfo', response.data.user);
                    setInCache('accessToken', response.data.accessToken);
                    authenticationContext?.setValue(response.data.user);
                    setIsAuthenticating(false);
                    navigation.navigate('EventsMap');
                })
                .catch((error) => {
                    // On error, show an error message and stop the authentication process
                    if (error.response) {
                        setAuthError(error.response.data);
                    } else {
                        setAuthError('Something went wrong.');
                    }
                    setIsAuthenticating(false);
                });
        }
    };

    // Validate if the form is filled correctly
    const formIsValid = () => {
        const emailIsValid = !isEmailInvalid();  // Check if the email is valid
        const passwordIsValid = !isPasswordInvalid();  // Check if the password is valid
        return emailIsValid && passwordIsValid;  // Return true if both are valid
    };

    // Check if the password is invalid (must be at least 6 characters)
    const isPasswordInvalid = (): boolean => {
        const invalidCheck = password.length < 6;  // Password must be at least 6 characters long
        setPasswordIsInvalid(invalidCheck);
        return invalidCheck ? true : false;
    };

    // Check if the email is invalid (must be a valid email format)
    const isEmailInvalid = (): boolean => {
        const invalidCheck = !validateEmail(email);  // Check if the email format is valid
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
            {/* Conditionally show the status bar when the screen is focused */}
            {isFocused && <StatusBar animated translucent style="light" />}
            
            {/* Scrollable container to handle keyboard interactions */}
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
                    source={logoImg}
                />
                <Spacer size={80} />

                {/* Email input field with validation error message */}
                <View style={styles.inputLabelRow}>
                    <Text style={styles.label}>Email</Text>
                    {emailIsInvalid && <Text style={styles.error}>invalid email</Text>}
                </View>
                <TextInput
                    style={[styles.input, emailIsInvalid && styles.invalid]}
                    onChangeText={(value) => setEmail(value)}  // Update email state on text change
                    onEndEditing={isEmailInvalid}  // Validate email when editing ends
                />

                {/* Password input field with validation error message */}
                <View style={styles.inputLabelRow}>
                    <Text style={styles.label}>Password</Text>
                    {passwordIsInvalid && <Text style={styles.error}>invalid password</Text>}
                </View>
                <TextInput
                    style={[styles.input, passwordIsInvalid && styles.invalid]}
                    secureTextEntry={true}  // Hide password text
                    onChangeText={(value) => setPassword(value)}  // Update password state on text change
                    onEndEditing={isPasswordInvalid}  // Validate password when editing ends
                />
                <Spacer size={80} />

                {/* Login button */}
                <BigButton style={{ marginBottom: 8 }} onPress={handleAuthentication} label="Log in" color="#FF8700" />

                {/* Spinner that shows while authenticating */}
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
