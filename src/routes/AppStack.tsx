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
 * - Sets up the navigation flow for the app.
 * - Provides AuthenticationContext so screens can read/update the current user.
 */
export default function Routes() {
  // Holds the logged-in user (undefined means "not logged in").
  const [authenticatedUser, setAuthenticatedUser] = useState<User>();

  // Context value passed to the Provider (used by Login/EventsMap).
  const authenticationContextObj: AuthenticationContextObject = {
    value: authenticatedUser as User, // cast because context expects User; screens should handle undefined safely.
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
          {/* First screen: login form */}
          <Screen name="Login" component={Login} />

          {/* Map screen shown after successful login */}
          <Screen name="EventsMap" component={EventsMap} />
        </Navigator>
      </NavigationContainer>
    </AuthenticationContext.Provider>
  );
}
