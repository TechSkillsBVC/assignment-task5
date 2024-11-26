import { useIsFocused } from '@react-navigation/native'; // Hook to determine if the screen is focused
import { StackScreenProps } from '@react-navigation/stack'; // Type for stack screen props
import { LinearGradient } from 'expo-linear-gradient'; // Component for gradient backgrounds
import { StatusBar } from 'expo-status-bar'; // Component for managing the status bar
import React, { useContext, useEffect, useState } from 'react'; // React and hooks
import { Alert, Image, StyleSheet, Text, TextInput, View } from 'react-native'; // Core react-native components
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'; // Scroll view that adjusts with keyboard
import Spinner from 'react-native-loading-spinner-overlay'; // Spinner component for loading state
import BigButton from '../components/BigButton'; // Custom button component
import Spacer from '../components/Spacer'; // Custom spacer component for layout
import { AuthenticationContext } from '../context/AuthenticationContext'; // Context for authentication state
import logoImg from '../images/logo.png'; // Logo image import
import * as api from '../services/api'; // API service for authentication
import { getFromCache, setInCache } from '../services/caching'; // Caching utility functions
import { User } from '../types/User'; // User type definition
import { isTokenExpired, sanitizeEmail, validateEmail } from '../utils'; // Utility functions for email validation

// Main Login component
export default function Login({ navigation }: StackScreenProps<any>) {
    // Context to manage authentication state
    const authenticationContext = useContext(AuthenticationContext);

    // State variables for email, password, validation errors, and loading state
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailIsInvalid, setEmailIsInvalid] = useState<boolean>();
    const [passwordIsInvalid, setPasswordIsInvalid] = useState<boolean>();
    const [authError, setAuthError] = useState<string>();

    const [accessTokenIsValid, setAccessTokenIsValid] = useState<boolean>(false);
    const [isAuthenticating, setIsAuthenticating] = useState<boolean>(false);
    const isFocused = useIsFocused(); // Check if the screen is focused

    useEffect(() => {
        // Fetch user info and access token from cache when the component mounts or authError changes
        getFromCache('userInfo').then(
            (cachedUserInfo) => authenticationContext?.setValue(cachedUserInfo as User),
            (error: any) => console.log(error)
        );
        getFromCache('accessToken').then(
            (accessToken) => accessToken && !isTokenExpired(accessToken as string) && setAccessTokenIsValid(true),
            (error: any) => console.log(error)
        );
        // Show an alert for authentication errors if they exist
        if (authError)
            Alert.alert('Authentication Error', authError, [{ text: 'Ok', onPress: () => setAuthError(undefined) }]);
    }, [authError]);

    useEffect(() => {
        // Navigate to EventsMap if the access token is valid and user info exists
        if (accessTokenIsValid && authenticationContext?.value) navigation.navigate('EventsMap');
    }, [accessTokenIsValid]);

    // Function to handle user authentication on button press
    const handleAuthentication = () => {
        if (formIsValid()) {
            setIsAuthenticating(true); // Set loading state to true
            api.authenticateUser(sanitizeEmail(email), password) // Call API to authenticate user
                .then((response) => {
                    // Store user info and access token in cache and update context
                    setInCache('userInfo', response.data.user);
                    setInCache('accessToken', response.data.accessToken);
                    authenticationContext?.setValue(response.data.user);
                    setIsAuthenticating(false); // Reset loading state
                    navigation.navigate('EventsMap'); // Navigate to EventsMap on success
                })
                .catch((error) => {
                    // Handle authentication error by setting the error message state
                    if (error.response) {
                        setAuthError(error.response.data);
                    } else {
                        setAuthError('Something went wrong.');
                    }
                    setIsAuthenticating(false); // Reset loading state on error
                });
        }
    };

    // Function to validate the form inputs
    const formIsValid = () => {
        const emailIsValid = !isEmailInvalid();
        const passwordIsValid = !isPasswordInvalid();
        return emailIsValid && passwordIsValid; // Return true only if both inputs are valid
    };

    // Function to check if the password is invalid based on its length
    const isPasswordInvalid = (): boolean => {
        const invalidCheck = password.length < 6; // Password must be at least 6 characters long
        setPasswordIsInvalid(invalidCheck);
        return invalidCheck ? true : false;
    };

    // Function to check if the email is invalid based on validation rules
    const isEmailInvalid = (): boolean => {
        const invalidCheck = !validateEmail(email); // Validate email format
        setEmailIsInvalid(invalidCheck);
        return invalidCheck ? true : false;
    };

    return (
        <LinearGradient
            start={{ x: 0.0, y: 0.0 }} // Gradient start point
            end={{ x: 1.0, y: 1.0 }} // Gradient end point
            colors={['#031A62', '#00A3FF']} // Gradient colors
            style={styles.gradientContainer} // Styles for gradient container
        >
            {isFocused && <StatusBar animated translucent style="light" />} {/* Manage status bar */}
            <KeyboardAwareScrollView
                style={styles.container} // Styles for scroll view container
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
                    source={logoImg} // Logo image source
                />
                <Spacer size={80} /> {/* Space above the input fields */}
                <View style={styles.inputLabelRow}>
                    <Text style={styles.label}>Email</Text>
                    {emailIsInvalid && <Text style={styles.error}>invalid email</Text>} {/* Show error if email is invalid */}
                </View>
                <TextInput
                    style={[styles.input, emailIsInvalid && styles.invalid]} // Input styles based on validation
                    onChangeText={(value) => setEmail(value)} // Update email state on text change
                    onEndEditing={isEmailInvalid} // Validate email on input end editing
                />

                <View style={styles.inputLabelRow}>
                    <Text style={styles.label}>Password</Text>
                    {passwordIsInvalid && <Text style={styles.error}>invalid password</Text>} {/* Show error if password is invalid */}
                </View>
                <TextInput
                    style={[styles.input, passwordIsInvalid && styles.invalid]} // Input styles based on validation
                    secureTextEntry={true} // Hide password input
                    onChangeText={(value) => setPassword(value)} // Update password state on text change
                    onEndEditing={isPasswordInvalid} // Validate password on input end editing
                />
                <Spacer size={80} /> {/* Space above the login button */}
                <BigButton style={{ marginBottom: 8 }} onPress={handleAuthentication} label="Log in" color="#FF8700" /> {/* Login button */}
                <Spinner
                    visible={isAuthenticating} // Show spinner when authenticating
                    textContent={'Authenticating...'}
                    overlayColor="#031A62BF"
                    textStyle={styles.spinnerText}
                />
            </KeyboardAwareScrollView>
        </LinearGradient>
    );
}

// Styles for the component using StyleSheet.create for better performance and organization
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
        borderColor: 'red', // Styles for invalid input fields (red border)
    },

    error: {
        color: 'white', // Error message color and style
        fontFamily: 'Nunito_600SemiBold',
        fontSize: 12,
    },
});
