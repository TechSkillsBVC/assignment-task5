import { EdgePadding, LatLng, Region } from 'react-native-maps';

/**
 * DEFAULT_POSITION
 * ----------------
 * The default coordinate used when centering the map.
 * Represents a specific latitude and longitude (Calgary area).
 */
export const DEFAULT_POSITION: LatLng = {
    latitude: 51.03,
    longitude: -114.093,
};

/**
 * DEFAULT_DELTA
 * --------------
 * Controls the zoom level of the map.
 *
 * - latitudeDelta / longitudeDelta determine how "zoomed in" the map is.
 * - Smaller values = closer zoom.
 */
export const DEFAULT_DELTA = { latitudeDelta: 0.008, longitudeDelta: 0.008 };

/**
 * DEFAULT_REGION
 * --------------
 * Combines the starting map position and the zoom-level delta.
 *
 * Used by the MapView "initialRegion" property.
 */
export const DEFAULT_REGION: Region = {
    ...DEFAULT_POSITION,
    ...DEFAULT_DELTA,
};

/**
 * EDGE_PADDING
 * ------------
 * Spacing applied to the edges when calling:
 *   mapViewRef.current?.fitToCoordinates(...)
 *
 * Ensures that markers are not placed too close to the screen edges.
 *
 * Measurements are in pixels.
 */
export const EDGE_PADDING: EdgePadding = {
    top: 64,
    right: 16,
    bottom: 104,
    left: 16,
};
