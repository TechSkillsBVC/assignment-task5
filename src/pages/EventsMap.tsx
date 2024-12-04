import { Feather } from '@expo/vector-icons'; 
// Importing Feather icons for UI elements.

import AsyncStorage from '@react-native-async-storage/async-storage'; 
// AsyncStorage is used for storing and removing user data locally.

import { StackScreenProps } from '@react-navigation/stack'; 
// Importing type definitions for stack navigation.

import React, { useContext, useRef } from 'react'; 
// React hooks for managing state and refs.

import { Image, StyleSheet, Text, View } from 'react-native'; 
// Components for creating UI elements in React Native.

import { RectButton } from 'react-native-gesture-handler'; 
// Gesture-handler button for better touch feedback.

import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps'; 
// React Native Maps library for rendering maps and markers.

import customMapStyle from '../../map-style.json'; 
// Custom JSON file defining the map's style.

import * as MapSettings from '../constants/MapSettings'; 
// Constants for map configurations (e.g., default region and padding).

import { AuthenticationContext } from '../context/AuthenticationContext'; 
// Context for managing user authentication.

import mapMarkerImg from '../images/map-marker.png'; 
// Custom marker image for map markers.

export default function EventsMap(props: StackScreenProps<any>) {
    const { navigation } = props; 
    // Extracting the navigation prop to handle navigation between screens.

    const authenticationContext = useContext(AuthenticationContext); 
    // Accessing the authentication context for managing user state.

    const mapViewRef = useRef<MapView>(null); 
    // Creating a reference to the MapView component to manipulate it programmatically.

    const handleNavigateToCreateEvent = () => {
        // Function to navigate to the event creation screen.
    };

    const handleNavigateToEventDetails = () => {
        // Function to navigate to the event details screen when a marker is pressed.
    };

    const handleLogout = async () => {
        // Function to log out the user by clearing AsyncStorage and resetting the authentication state.
        AsyncStorage.multiRemove(['userInfo', 'accessToken']).then(() => {
            authenticationContext?.setValue(undefined); 
            // Resetting user state in the context.

            navigation.navigate('Login'); 
            // Navigating back to the login screen.
        });
    };

    return (
        <View style={styles.container}>
            <MapView
                ref={mapViewRef}
                provider={PROVIDER_GOOGLE} 
                // Using Google Maps provider.

                initialRegion={MapSettings.DEFAULT_REGION} 
                // Setting the initial map region.

                style={styles.mapStyle} 
                // Applying custom styles to the map.

                customMapStyle={customMapStyle} 
                // Using a custom style for the map.

                showsMyLocationButton={false} 
                // Disabling the default location button.

                showsUserLocation={true} 
                // Displaying the user's current location on the map.

                rotateEnabled={false} 
                // Disabling map rotation.

                toolbarEnabled={false} 
                // Disabling the map toolbar.

                moveOnMarkerPress={false} 
                // Preventing map movement when a marker is pressed.

                mapPadding={MapSettings.EDGE_PADDING} 
                // Adding padding around the map edges.

                onLayout={() =>
                    mapViewRef.current?.fitToCoordinates(
                        // Adjusting map view to include all event markers.
                        events.map(({ position }) => ({
                            latitude: position.latitude,
                            longitude: position.longitude,
                        })),
                        { edgePadding: MapSettings.EDGE_PADDING }
                    )
                }
            >
                {events.map((event) => {
                    // Looping through the events array to create markers for each event.
                    return (
                        <Marker
                            key={event.id} 
                            // Unique key for each marker.

                            coordinate={{
                                latitude: event.position.latitude,
                                longitude: event.position.longitude,
                            }} 
                            // Setting marker position.

                            onPress={handleNavigateToEventDetails} 
                            // Handling marker press to navigate to event details.
                        >
                            <Image 
                                resizeMode="contain" 
                                style={{ width: 48, height: 54 }} 
                                source={mapMarkerImg} 
                                // Using custom image for the marker.
                            />
                        </Marker>
                    );
                })}
            </MapView>

            <View style={styles.footer}>
                <Text style={styles.footerText}>X event(s) found</Text> 
                {/* Displaying the number of events found. */}
                
                <RectButton
                    style={[styles.smallButton, { backgroundColor: '#00A3FF' }]} 
                    // Styling for the create event
