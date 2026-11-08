import React from 'react';
import { View } from 'react-native';

interface SpacerProps {
    size?: number; // Size of the gap (default 8)
    horizontal?: boolean; // Adds space side to side instead of top to bottom (default false)
}

// Empty block used to add space between other elements on the screen.
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
