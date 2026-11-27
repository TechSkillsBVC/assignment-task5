import React from 'react';
import { View } from 'react-native';

// Defines the optional props for Spacer: size (gap in pixels) and horizontal 
// (switches spacing from vertical to horizontal).
interface SpacerProps {
    size?: number;
    horizontal?: boolean;
}
// Renders an empty View used to add consistent vertical or horizontal spacing 
// between UI elements (defaults to 8px vertical).
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
