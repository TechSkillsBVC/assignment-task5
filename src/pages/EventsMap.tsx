/**
 * Screen: EventsMap
 * ---------------------------------------------
 * Responsibilities:
 *  - Displays a map centered around a default region.
 *  - Renders markers for all available events.
 *  - Allows the user to (eventually) navigate to:
 *      • A screen to create a new event.
 *      • A screen with details about a selected event.
 *  - Provides a logout button that clears local auth cache
 *    and redirects the user back to the Login screen.
 */

import { Feather } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StackScreenProps } from "@react-navigation/stack";
import React, { useContext, useRef } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import customMapStyle from "../../map-style.json";
import * as MapSettings from "../constants/MapSettings";
import { AuthenticationContext } from "../context/AuthenticationContext";
import mapMarkerImg from "../images/map-marker.png";

export default function EventsMap(props: StackScreenProps<any>) {
  // React Navigation helper extracted from props
  const { navigation } = props;

  // Holds the currently authenticated user and updater
  const authenticationContext = useContext(AuthenticationContext);

  // Reference to MapView so we can call imperative methods (fitToCoordinates, etc.)
  const mapViewRef = useRef<MapView>(null);

  /**
   * Navigates to the screen responsible for creating a new event.
   * Currently not implemented – left here as an extension point for the app.
   */
  const handleNavigateToCreateEvent = () => {
    // TODO: navigation.navigate('CreateEvent');
  };

  /**
   * Navigates to the details screen for a selected event.
   * At the moment this handler is wired to the marker press, but does not
   * receive an event id. It can be extended to accept a parameter and
   * navigate with route params.
   */
  const handleNavigateToEventDetails = () => {
    // TODO: navigation.navigate('EventDetails', { id: eventId });
  };

  /**
   * Logs the user out of the application.
   *
   * Steps:
   *  - Removes user-related keys from AsyncStorage.
   *  - Clears the AuthenticationContext value.
   *  - Redirects the user back to the Login screen.
   */
  const handleLogout = async () => {
    AsyncStorage.multiRemove(["userInfo", "accessToken"]).then(() => {
      authenticationContext?.setValue(undefined);
      navigation.navigate("Login");
    });
  };

  return (
    <View style={styles.container}>
      <MapView
        ref={mapViewRef}
        provider={PROVIDER_GOOGLE}
        // Center map on a default region defined in MapSettings
        initialRegion={MapSettings.DEFAULT_REGION}
        style={styles.mapStyle}
        // Custom JSON map style to change map appearance
        customMapStyle={customMapStyle}
        // Disable some map controls for a cleaner UI
        showsMyLocationButton={false}
        showsUserLocation={true}
        rotateEnabled={false}
        toolbarEnabled={false}
        moveOnMarkerPress={false}
        // Add padding so markers are not flush against the screen edges
        mapPadding={MapSettings.EDGE_PADDING}
        /**
         * When the map layout is ready, automatically fit the camera
         * to include all event markers within the visible area.
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
        {/* Render one marker per event */}
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

      {/* Footer with event count and "create event" button */}
      <View style={styles.footer}>
        {/* NOTE: Text is currently hard-coded; can be replaced with events.length */}
        <Text style={styles.footerText}>X event(s) found</Text>
        <RectButton
          style={[styles.smallButton, { backgroundColor: "#00A3FF" }]}
          onPress={handleNavigateToCreateEvent}
        >
          <Feather name="plus" size={20} color="#FFF" />
        </RectButton>
      </View>

      {/* Floating logout button in the top-right corner */}
      <RectButton
        style={[
          styles.logoutButton,
          styles.smallButton,
          { backgroundColor: "#4D6F80" },
        ]}
        onPress={handleLogout}
      >
        <Feather name="log-out" size={20} color="#FFF" />
      </RectButton>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // Make the container fill the entire screen underneath the map
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },

  mapStyle: {
    // Map also fills the entire available area
    ...StyleSheet.absoluteFillObject,
  },

  logoutButton: {
    position: "absolute",
    top: 70,
    right: 24,
    elevation: 3,
  },

  footer: {
    position: "absolute",
    left: 24,
    right: 24,
    bottom: 40,
    backgroundColor: "#FFF",
    borderRadius: 16,
    height: 56,
    paddingLeft: 24,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    elevation: 3,
  },

  footerText: {
    fontFamily: "Nunito_700Bold",
    color: "#8fa7b3",
  },

  smallButton: {
    width: 56,
    height: 56,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
});

/**
 * Type that represents a minimal event model used by the map.
 * Only contains fields required to render markers.
 */
interface event {
  id: string;
  position: {
    latitude: number;
    longitude: number;
  };
}

/**
 * Static list of demo events to populate the map.
 * In a real application this would come from the API layer.
 */
const events: event[] = [
  {
    id: "e3c95682-870f-4080-a0d7-ae8e23e2534f",
    position: {
      latitude: 51.105761,
      longitude: -114.106943,
    },
  },
  {
    id: "98301b22-2b76-44f1-a8da-8c86c56b0367",
    position: {
      latitude: 51.04112,
      longitude: -114.069325,
    },
  },
  {
    id: "d7b8ea73-ba2c-4fc3-9348-9814076124bd",
    position: {
      latitude: 51.01222958257112,
      longitude: -114.11677222698927,
    },
  },
  {
    id: "d1a6b9ea-877d-4711-b8d7-af8f1bce4d29",
    position: {
      latitude: 51.010801915407036,
      longitude: -114.07823592424393,
    },
  },
];
