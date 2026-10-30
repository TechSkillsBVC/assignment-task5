import React from 'react';
import { View } from 'react-native';

/** Props for {@link Spacer}. */
interface SpacerProps {
    /** Gap in pixels. Defaults to 8. */
    size?: number;
    /** When true the gap runs across (width) instead of down (height). Defaults to false. */
    horizontal?: boolean;
}

/**
 * Empty box that puts a gap between two elements, so screens do not need
 * one-off margin styles to space things out.
 *
 * @param props - See {@link SpacerProps}.
 * @returns A view with a fixed size on one axis and `auto` on the other.
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
