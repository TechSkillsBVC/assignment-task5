// ENTRY POINT******

// Import necessary libraries and components
import React from 'react';
import { ActionSheetProvider } from '@expo/react-native-action-sheet'; // Provides action sheet functionality for the app

// Import fonts from Expo Google Fonts
import {
    useFonts,  // Hook for loading custom fonts
    Nunito_400Regular,  // Regular font weight
    Nunito_600SemiBold,  // SemiBold font weight
    Nunito_700Bold,  // Bold font weight
    Nunito_800ExtraBold,  // ExtraBold font weight
} from '@expo-google-fonts/nunito';  // Nunito font family

// Import AppStack for navigation routes
import AppStack from './src/routes/AppStack';  // The main app stack for navigating through the app
import { StatusBar } from 'expo-status-bar';  // Provides control over the status bar appearance

// Default App component
export default function App() {
    // Load fonts using the useFonts hook
    const [fontsLoaded] = useFonts({
        Nunito_400Regular,  // Load Regular font
        Nunito_600SemiBold,  // Load SemiBold font
        Nunito_700Bold,  // Load Bold font
        Nunito_800ExtraBold,  // Load ExtraBold font
    });

    // Check if the fonts are loaded, if not, render nothing
    if (!fontsLoaded) {
        return null;  // Return nothing if fonts are not yet loaded
    } else {
        // Once fonts are loaded, render the app components
        return (
            <>
                {/* StatusBar configuration: dark style and translucent background */}
                <StatusBar animated translucent style="dark" />

                {/* ActionSheetProvider is wrapping the main app stack to provide action sheet capabilities */}
                <ActionSheetProvider>
                    {/* AppStack manages the app's routing/navigation */}
                    <AppStack />
                </ActionSheetProvider>
            </>
        );
    }
}
