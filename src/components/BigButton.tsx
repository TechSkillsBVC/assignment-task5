import React from 'react';
import { Feather } from '@expo/vector-icons';
import { StyleSheet, Text } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';

// Defines the props for BigButton, including label text, background color, 
// optional icon, disabled state, and press handler.
interface BigButtonProps {
    label: string;
    color: string;
    style?: {};
    featherIconName?: keyof typeof Feather.glyphMap;
    disabled?: boolean;
    onPress: () => void;
}
// Renders a full-width rounded button with a text label and an optional left-aligned 
// Feather icon.
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
// Generates the button styles dynamically based on the given background color and 
// disabled state.
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
