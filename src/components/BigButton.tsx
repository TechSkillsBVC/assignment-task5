import React from 'react';
import { Feather } from '@expo/vector-icons';
import { StyleSheet, Text } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';

/** Props for BigButton. */
interface BigButtonProps {
  /** Text shown on the button. */
  label: string;
  /** Button background color (e.g., "#4CAF50"). */
  color: string;
  /** Extra styles for the button container (optional). */
  style?: {};
  /** Optional Feather icon name, shown before the label. */
  featherIconName?: keyof typeof Feather.glyphMap;
  /** If true, button looks disabled (faded). */
  disabled?: boolean;
  /** Called when the button is pressed. */
  onPress: () => void;
}

/**
 * BigButton
 * A large button used for main actions.
 * - Can show an icon on the left.
 * - Uses white text for contrast.
 * - When `disabled` is true, background is faded.
 */
export default function BigButton(props: BigButtonProps) {
  const styles = styling(props);
  const { featherIconName, label, style, onPress } = props;

  return (
    <RectButton style={[styles.button, style]} onPress={onPress}>
      {featherIconName && (
        <Feather style={styles.icon} name={featherIconName} size={24} color="#FFF" />
      )}
      <Text style={styles.label}>{label}</Text>
    </RectButton>
  );
}

/** Creates styles using the given color and disabled flag. */
const styling = ({ color, disabled }: BigButtonProps) =>
  StyleSheet.create({
    button: {
      paddingVertical: 14,
      paddingHorizontal: 32,
      // Add "80" alpha to fade color when disabled.
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
