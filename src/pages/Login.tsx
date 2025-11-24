/**
 * Screen: Login
 * ---------------------------------------------
 * Responsibilities:
 *  - Collects user credentials (email and password).
 *  - Validates the input fields with basic rules.
 *  - Authenticates against the backend API.
 *  - Caches the user and access token on success.
 *  - If a valid cached token is found on load, automatically
 *    skips this screen and navigates to EventsMap.
 */

import { useIsFocused } from "@react-navigation/native";
import { StackScreenProps } from "@react-navigation/stack";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import React, { useContext, useEffect, useState } from "react";
import { Alert, Image, StyleSheet, Text, TextInput, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Spinner from "react-native-loading-spinner-overlay";
import BigButton from "../components/BigButton";
import Spacer from "../components/Spacer";
import { AuthenticationContext } from "../context/AuthenticationContext";
import logoImg from "../images/logo.png";
import * as api from "../services/api";
import { getFromCache, setInCache } from "../services/caching";
import { User } from "../types/User";
import { isTokenExpired, sanitizeEmail, validateEmail } from "../utils";

export default function Login({ navigation }: StackScreenProps<any>) {
  // Holds the authenticated user and updater provided by context
  const authenticationContext = useContext(AuthenticationContext);

  // Form state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Validation flags that control error styling and messages
  const [emailIsInvalid, setEmailIsInvalid] = useState<boolean>();
  const [passwordIsInvalid, setPasswordIsInvalid] = useState<boolean>();

  // Holds a user-friendly error message from the auth request
  const [authError, setAuthError] = useState<string>();

  // Token & loading state
  const [accessTokenIsValid, setAccessTokenIsValid] = useState<boolean>(false);
  const [isAuthenticating, setIsAuthenticating] = useState<boolean>(false);

  // React Navigation helper so we only show the StatusBar when focused
  const isFocused = useIsFocused();

  /**
   * Side effect:
   *  - On first render, tries to read any cached user and token.
   *  - If a non-expired token is found, marks it as valid.
   *  - If an authentication error string is set, show an alert and
   *    clear the error when the user dismisses it.
   */
  useEffect(() => {
    // Load cached user info (if any) and push it into the auth context.
    getFromCache("userInfo").then(
      (cachedUserInfo) =>
        authenticationContext?.setValue(cachedUserInfo as User),
      (error: any) => console.log(error)
    );

    // Load cached access token and mark it as valid if not expired.
    getFromCache("accessToken").then(
      (accessToken) =>
        accessToken &&
        !isTokenExpired(accessToken as string) &&
        setAccessTokenIsValid(true),
      (error: any) => console.log(error)
    );

    // Whenever authError changes, display it to the user.
    if (authError)
      Alert.alert("Authentication Error", authError, [
        { text: "Ok", onPress: () => setAuthError(undefined) },
      ]);
  }, [authError]);

  /**
   * If we know the access token is valid and the AuthenticationContext
   * already holds a user value, automatically send the user to EventsMap.
   */
  useEffect(() => {
    if (accessTokenIsValid && authenticationContext?.value)
      navigation.navigate("EventsMap");
  }, [accessTokenIsValid]);

  /**
   * Attempts to authenticate the user using the form values.
   *
   * Flow:
   *  1. Validate the form.
   *  2. Call api.authenticateUser() with sanitized email + password.
   *  3. On success:
   *      - cache user info and access token;
   *      - update auth context;
   *      - stop spinner and navigate to EventsMap.
   *  4. On failure:
   *      - set a user-readable error (from API or generic);
   *      - stop spinner.
   */
  const handleAuthentication = () => {
    if (formIsValid()) {
      setIsAuthenticating(true);
      api
        .authenticateUser(sanitizeEmail(email), password)
        .then((response) => {
          // Persist user and token for later auto-login
          setInCache("userInfo", response.data.user);
          setInCache("accessToken", response.data.accessToken);

          // Update global auth state
          authenticationContext?.setValue(response.data.user);

          setIsAuthenticating(false);

          // Navigate to the main map screen after successful login
          navigation.navigate("EventsMap");
        })
        .catch((error) => {
          // If backend responded with a message, show it; otherwise use a generic one
          if (error.response) {
            setAuthError(error.response.data);
          } else {
            setAuthError("Something went wrong.");
          }
          setIsAuthenticating(false);
        });
    }
  };

  /**
   * Runs all validation checks and returns true if the form is valid.
   * This method also updates the validation flags used for UI feedback.
   */
  const formIsValid = () => {
    const emailIsValid = !isEmailInvalid();
    const passwordIsValid = !isPasswordInvalid();
    return emailIsValid && passwordIsValid;
  };

  /**
   * Validates the password.
   *
   * Rule:
   *  - Must be at least 6 characters.
   *
   * Returns:
   *  - true if invalid, false otherwise (and updates state).
   */
  const isPasswordInvalid = (): boolean => {
    const invalidCheck = password.length < 6;
    setPasswordIsInvalid(invalidCheck);
    return invalidCheck ? true : false;
  };

  /**
   * Validates the email format using the shared validateEmail() util.
   *
   * Returns:
   *  - true if invalid, false otherwise (and updates state).
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
      colors={["#031A62", "#00A3FF"]}
      style={styles.gradientContainer}
    >
      {/* Show a light-colored status bar only while this screen is focused */}
      {isFocused && <StatusBar animated translucent style="light" />}

      {/* Scroll view that adjusts to the keyboard so inputs remain visible */}
      <KeyboardAwareScrollView
        style={styles.container}
        contentContainerStyle={{
          padding: 24,
          flexGrow: 1,
          justifyContent: "center",
          alignItems: "stretch",
        }}
      >
        {/* App logo */}
        <Image
          resizeMode="contain"
          style={{
            width: 240,
            height: 142,
            alignSelf: "center",
          }}
          source={logoImg}
        />

        <Spacer size={80} />

        {/* Email label + inline validation message */}
        <View style={styles.inputLabelRow}>
          <Text style={styles.label}>Email</Text>
          {emailIsInvalid && <Text style={styles.error}>invalid email</Text>}
        </View>
        <TextInput
          style={[styles.input, emailIsInvalid && styles.invalid]}
          onChangeText={(value) => setEmail(value)}
          // Validate when user finishes editing
          onEndEditing={isEmailInvalid}
        />

        {/* Password label + inline validation message */}
        <View style={styles.inputLabelRow}>
          <Text style={styles.label}>Password</Text>
          {passwordIsInvalid && (
            <Text style={styles.error}>invalid password</Text>
          )}
        </View>
        <TextInput
          style={[styles.input, passwordIsInvalid && styles.invalid]}
          secureTextEntry={true}
          onChangeText={(value) => setPassword(value)}
          // Validate when user finishes editing
          onEndEditing={isPasswordInvalid}
        />

        <Spacer size={80} />

        {/* Primary login button */}
        <BigButton
          style={{ marginBottom: 8 }}
          onPress={handleAuthentication}
          label="Log in"
          color="#FF8700"
        />

        {/* Full-screen loading overlay shown while authenticating */}
        <Spinner
          visible={isAuthenticating}
          textContent={"Authenticating..."}
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
    fontFamily: "Nunito_700Bold",
    color: "#fff",
  },

  label: {
    color: "#fff",
    fontFamily: "Nunito_600SemiBold",
    fontSize: 15,
  },

  inputLabelRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
    marginBottom: 4,
  },

  input: {
    backgroundColor: "#fff",
    borderWidth: 1.4,
    borderColor: "#D3E2E5",
    borderRadius: 8,
    height: 56,
    paddingTop: 16,
    paddingBottom: 16,
    paddingHorizontal: 24,
    marginBottom: 16,
    color: "#5C8599",
    fontFamily: "Nunito_600SemiBold",
    fontSize: 15,
  },

  // Extra style to indicate invalid input
  invalid: {
    borderColor: "red",
  },

  error: {
    color: "white",
    fontFamily: "Nunito_600SemiBold",
    fontSize: 12,
  },
});
