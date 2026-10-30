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
 * Sign in screen, and the app's entry point.
 *
 * Two things happen here. On mount it looks for a cached session and skips
 * straight to the map if the token is still valid. Otherwise it collects an
 * email and password, checks them locally, and exchanges them for an access
 * token which is then cached for next time.
 *
 * @param props - Stack screen props. `navigation` is used to move on to the
 * events map once the user is authenticated.
 * @returns The login screen.
 */
export default function Login({ navigation }: StackScreenProps<any>) {
    const authenticationContext = useContext(AuthenticationContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailIsInvalid, setEmailIsInvalid] = useState<boolean>();
    const [passwordIsInvalid, setPasswordIsInvalid] = useState<boolean>();
    const [authError, setAuthError] = useState<string>();

    const [accessTokenIsValid, setAccessTokenIsValid] = useState<boolean>(false);
    const [isAuthenticating, setIsAuthenticating] = useState<boolean>(false);
    const isFocused = useIsFocused();

    useEffect(() => {
        getFromCache('userInfo').then(
            (cachedUserInfo) => authenticationContext?.setValue(cachedUserInfo as User),
            (error: any) => console.log(error)
        );
        getFromCache('accessToken').then(
            (accessToken) => accessToken && !isTokenExpired(accessToken as string) && setAccessTokenIsValid(true),
            (error: any) => console.log(error)
        );
        if (authError)
            Alert.alert('Authentication Error', authError, [{ text: 'Ok', onPress: () => setAuthError(undefined) }]);
    }, [authError]);

    useEffect(() => {
        if (accessTokenIsValid && authenticationContext?.value) navigation.navigate('EventsMap');
    }, [accessTokenIsValid]);

    /**
     * Validates the form, then signs the user in.
     *
     * On success the account and token are cached and the user lands on the map.
     * On failure the server's message is put into `authError`, which the effect
     * above turns into an alert.
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
     * Runs both field checks before a request is made. Both run every time, so
     * each field's error shows at once rather than one after the other.
     *
     * @returns True when the email and the password are both acceptable.
     */
    const formIsValid = () => {
        const emailIsValid = !isEmailInvalid();
        const passwordIsValid = !isPasswordInvalid();
        return emailIsValid && passwordIsValid;
    };

    /**
     * Checks the password is long enough and updates the field's error state.
     *
     * @returns True when the password is shorter than 6 characters.
     */
    const isPasswordInvalid = (): boolean => {
        const invalidCheck = password.length < 6;
        setPasswordIsInvalid(invalidCheck);
        return invalidCheck ? true : false;
    };

    /**
     * Checks the email against {@link validateEmail} and updates the field's
     * error state. Also runs on blur, so the message appears as soon as the user
     * leaves the field.
     *
     * @returns True when the address is not usable.
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
                <View style={styles.inputLabelRow}>
                    <Text style={styles.label}>Email</Text>
                    {emailIsInvalid && <Text style={styles.error}>invalid email</Text>}
                </View>
                <TextInput
                    style={[styles.input, emailIsInvalid && styles.invalid]}
                    onChangeText={(value) => setEmail(value)}
                    onEndEditing={isEmailInvalid}
                />

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
                <BigButton style={{ marginBottom: 8 }} onPress={handleAuthentication} label="Log in" color="#FF8700" />
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
