
import React, { useState } from 'react';  // React and useState for managing component state
import { NavigationContainer } from '@react-navigation/native';  // Navigation container for handling navigation stack
import { createStackNavigator } from '@react-navigation/stack';  // Stack navigator for managing screen transitions

// Destructure Navigator and Screen from the stack navigator creator
const { Navigator, Screen } = createStackNavigator();

// Import pages/screens to be used in the navigation
import Login from '../pages/Login';  
import EventsMap from '../pages/EventsMap';  

// Import Context for managing user authentication state 
import { AuthenticationContext, AuthenticationContextObject } from '../context/AuthenticationContext';  // 
import { User } from '../types/User';  

// Default function to manage the app's routing/navigation
export default function Routes() {
    // Use useState hook to manage the authenticated user's state
    const [authenticatedUser, setAuthenticatedUser] = useState<User>();  // State for storing authenticated user data

    // Create the authentication context object to pass the user state and setter function to the context provider
    const authenticationContextObj: AuthenticationContextObject = {
        value: authenticatedUser as User,  // The current authenticated user, default is undefined
        setValue: setAuthenticatedUser,  // Function to update the authenticated user
    };

    return (
        // Provide the authentication context to the entire app using AuthenticationContext.Provider
        <AuthenticationContext.Provider value={authenticationContextObj}>
            {/* Navigation container to manage the navigation state */}
            <NavigationContainer>
                {/* Stack navigator to define the navigation flow */}
                <Navigator
                    screenOptions={{
                        headerShown: false,  // Disable header across all screens
                        cardStyle: { backgroundColor: '#F2F3F5' },  
                    }}
                >
                    {/* Define the screens (routes) for the navigation */}
                    <Screen name="Login" component={Login} />  
                    <Screen name="EventsMap" component={EventsMap} />  
                </Navigator>
            </NavigationContainer>
        </AuthenticationContext.Provider>
    );
}
