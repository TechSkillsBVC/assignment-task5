import React, { useState } from 'react';

// Importing necessary components from React Navigation library
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Destructuring Navigator and Screen components from createStackNavigator
const { Navigator, Screen } = createStackNavigator();

// Importing pages and context to be used in the application
import Login from '../pages/Login'; // Login page component
import EventsMap from '../pages/EventsMap'; // EventsMap page component
import { AuthenticationContext, AuthenticationContextObject } from '../context/AuthenticationContext'; // Authentication context and its object type
import { User } from '../types/User'; // User type definition

// Main function component responsible for defining the routes of the application
export default function Routes() {
    // State to manage authenticated user data, initially undefined
    const [authenticatedUser, setAuthenticatedUser] = useState<User>();

    // Create an authentication context object to provide user data and setter function
    const authenticationContextObj: AuthenticationContextObject = {
        value: authenticatedUser as User, // Current authenticated user
        setValue: setAuthenticatedUser,   // Function to update authenticated user
    };

    // Return the navigation structure wrapped with authentication context provider
    return (
        <AuthenticationContext.Provider value={authenticationContextObj}>
            <NavigationContainer>
                <Navigator
                    // Screen options for the navigator, setting default styles and behavior
                    screenOptions={{
                        headerShown: false, // Hides the header for all screens
                        cardStyle: { backgroundColor: '#F2F3F5' }, // Sets default background color for screens
                    }}
                >
                    {/* Defines the Login screen with its component */}
                    <Screen name="Login" component={Login} />

                    {/* Defines the EventsMap screen with its component */}
                    <Screen name="EventsMap" component={EventsMap} />
                </Navigator>
            </NavigationContainer>
        </AuthenticationContext.Provider>
    );
}
