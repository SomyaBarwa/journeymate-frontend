import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { Camera } from "expo-camera";

const CameraButton = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraVisible, setCameraVisible] = useState(false);
  const [cameraRef, setCameraRef] = useState(null);

  // Request camera permissions
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const capturePhoto = async () => {
    if (cameraRef) {
      const photo = await cameraRef.takePictureAsync();
      console.log("Captured photo:", photo);
      Alert.alert("Photo Captured", "You have successfully captured a photo.");
      setCameraVisible(false); // Hide camera after taking a picture
    }
  };

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      {cameraVisible ? (
        <Camera style={styles.camera} ref={(ref) => setCameraRef(ref)}>
          <View style={styles.cameraContainer}>
            <TouchableOpacity style={styles.button} onPress={capturePhoto}>
              <Text style={styles.buttonText}>Capture</Text>
            </TouchableOpacity>
          </View>
        </Camera>
      ) : (
        <TouchableOpacity
          style={styles.button}
          onPress={() => setCameraVisible(true)}
        >
          <Text style={styles.buttonText}>Open Camera</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  button: {
    backgroundColor: "#3B71F3",
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 25,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  camera: {
    width: "100%",
    height: 400,
    borderRadius: 10,
    overflow: "hidden",
  },
  cameraContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
});

export default CameraButton;
