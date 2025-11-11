import React from 'react';
import { ActionSheetProvider } from '@expo/react-native-action-sheet';

import {
  useFonts,
  Nunito_400Regular,
  Nunito_600SemiBold,
  Nunito_700Bold,
  Nunito_800ExtraBold,
} from '@expo-google-fonts/nunito';

import AppStack from './src/routes/AppStack';
import { StatusBar } from 'expo-status-bar';

/**
 * App (root component)
 * - Loads custom Nunito fonts.
 * - Wraps the app with ActionSheetProvider (for action sheets).
 * - Shows a StatusBar and the main navigation stack.
 */
export default function App() {
  // Load fonts once at startup.
  const [fontsLoaded] = useFonts({
    Nunito_400Regular,
    Nunito_600SemiBold,
    Nunito_700Bold,
    Nunito_800ExtraBold,
  });

  // If fonts aren't ready yet, render nothing (prevents layout jumps).
  if (!fontsLoaded) {
    return null;
  } else {
    return (
      <>
        {/* Dark content on translucent status bar */}
        <StatusBar animated translucent style="dark" />

        {/* Provides showActionSheetWithOptions() to any child component */}
        <ActionSheetProvider>
          <AppStack />
        </ActionSheetProvider>
      </>
    );
  }
}
