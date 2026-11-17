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
 * App is the root component of the application.
 *
 * Responsibilities:
 * - Load the Nunito font weights the rest of the app relies on, and keep the
 *   screen blank until they finish loading, so no text is rendered with a
 *   fallback system font.
 * - Provide the action sheet context (`ActionSheetProvider`) that any screen
 *   can use to show a native action sheet, such as a photo source picker.
 * - Render the status bar and the navigation stack (`AppStack`), which is
 *   where every screen in the app is registered.
 *
 * Inputs: none, this component takes no props.
 * Output: the whole app's component tree, or `null` while fonts are loading.
 */
export default function App() {
    const [fontsLoaded] = useFonts({
        Nunito_400Regular,
        Nunito_600SemiBold,
        Nunito_700Bold,
        Nunito_800ExtraBold,
    });

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
