import React, { useState, useContext } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  SafeAreaView,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import { LocationContext } from "../context/LocationContext";
import { useNavigation } from "@react-navigation/native";

const MapScreen = () => {
  const navigation = useNavigation();

  const { currentLocation } = useContext(LocationContext);
  const [destination, setDestination] = useState(null);

  const openHome = () => {
    navigation.navigate("Home");
  };

  return (
    <SafeAreaView style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: currentLocation?.latitude || 37.7749,
          longitude: currentLocation?.longitude || -122.4194,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
        showsUserLocation={true}
      >
        {/* Destination Marker */}
        {destination && <Marker coordinate={destination} title="Destination" />}

        {/* Directions */}
        {currentLocation && destination && (
          <MapViewDirections
            origin={currentLocation}
            destination={destination}
            apikey={GOOGLE_MAPS_APIKEY}
            strokeWidth={4}
            strokeColor="blue"
          />
        )}
        <View style={styles.footerContainer}>
          <TouchableOpacity style={styles.btnContainer} onPress={openHome}>
            <Text style={styles.btnText}>Back</Text>
          </TouchableOpacity>
        </View>
      </MapView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1 },
  btnContainer: {
    padding: 10,
    width: "30%",
  },
  btnText: {
    color: "black",
    textAlign: "center",
    fontSize: 35,
  },
});

export default MapScreen;
