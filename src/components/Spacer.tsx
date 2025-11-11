import React from 'react';
import { View } from 'react-native';

/** Props for Spacer. */
interface SpacerProps {
  /** Size of the space in pixels. Default: 8. */
  size?: number;
  /** If true, adds horizontal space; otherwise vertical. */
  horizontal?: boolean;
}

/**
 * Spacer
 * Small helper to add space between UI elements.
 * - Vertical by default: sets `height = size`.
 * - Horizontal when `horizontal = true`: sets `width = size`.
 */
export default function Spacer({ size = 8, horizontal = false }: SpacerProps) {
  return (
    <View
      style={{
        width: horizontal ? size : 'auto',
        height: !horizontal ? size : 'auto',
      }}
    />
  );
}
