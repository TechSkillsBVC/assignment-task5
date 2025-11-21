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
 * Root component of the application.
 *
 * Responsibilities:
 * - Loads custom Nunito fonts used across the app.
 * - Configures the global status bar appearance.
 * - Wraps the main navigation stack with ActionSheetProvider so that
 *   any screen can show an action sheet.
 */
export default function App() {
    /**
     * Loads the Nunito font family before rendering the app UI.
     *
     * `fontsLoaded` will be:
     * - `false` while the fonts are being loaded.
     * - `true` once all configured fonts have been loaded successfully.
     */
    const [fontsLoaded] = useFonts({
        Nunito_400Regular,
        Nunito_600SemiBold,
        Nunito_700Bold,
        Nunito_800ExtraBold,
    });

    /**
     * While fonts are still loading, render nothing.
     * This prevents the UI from flashing with a fallback font.
     */
    if (!fontsLoaded) {
        return null;
    } else {
        /**
         * Once fonts are loaded, render the main app:
         * - A translucent dark-status-bar configuration.
         * - The navigation stack wrapped by ActionSheetProvider.
         */
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
