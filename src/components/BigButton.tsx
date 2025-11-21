import React from 'react';
import { Feather } from '@expo/vector-icons';
import { StyleSheet, Text } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';

/**
 * BigButtonProps
 * ---------------
 * Defines the properties accepted by the BigButton component.
 *
 * @property label
 *  - The text displayed on the button.
 *
 * @property color
 *  - The background color of the button.
 *
 * @property style
 *  - Optional external styling passed to the button container.
 *
 * @property featherIconName
 *  - Optional Feather icon name to display before the label.
 *  - Uses the Feather icon set available in Expo.
 *
 * @property disabled
 *  - When true, the button is visually muted and interaction can be blocked.
 *
 * @property onPress
 *  - Function executed when the button is pressed.
 */
interface BigButtonProps {
    label: string;
    color: string;
    style?: {};
    featherIconName?: keyof typeof Feather.glyphMap;
    disabled?: boolean;
    onPress: () => void;
}

/**
 * BigButton Component
 * --------------------
 * A reusable button used throughout the application.
 *
 * Responsibilities:
 * - Display a large, stylized button with optional icon.
 * - Dynamically apply color and disabled styles.
 * - Trigger the provided `onPress` callback when tapped.
 *
 * This is used in screen-level actions such as login or form submissions.
 */
export default function BigButton(props: BigButtonProps) {
    // Dynamically generates styles based on provided props
    const styles = styling(props);

    const { featherIconName, label, style, onPress } = props;

    return (
        <RectButton style={[styles.button, style]} onPress={onPress}>
            {/* Optional icon render */}
            {featherIconName && (
                <Feather style={styles.icon} name={featherIconName} size={24} color="#FFF" />
            )}

            <Text style={styles.label}>{label}</Text>
        </RectButton>
    );
}

/**
 * styling
 * -------
 * Function that generates React Native styles dynamically
 * based on BigButton props.
 *
 * @param color - Used as background color for the button.
 * @param disabled - If true, applies a transparent/muted version of the color.
 *
 * @returns A StyleSheet object used by the component.
 */
const styling = ({ color, disabled }: BigButtonProps) =>
    StyleSheet.create({
        button: {
            paddingVertical: 14,
            paddingHorizontal: 32,
            backgroundColor: disabled ? color + '80' : color, // Adds opacity if disabled
            borderRadius: 16,
            maxHeight: 56,

            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            flex: 1,
        },

        icon: {
            marginRight: 8,
        },

        label: {
            fontFamily: 'Nunito_800ExtraBold',
            color: '#FFF',
            fontSize: 15,
        },
    });
