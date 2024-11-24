import { Feather } from '@expo/vector-icons'; // Icon library for adding icons
import AsyncStorage from '@react-native-async-storage/async-storage'; // For storing and retrieving data from local storage
import { StackScreenProps } from '@react-navigation/stack'; // For typing stack screen props
import React, { useContext, useRef } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native'; // Basic UI components
import { RectButton } from 'react-native-gesture-handler'; // For custom styled buttons
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps'; // For rendering the map and markers
import customMapStyle from '../../map-style.json'; // Custom map style for the map view
import * as MapSettings from '../constants/MapSettings'; // Constants for map settings like default region
import { AuthenticationContext } from '../context/AuthenticationContext'; // Authentication context to manage logged-in user
import mapMarkerImg from '../images/map-marker.png'; // Marker image for the map events

// EventsMap component definition
export default function EventsMap(props: StackScreenProps<any>) {
    const { navigation } = props;  // Get navigation prop for navigating between screens
    const authenticationContext = useContext(AuthenticationContext);  // Get authentication context to manage user state
    const mapViewRef = useRef<MapView>(null);  // Ref to hold a reference to the MapView for operations

    // Handle the event when the user navigates to create an event screen
    const handleNavigateToCreateEvent = () => {};

    // Handle the event when the user navigates to an event details screen
    const handleNavigateToEventDetails = () => {};

    // Handle user logout by removing the user info and access token from AsyncStorage
    const handleLogout = async () => {
        // Remove user info and access token from AsyncStorage
        AsyncStorage.multiRemove(['userInfo', 'accessToken']).then(() => {
            // Reset authentication context and navigate back to the login screen
            authenticationContext?.setValue(undefined);
            navigation.navigate('Login');
        });
    };

    return (
        <View style={styles.container}>
            {/* MapView component that displays the map with event markers */}
            <MapView
                ref={mapViewRef}  // Assign ref for the MapView instance
                provider={PROVIDER_GOOGLE}  // Use Google Maps as the provider
                initialRegion={MapSettings.DEFAULT_REGION}  // Set the initial region of the map
                style={styles.mapStyle}  // Custom styles for the map
                customMapStyle={customMapStyle}  // Apply the custom map style
                showsMyLocationButton={false}  // Hide the 'My Location' button on the map
                showsUserLocation={true}  // Show user's current location on the map
                rotateEnabled={false}  // Disable map rotation
                toolbarEnabled={false}  // Disable map toolbar
                moveOnMarkerPress={false}  // Disable map movement when marker is pressed
                mapPadding={MapSettings.EDGE_PADDING}  
                onLayout={() =>
                    // Fit the map to the coordinates of the events
                    mapViewRef.current?.fitToCoordinates(
                        events.map(({ position }) => ({
                            latitude: position.latitude,
                            longitude: position.longitude,
                        })),
                        { edgePadding: MapSettings.EDGE_PADDING }
                    )
                }
            >
                {/* Render event markers on the map */}
                {events.map((event) => {
                    return (
                        <Marker
                            key={event.id}  
                            coordinate={{
                                latitude: event.position.latitude,  
                                longitude: event.position.longitude,  
                            }}
                            onPress={handleNavigateToEventDetails}  // Navigate to event details when marker is pressed
                        >
                            {/* Event marker image */}
                            <Image resizeMode="contain" style={{ width: 48, height: 54 }} source={mapMarkerImg} />
                        </Marker>
                    );
                })}
            </MapView>

            {/* Footer for displaying event count and 'Create Event' button */}
            <View style={styles.footer}>
                <Text style={styles.footerText}>X event(s) found</Text>  {/* Display the number of events */}
                {/* Button to navigate to the create event screen */}
                <RectButton
                    style={[styles.smallButton, { backgroundColor: '#00A3FF' }]}  
                    onPress={handleNavigateToCreateEvent}  
                >
                    <Feather name="plus" size={20} color="#FFF" />  
                </RectButton>
            </View>

            {/* Logout button to log out the user */}
            <RectButton
                style={[styles.logoutButton, styles.smallButton, { backgroundColor: '#4D6F80' }]}  
                onPress={handleLogout}  // Handle logout functionality
            >
                <Feather name="log-out" size={20} color="#FFF" />  
            </RectButton>
        </View>
    );
}


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

interface event {
    id: string;
    position: {
        latitude: number;
        longitude: number;
    };
}

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
