import React from 'react';
import { View } from 'react-native';

/**
 * Properties accepted by Spacer.
 */
interface SpacerProps {
    /** Size of the gap, in density-independent pixels. Defaults to 8. */
    size?: number;
    /** When true, the gap is applied as width (a horizontal gap) instead of height (a vertical gap). Defaults to false, a vertical gap. */
    horizontal?: boolean;
}

/**
 * Spacer is a small empty view used to add consistent vertical or horizontal
 * gaps between other elements, without repeating margin styles everywhere.
 *
 * Capabilities:
 * - Renders a vertical gap of `size` by default.
 * - Renders a horizontal gap of `size` instead, when `horizontal` is true.
 *
 * Inputs: an optional `SpacerProps` object, see the fields above.
 * Output: an empty, appropriately sized View.
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
