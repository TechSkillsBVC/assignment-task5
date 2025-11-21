import React from 'react';
import { View } from 'react-native';

/**
 * SpacerProps
 * ------------
 * Defines the optional properties for the Spacer component.
 *
 * @property size
 *  - The size of the spacing (in pixels).
 *  - Defaults to 8.
 *
 * @property horizontal
 *  - If true, the spacer adds width instead of height.
 *  - Defaults to false (vertical spacing).
 */
interface SpacerProps {
    size?: number;
    horizontal?: boolean;
}

/**
 * Spacer Component
 * ----------------
 * A simple layout helper that adds spacing between UI elements.
 *
 * Responsibilities:
 * - Render an empty View with either a fixed height (vertical spacing)
 *   or fixed width (horizontal spacing).
 * - Provide consistent spacing across the application without having
 *   to manually write margin styles everywhere.
 *
 * Usage example:
 * ```tsx
 * <Spacer size={20} />            // Vertical space
 * <Spacer size={16} horizontal /> // Horizontal space
 * ```
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
