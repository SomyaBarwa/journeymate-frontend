import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import * as Location from 'expo-location';

export default function LocationComp() {
  const [locationPermission, setLocationPermission] = useState(null);
  const [speed, setSpeed] = useState(null);
  const [locationError, setLocationError] = useState(null);

  useEffect(() => {
    const requestPermission = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setLocationPermission(false);
        Alert.alert("Permission denied", "Location permission is required to track speed.");
      } else {
        setLocationPermission(true);
      }
    };

    requestPermission();
  }, []);

  useEffect(() => {
    if (locationPermission) {
      const locationSubscription = Location.watchPositionAsync(
        { accuracy: Location.Accuracy.High, timeInterval: 1000, distanceInterval: 1 },
        (location) => {
          if (location.coords.speed !== -1) {
            setSpeed(location.coords.speed);
            setLocationError(null); // Reset any previous errors if speed is detected
          } else {
            setLocationError('Speed data is unavailable');
          }
        }
      );
      // Do not remove the subscription; it will continue to receive location updates
    }
  }, [locationPermission]);

  return (
    <View style={styles.container}>
      {locationError && (
        <Text style={styles.errorText}>
          {locationError}
        </Text>
      )}
      {speed !== null && !locationError && (
        <Text style={styles.speedText}>
          Speed: {speed.toFixed(2)} m/s
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 100,
    right: 10,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 8,
  },
  speedText: {
    color: '#3B71F3',
    fontSize: 30,
  },
  errorText: {
    color: 'red',
    fontSize: 30,
  },
});
