import { EdgePadding, LatLng, Region } from 'react-native-maps';

// Default starting map coordinates (centered on Calgary).
export const DEFAULT_POSITION: LatLng = {
    latitude: 51.03,
    longitude: -114.093,
};
// Default zoom level deltas for the map view.
export const DEFAULT_DELTA = { latitudeDelta: 0.008, longitudeDelta: 0.008 };
// Combines the default coordinates and zoom delta into the initial map region.
export const DEFAULT_REGION: Region = {
    ...DEFAULT_POSITION,
    ...DEFAULT_DELTA,
};
// Padding offsets (in pixels) used when fitting map markers within the screen bounds.
export const EDGE_PADDING: EdgePadding = {
    top: 64,
    right: 16,
    bottom: 104,
    left: 16,
};
