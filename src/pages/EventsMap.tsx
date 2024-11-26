import { Feather } from '@expo/vector-icons'; // Icon library for vector icons
import AsyncStorage from '@react-native-async-storage/async-storage'; // Library for asynchronous storage in React Native
import { StackScreenProps } from '@react-navigation/stack'; // Type for stack navigation props
import React, { useContext, useRef } from 'react'; // React and hooks
import { Image, StyleSheet, Text, View } from 'react-native'; // Core react-native components
import { RectButton } from 'react-native-gesture-handler'; // Button component for touch handling
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps'; // Map component and marker for Google Maps
import customMapStyle from '../../map-style.json'; // Custom map style JSON
import * as MapSettings from '../constants/MapSettings'; // Map settings constants
import { AuthenticationContext } from '../context/AuthenticationContext'; // Context for managing authentication state
import mapMarkerImg from '../images/map-marker.png'; // Marker image import

// Main EventsMap component
export default function EventsMap(props: StackScreenProps<any>) {
    const { navigation } = props; // Destructure navigation prop from props
    const authenticationContext = useContext(AuthenticationContext); // Access authentication context
    const mapViewRef = useRef<MapView>(null); // Reference for the MapView component

    // Function to handle navigation to the Create Event screen (currently empty)
    const handleNavigateToCreateEvent = () => {};

    // Function to handle navigation to the Event Details screen (currently empty)
    const handleNavigateToEventDetails = () => {};

    // Function to handle user logout
    const handleLogout = async () => {
        AsyncStorage.multiRemove(['userInfo', 'accessToken']).then(() => {
            authenticationContext?.setValue(undefined); // Clear authentication context
            navigation.navigate('Login'); // Navigate to Login screen
        });
    };

    return (
        <View style={styles.container}>
            {/* MapView component to display events on the map */}
            <MapView
                ref={mapViewRef} // Reference to the MapView for programmatic control
                provider={PROVIDER_GOOGLE} // Use Google Maps as the provider
                initialRegion={MapSettings.DEFAULT_REGION} // Set initial region for the map
                style={styles.mapStyle} // Apply styles to the map
                customMapStyle={customMapStyle} // Apply custom map style
                showsMyLocationButton={false} // Hide My Location button
                showsUserLocation={true} // Show user location on the map
                rotateEnabled={false} // Disable map rotation by user
                toolbarEnabled={false} // Disable toolbar
                moveOnMarkerPress={false} // Prevent map moving when markers are pressed
                mapPadding={MapSettings.EDGE_PADDING} // Set padding around the map edges
                onLayout={() =>
                    mapViewRef.current?.fitToCoordinates(
                        events.map(({ position }) => ({
                            latitude: position.latitude,
                            longitude: position.longitude,
                        })),
                        { edgePadding: MapSettings.EDGE_PADDING } // Fit map to show all event markers
                    )
                }
            >
                {/* Render markers for each event on the map */}
                {events.map((event) => {
                    return (
                        <Marker
                            key={event.id} // Unique key for each marker
                            coordinate={{
                                latitude: event.position.latitude,
                                longitude: event.position.longitude,
                            }}
                            onPress={handleNavigateToEventDetails} // Navigate to event details on marker press
                        >
                            <Image resizeMode="contain" style={{ width: 48, height: 54 }} source={mapMarkerImg} /> {/* Marker image */}
                        </Marker>
                    );
                })}
            </MapView>

            {/* Footer component displaying the number of events found */}
            <View style={styles.footer}>
                <Text style={styles.footerText}>X event(s) found</Text> {/* Placeholder text for event count */}
                <RectButton
                    style={[styles.smallButton, { backgroundColor: '#00A3FF' }]}
                    onPress={handleNavigateToCreateEvent} // Navigate to create event screen on button press
                >
                    <Feather name="plus" size={20} color="#FFF" /> {/* Plus icon for creating new events */}
                </RectButton>
            </View>
            {/* Logout button */}
            <RectButton
                style={[styles.logoutButton, styles.smallButton, { backgroundColor: '#4D6F80' }]}
                onPress={handleLogout} // Handle logout on button press
            >
                <Feather name="log-out" size={20} color="#FFF" /> {/* Logout icon */}
            </RectButton>
        </View>
    );
}

// Styles for the component using StyleSheet.create for better performance and organization
const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },

    mapStyle: {
        ...StyleSheet.absoluteFillObject,
    },

    logoutButton: {
        position: 'absolute',
        top: 70,
        right: 24,

        elevation: 3,
    },

    footer: {
        position: 'absolute',
        left: 24,
        right: 24,
        bottom: 40,

        backgroundColor: '#FFF',
        borderRadius: 16,
        height: 56,
        paddingLeft: 24,

        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',

        elevation: 3,
    },

    footerText: {
        fontFamily: 'Nunito_700Bold',
        color: '#8fa7b3',
    },

    smallButton: {
        width: 56,
        height: 56,
        borderRadius: 16,

        justifyContent: 'center',
        alignItems: 'center',
    },
});

// Event interface definition for type checking
interface event {
    id: string;
    position: {
        latitude: number;
        longitude: number;
    };
}

// Sample events data with their positions on the map
const events: event[] = [
    {
        id: 'e3c95682-870f-4080-a0d7-ae8e23e2534f',
        position: {
            latitude: 51.105761,
            longitude: -114.106943,
        },
    },
    {
        id: '98301b22-2b76-44f1-a8da-8c86c56b0367',
        position: {
            latitude: 51.04112,
            longitude: -114.069325,
        },
    },
    {
        id: 'd7b8ea73-ba2c-4fc3-9348-9814076124bd',
        position: {
            latitude: 51.01222958257112,
            longitude: -114.11677222698927,
        },
    },
    {
        id: 'd1a6b9ea-877d-4711-b8d7-af8f1bce4d29',
        position: {
            latitude: 51.010801915407036,
            longitude: -114.07823592424393,
        },
    },
];
