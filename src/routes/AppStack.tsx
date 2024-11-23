import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const { Navigator, Screen } = createStackNavigator();

import Login from '../pages/Login';
import EventsMap from '../pages/EventsMap';
import { AuthenticationContext, AuthenticationContextObject } from '../context/AuthenticationContext';
import { User } from '../types/User';

export default function Routes() {
    // State to manage the currently authenticated user
    const [authenticatedUser, setAuthenticatedUser] = useState<User>();

    // Object to hold the context value for authentication
    const authenticationContextObj: AuthenticationContextObject = {
        value: authenticatedUser as User, // The authenticated user object
        setValue: setAuthenticatedUser,  // Function to update the user
    };

    return (
        // Provides the authentication context to the component tree
        <AuthenticationContext.Provider value={authenticationContextObj}>
            <NavigationContainer>
                <Navigator
                    // Default screen options for the stack navigator
                    screenOptions={{
                        headerShown: false, // Hides the header for all screens
                        cardStyle: { backgroundColor: '#F2F3F5' }, // Background color for the screens
                    }}
                >
                    {/* Login Screen */}
                    <Screen name="Login" component={Login} />

                    {/* Events Map Screen */}
                    <Screen name="EventsMap" component={EventsMap} />
                </Navigator>
            </NavigationContainer>
        </AuthenticationContext.Provider>
    );
}
