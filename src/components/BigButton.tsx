import React from 'react';
import { Feather } from '@expo/vector-icons';
import { StyleSheet, Text } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';

/**
 * Props for the BigButton component.
 * - `label`: The text displayed on the button.
 * - `color`: The background color of the button.
 * - `style`: Optional additional styles to apply to the button.
 * - `featherIconName`: Optional name of the Feather icon to display on the button.
 * - `disabled`: Whether the button is disabled (affects styling).
 * - `onPress`: Callback function executed when the button is pressed.
 */
interface BigButtonProps {
    label: string; // Text displayed on the button
    color: string; // Background color of the button
    style?: {}; // Optional additional styles
    featherIconName?: keyof typeof Feather.glyphMap; // Optional Feather icon name
    disabled?: boolean; // Indicates if the button is disabled
    onPress: () => void; // Function executed on button press
}

/**
 * A customizable button component with optional icon support.
 * 
 * This component displays a button with a label and optional Feather icon.
 * It supports custom styling, disabled state, and executes the provided
 * `onPress` function when clicked.
 */
export default function BigButton(props: BigButtonProps) {
    const styles = styling(props); // Dynamically generated styles based on props
    const { featherIconName, label, style, onPress } = props;

    return (
        <RectButton style={[styles.button, style]} onPress={onPress}>
            {/* Conditionally render the icon if `featherIconName` is provided */}
            {featherIconName && <Feather style={styles.icon} name={featherIconName} size={24} color="#FFF" />}
            {/* Display the label */}
            <Text style={styles.label}>{label}</Text>
        </RectButton>
    );
}

/**
 * Function to dynamically generate styles for the BigButton component.
 * 
 * - Adjusts background color based on `disabled` state.
 * - Defines styles for the button container, icon, and label text.
 * 
 * @param color The base color of the button.
 * @param disabled Whether the button is disabled.
 * @returns Stylesheet object for the BigButton component.
 */
const styling = ({ color, disabled }: BigButtonProps) =>
    StyleSheet.create({
        button: {
            paddingVertical: 14,
            paddingHorizontal: 32,
            backgroundColor: disabled ? color + '80' : color, // Apply transparency if disabled
            borderRadius: 16,
            maxHeight: 56,

            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            flex: 1,
        },

        icon: {
            marginRight: 8, // Space between icon and label
        },

        label: {
            fontFamily: 'Nunito_800ExtraBold',
            color: '#FFF',
            fontSize: 15,
        },
    });
