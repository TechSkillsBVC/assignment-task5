/**
 * Shared map defaults, kept in one place so every screen that renders a
 * MapView frames the city the same way.
 */
import { EdgePadding, LatLng, Region } from 'react-native-maps';

/** Centre of Calgary. Where the map starts before any event is loaded. */
export const DEFAULT_POSITION: LatLng = {
    latitude: 51.03,
    longitude: -114.093,
};

/**
 * How much ground the map covers, in degrees of latitude and longitude.
 * Smaller numbers mean a closer zoom; 0.008 is roughly neighbourhood level.
 */
export const DEFAULT_DELTA = { latitudeDelta: 0.008, longitudeDelta: 0.008 };

/** {@link DEFAULT_POSITION} and {@link DEFAULT_DELTA} combined, ready to pass as `initialRegion`. */
export const DEFAULT_REGION: Region = {
    ...DEFAULT_POSITION,
    ...DEFAULT_DELTA,
};

/**
 * Breathing room in pixels when the map is asked to fit a set of coordinates,
 * so markers do not end up underneath the header or the footer bar.
 */
export const EDGE_PADDING: EdgePadding = {
    top: 64,
    right: 16,
    bottom: 104,
    left: 16,
};
