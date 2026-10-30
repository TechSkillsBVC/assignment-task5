import React from 'react';
import { Feather } from '@expo/vector-icons';
import { StyleSheet, Text } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';

/** Props for {@link BigButton}. */
interface BigButtonProps {
    /** Text shown on the button. */
    label: string;
    /** Background colour as a hex string, for example "#FF8700". */
    color: string;
    /** Extra styles merged over the defaults, for margins or a narrower button in a row. */
    style?: {};
    /** Optional Feather icon drawn to the left of the label, for example "plus". */
    featherIconName?: keyof typeof Feather.glyphMap;
    /**
     * Fades the background to show the action is unavailable.
     *
     * Note that this only changes the look: the press handler still fires, so a
     * screen that needs the press blocked has to guard it itself.
     */
    disabled?: boolean;
    /** Called when the button is tapped. */
    onPress: () => void;
}

/**
 * Full width action button used for the main action on a screen, such as
 * "Log in" or "Save".
 *
 * @param props - See {@link BigButtonProps}.
 * @returns A coloured, rounded button with an optional icon and a label.
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
 * Builds the stylesheet from the props, since the background colour is passed
 * in rather than fixed. A disabled button gets the same colour at 50% alpha.
 *
 * @param props - The same props the component received.
 * @returns A stylesheet for the button, its icon and its label.
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
