import React, { useState } from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const { Navigator, Screen } = createStackNavigator();

import Login from '../pages/Login';
import EventsMap from '../pages/EventsMap';
import { AuthenticationContext, AuthenticationContextObject } from '../context/AuthenticationContext';
import { User } from '../types/User';

/**
 * AppStack (Routes)
 *
 * This component manages the root navigation flow of the app.
 *
 * Responsibilities:
 * - Create the global authentication context.
 * - Store the authenticated user in state.
 * - Provide the authentication object to all screens through context.
 * - Configure and render the stack navigator with:
 *      - Login screen
 *      - Events Map screen
 *
 * The navigator hides headers and applies a consistent background color.
 */
export default function Routes() {
    /**
     * State that stores the current authenticated user.
     * `undefined` means the user is not logged in yet.
     */
    const [authenticatedUser, setAuthenticatedUser] = useState<User>();

    /**
     * This object is passed into the AuthenticationContext provider.
     *
     * @property value - The currently authenticated user.
     * @property setValue - Function to update the authenticated user.
     */
    const authenticationContextObj: AuthenticationContextObject = {
        value: authenticatedUser as User,
        setValue: setAuthenticatedUser,
    };

    return (
        /**
         * AuthenticationContext.Provider:
         * Allows all nested components to access the authenticated user
         * and update it without having to pass props down manually.
         */
        <AuthenticationContext.Provider value={authenticationContextObj}>
            <NavigationContainer>
                <Navigator
                    screenOptions={{
                        headerShown: false,
                        cardStyle: { backgroundColor: '#F2F3F5' },
                    }}
                >
                    {/* Login screen responsible for authenticating the user */}
                    <Screen name="Login" component={Login} />

                    {/* Map screen that displays events once the user logs in */}
                    <Screen name="EventsMap" component={EventsMap} />
                </Navigator>
            </NavigationContainer>
        </AuthenticationContext.Provider>
    );
}
