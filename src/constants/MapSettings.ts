import { EdgePadding, LatLng, Region } from 'react-native-maps';

/**
 * MapSettings holds the default values used to position and frame the map
 * on the EventsMap screen. Centralizing them here means every screen that
 * renders a map starts from the same default view instead of repeating
 * coordinates inline.
 */

/** Default map center, roughly downtown Calgary, used before the user's real location or any events are known. */
export const DEFAULT_POSITION: LatLng = {
    latitude: 51.03,
    longitude: -114.093,
};

/** Default zoom level, expressed as the latitude/longitude span visible on screen. Smaller values zoom in further. */
export const DEFAULT_DELTA = { latitudeDelta: 0.008, longitudeDelta: 0.008 };

/** Default region (center and zoom combined) the map starts at before it is fitted to the user's location and the available events. */
export const DEFAULT_REGION: Region = {
    ...DEFAULT_POSITION,
    ...DEFAULT_DELTA,
};

/** Padding, in pixels, kept clear around the edges of the map when it is fitted to a set of coordinates, so markers are not hidden behind overlaid UI such as the footer bar. */
export const EDGE_PADDING: EdgePadding = {
    top: 64,
    right: 16,
    bottom: 104,
    left: 16,
};
