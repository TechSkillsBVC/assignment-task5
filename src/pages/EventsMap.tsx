import { Feather } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StackScreenProps } from '@react-navigation/stack';
import React, { useContext, useRef } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';

import customMapStyle from '../../map-style.json';
import * as MapSettings from '../constants/MapSettings';
import { AuthenticationContext } from '../context/AuthenticationContext';
import mapMarkerImg from '../images/map-marker.png';

/**
 * EventsMap Screen
 * ----------------
 * Responsibilities:
 * - Display a Google Map centered on a default region.
 * - Render all event markers defined in the static `events` array.
 * - Fit the map view to show all markers on screen.
 * - Provide a logout button that clears cached credentials.
 * - Provide a floating button for creating new events (not implemented in this assignment).
 *
 * Navigation:
 * - Navigates back to "Login" when logging out.
 * - `navigation` comes from React Navigation StackScreenProps.
 */
export default function EventsMap(props: StackScreenProps<any>) {
    /** Extract navigation object for screen navigation */
    const { navigation } = props;

    /** Authentication context used to store/remove authenticated user */
    const authenticationContext = useContext(AuthenticationContext);

    /** Ref used to control and adjust the MapView instance */
    const mapViewRef = useRef<MapView>(null);

    /**
     * navigate to Create Event screen
     * (currently not implemented in this assignment)
     */
    const handleNavigateToCreateEvent = () => {};

    /**
     * navigate to Event Details screen
     * (currently not implemented in this assignment)
     */
    const handleNavigateToEventDetails = () => {};

    /**
     * Logs out the user by:
     * - Removing userInfo and accessToken from AsyncStorage.
     * - Clearing the global AuthenticationContext.
     * - Redirecting back to Login screen.
     */
    const handleLogout = async () => {
        AsyncStorage.multiRemove(['userInfo', 'accessToken']).then(() => {
            authenticationContext?.setValue(undefined);
            navigation.navigate('Login');
        });
    };

    return (
        <View style={styles.container}>
            {/* Main map component */}
            <MapView
                ref={mapViewRef}
                provider={PROVIDER_GOOGLE}
                initialRegion={MapSettings.DEFAULT_REGION}
                style={styles.mapStyle}
                customMapStyle={customMapStyle}
                showsMyLocationButton={false}
                showsUserLocation={true}
                rotateEnabled={false}
                toolbarEnabled={false}
                moveOnMarkerPress={false}
                mapPadding={MapSettings.EDGE_PADDING}
                /**
                 * When layout is ready:
                 * - Fit map to display all event markers on screen at once.
                 */
                onLayout={() =>
                    mapViewRef.current?.fitToCoordinates(
                        events.map(({ position }) => ({
                            latitude: position.latitude,
                            longitude: position.longitude,
                        })),
                        { edgePadding: MapSettings.EDGE_PADDING }
                    )
                }
            >
                {/* Render all event markers */}
                {events.map((event) => {
                    return (
                        <Marker
                            key={event.id}
                            coordinate={{
                                latitude: event.position.latitude,
                                longitude: event.position.longitude,
                            }}
                            onPress={handleNavigateToEventDetails}
                        >
                            <Image
                                resizeMode="contain"
                                style={{ width: 48, height: 54 }}
                                source={mapMarkerImg}
                            />
                        </Marker>
                    );
                })}
            </MapView>

            {/* Footer showing number of events and Create button */}
            <View style={styles.footer}>
                <Text style={styles.footerText}>X event(s) found</Text>

                {/* Floating add-button (not implemented) */}
                <RectButton
                    style={[styles.smallButton, { backgroundColor: '#00A3FF' }]}
                    onPress={handleNavigateToCreateEvent}
                >
                    <Feather name="plus" size={20} color="#FFF" />
                </RectButton>
            </View>

            {/* Logout button */}
            <RectButton
                style={[styles.logoutButton, styles.smallButton, { backgroundColor: '#4D6F80' }]}
                onPress={handleLogout}
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

/**
 * Type describing an event structure
 */
interface event {
    id: string;
    position: {
        latitude: number;
        longitude: number;
    };
}

/**
 * Static list of events.
 * In a real application these would come from an API.
 */
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
