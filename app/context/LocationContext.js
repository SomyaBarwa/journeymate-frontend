import React, { createContext, useState, useEffect } from "react";
import * as Location from "expo-location";
import { Alert } from "react-native";

export const LocationContext = createContext();

export const LocationProvider = ({ children }) => {
  const [locationPermission, setLocationPermission] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [speed, setSpeed] = useState(null);
  const [locationError, setLocationError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const requestPermissionAndGetLocation = async () => {
      setLoading(true);
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setLocationPermission(false);
        Alert.alert("Permission Denied", "Location access is required.");
        setLoading(false);
        return;
      }

      setLocationPermission(true);

      // Fetch current location
      const location = await Location.getCurrentPositionAsync({});
      setCurrentLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });

      setLoading(false);
    };

    requestPermissionAndGetLocation();
  }, []);

  useEffect(() => {
    if (locationPermission) {
      const locationSubscription = Location.watchPositionAsync(
        { accuracy: Location.Accuracy.High, timeInterval: 1000, distanceInterval: 1 },
        (location) => {
          if (location.coords.speed !== -1) {
            setSpeed(location.coords.speed);
            setLocationError(null);
          } else {
            setLocationError("Speed data is unavailable");
          }
        }
      );

      return () => {
        locationSubscription.then((sub) => sub.remove());
      };
    }
  }, [locationPermission]);

  return (
    <LocationContext.Provider value={{ currentLocation, speed, locationError, loading }}>
      {children}
    </LocationContext.Provider>
  );
};
