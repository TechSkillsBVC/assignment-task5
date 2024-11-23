import React from 'react';
import { View } from 'react-native';

/**
 * Props for the Spacer component.
 * - `size`: The size of the spacer, in pixels (default is 8).
 * - `horizontal`: If true, creates horizontal space; otherwise, vertical space.
 */
interface SpacerProps {
    size?: number; // Size of the spacer (default: 8)
    horizontal?: boolean; // Determines whether the spacer is horizontal or vertical
}

/**
 * Spacer component for adding adjustable spacing in layouts.
 * 
 * This component renders an empty `View` with adjustable height or width
 * based on the `size` and `horizontal` props. It is useful for adding
 * consistent spacing between elements in both horizontal and vertical layouts.
 * 
 * @param size The size of the spacing in pixels (default is 8).
 * @param horizontal If true, creates horizontal space; otherwise, vertical.
 */
export default function Spacer({ size = 8, horizontal = false }: SpacerProps) {
    return (
        <View
            style={{
                width: horizontal ? size : 'auto', // Apply width if horizontal
                height: !horizontal ? size : 'auto', // Apply height if vertical
            }}
        />
    );
}
