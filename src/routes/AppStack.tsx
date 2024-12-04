import React, { useState } from 'react'; // React imports for component creation and state management.

import { NavigationContainer } from '@react-navigation/native'; // Provides navigation context for the app.
import { createStackNavigator } from '@react-navigation/stack'; // Stack navigator for screen-to-screen transitions.

const { Navigator, Screen } = createStackNavigator(); // Destructure Navigator and Screen from the stack navigator.

import Login from '../pages/Login'; // Login screen component.
import EventsMap from '../pages/EventsMap'; // EventsMap screen component.
import { AuthenticationContext, AuthenticationContextObject } from '../context/AuthenticationContext'; // Context for authentication state.
import { User } from '../types/User'; // Type definition for a User object.

export default function Routes() {
    const [authenticatedUser, setAuthenticatedUser] = useState<User>(); // State to hold the authenticated user's data.

    // Object to provide the authentication context value.
    const authenticationContextObj: AuthenticationContextObject = {
        value: authenticatedUser as User, // Current authenticated user.
        setValue: setAuthenticatedUser, // Function to update the authenticated user.
    };

    return (
        // Provides the authentication context to all child components.
        <AuthenticationContext.Provider value={authenticationContextObj}>
            <NavigationContainer>
                <Navigator
                    screenOptions={{
                        headerShown: false, // Hide the header for all screens.
                        cardStyle: { backgroundColor: '#F2F3F5' }, // Set a default background color for all screens.
                    }}
                >
                    {/* Define the Login screen as a part of the navigator */}
                    <Screen name="Login" component={Login} />

                    {/* Define the EventsMap screen as a part of the navigator */}
                    <Screen name="EventsMap" component={EventsMap} />
                </Navigator>
            </NavigationContainer>
        </AuthenticationContext.Provider>
    );
}
