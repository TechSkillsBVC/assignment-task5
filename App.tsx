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
// Main app component that loads custom fonts and renders the navigation stack.
export default function App() {
    // Loads the Nunito fonts before displaying the app.
    const [fontsLoaded] = useFonts({
        Nunito_400Regular,
        Nunito_600SemiBold,
        Nunito_700Bold,
        Nunito_800ExtraBold,
    });
// Waits to render the UI until all custom fonts have finished loading.
    if (!fontsLoaded) {
        return null;
    } else {
        return (
            <>
                <StatusBar animated translucent style="dark" />
                <ActionSheetProvider>
                    <AppStack />
                </ActionSheetProvider>
            </>
        );
    }
}
