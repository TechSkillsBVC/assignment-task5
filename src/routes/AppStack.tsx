import React, { useState } from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const { Navigator, Screen } = createStackNavigator();

import Login from '../pages/Login';
import EventsMap from '../pages/EventsMap';
import { AuthenticationContext, AuthenticationContextObject } from '../context/AuthenticationContext';
import { User } from '../types/User';

/**
 * Routes is the app's navigation root.
 *
 * Responsibilities:
 * - Hold the currently logged in user's state and supply it, together with
 *   its setter, to the rest of the app through `AuthenticationContext`.
 * - Register every screen in the app (currently `Login` and `EventsMap`) on
 *   a single stack navigator, with a shared header and background style.
 *
 * Inputs: none, this component takes no props.
 * Output: the `NavigationContainer` that renders whichever screen is
 * currently active, wrapped in the authentication context provider.
 */
export default function Routes() {
    const [authenticatedUser, setAuthenticatedUser] = useState<User>();

    const authenticationContextObj: AuthenticationContextObject = {
        value: authenticatedUser as User,
        setValue: setAuthenticatedUser,
    };

    return (
        <AuthenticationContext.Provider value={authenticationContextObj}>
            <NavigationContainer>
                <Navigator
                    screenOptions={{
                        headerShown: false,
                        cardStyle: { backgroundColor: '#F2F3F5' },
                    }}
                >
                    <Screen name="Login" component={Login} />

                    <Screen name="EventsMap" component={EventsMap} />
                </Navigator>
            </NavigationContainer>
        </AuthenticationContext.Provider>
    );
}
