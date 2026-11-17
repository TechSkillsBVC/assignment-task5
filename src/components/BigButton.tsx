import React from 'react';
import { Feather } from '@expo/vector-icons';
import { StyleSheet, Text } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';

/**
 * Properties accepted by BigButton.
 */
interface BigButtonProps {
    /** Text shown on the button. */
    label: string;
    /** Background color of the button, as a CSS color string (e.g. '#FF8700'). */
    color: string;
    /** Optional extra style(s) applied on top of the button's default style, for layout adjustments such as margins. */
    style?: {};
    /** Optional Feather icon name shown to the left of the label. When omitted, no icon is shown. */
    featherIconName?: keyof typeof Feather.glyphMap;
    /** When true, the button is rendered with a faded color to look disabled. It is still pressable; callers that need to block the action should also change their `onPress` handler's behavior. */
    disabled?: boolean;
    /** Called when the button is pressed. */
    onPress: () => void;
}

/**
 * BigButton is a full-width, rounded action button used throughout the app
 * (for example the "Log in" button on the Login screen).
 *
 * Capabilities:
 * - Shows a label and an optional leading icon.
 * - Uses `RectButton` (react-native-gesture-handler) so it has a native,
 *   platform-correct touch feedback.
 * - Visually fades out when `disabled` is true.
 *
 * Inputs: a `BigButtonProps` object, see the fields above.
 * Output: a pressable button element.
 */
export default function BigButton(props: BigButtonProps) {
    const styles = styling(props);
    const { featherIconName, label, style, onPress } = props;

    return (
        <RectButton style={[styles.button, style]} onPress={onPress}>
            {featherIconName && <Feather style={styles.icon} name={featherIconName} size={24} color="#FFF" />}
            <Text style={styles.label}>{label}</Text>
        </RectButton>
    );
}

/**
 * Builds the StyleSheet for BigButton from its color and disabled state.
 *
 * Inputs: the `color` and `disabled` fields of BigButtonProps.
 * Output: a StyleSheet object with the button, icon, and label styles.
 */
const styling = ({ color, disabled }: BigButtonProps) =>
    StyleSheet.create({
        button: {
            paddingVertical: 14,
            paddingHorizontal: 32,
            backgroundColor: disabled ? color + '80' : color,
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
