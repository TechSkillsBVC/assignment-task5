import { EdgePadding, LatLng, Region } from 'react-native-maps';

// Default settings for the events map.

// Point the map is centred on when it first opens (Calgary).
export const DEFAULT_POSITION: LatLng = {
    latitude: 51.03,
    longitude: -114.093,
};

// How far the map is zoomed in when it first opens.
export const DEFAULT_DELTA = { latitudeDelta: 0.008, longitudeDelta: 0.008 };

// Area shown when the map first opens, made from the position and zoom above.
export const DEFAULT_REGION: Region = {
    ...DEFAULT_POSITION,
    ...DEFAULT_DELTA,
};

// Space kept around the edges of the map so markers aren't hidden behind the buttons.
export const EDGE_PADDING: EdgePadding = {
    top: 64,
    right: 16,
    bottom: 104,
    left: 16,
};
