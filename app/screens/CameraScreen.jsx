import React, { useRef, useState, useEffect } from "react";
import { Button, StyleSheet, View, Text, Alert} from "react-native";
import { CameraView, useCameraPermissions, useMicrophonePermissions } from "expo-camera";
import LocationComp from "../components/LocationComp";
import * as FileSystem from "expo-file-system";
import axios from "axios";

export default function CameraScreen() {
  const cameraRef = useRef(null);
  const [cameraPermission, requestCameraPermission] = useCameraPermissions();
  const [micPermission, requestMicPermission] = useMicrophonePermissions();
  const [isCapturing, setIsCapturing] = useState(false);
  const [captureInterval, setCaptureInterval] = useState(null);
  const [cameraError, setCameraError] = useState(null);

  useEffect(() => {
    requestPermissions();
  }, []);

  // Request Camera & Microphone Permissions
  const requestPermissions = async () => {
    if (!cameraPermission || cameraPermission.status !== "granted") {
      await requestCameraPermission();
    }
    if (!micPermission || micPermission.status !== "granted") {
      await requestMicPermission();
    }
  };

  // Function to capture a photo and send it to backend
  const capturePhoto = async () => {
    if (cameraRef.current) {
      try {
        const photo = await cameraRef.current.takePictureAsync({ base64: true });
        console.log("Captured Photo URI:", photo.uri);

        // Send photo to backend
        const res=await sendPhotoToBackend(photo.uri);
      } catch (error) {
        console.error("Error capturing photo:", error);
        setCameraError(error.message);
      }
    }
  };


  const sendPhotoToBackend = async (uri) => {
    try {
      const fileInfo = await FileSystem.getInfoAsync(uri);
      console.log('1----', fileInfo);
      if (!fileInfo.exists) {
        console.error("File does not exist:", uri);
        return;
      }
      
      const formData = new FormData();
      formData.append("image", {
        uri: uri,
        name: `image_${Date.now()}.jpg`,
        type: "image/jpeg",
      });
      console.log('3----', formData);
      
      // Correct axios usage
      const response = await axios.post(
        "http://IPCONFIG_IP:5000/detect",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log('4-----', response.data);
      
      console.log("Photo uploaded successfully");
    } catch (error) {
      console.error("Error sending photo:", error.message);
    }
  };

  // Start capturing photos every 2 seconds
  const startCapturing = () => {
    if (!cameraPermission || cameraPermission.status !== "granted") {
      Alert.alert("Permission Required", "Camera permission is required.");
      return;
    }

    setIsCapturing(true);
    const interval = setInterval(() => {
      capturePhoto();
    }, 2000);

    setCaptureInterval(interval);
  };

  // Stop capturing photos
  const stopCapturing = () => {
    setIsCapturing(false);
    if (captureInterval) {
      clearInterval(captureInterval);
      setCaptureInterval(null);
    }
  };

  if (!cameraPermission || !micPermission) {
    return <View />;
  }

  if (cameraPermission.status !== "granted" || micPermission.status !== "granted") {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>We need permissions to use the camera</Text>
        <Button onPress={requestPermissions} title="Grant Permissions" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CameraView
        ref={cameraRef}
        style={styles.camera}
        facing={"back"}
      />

      <LocationComp />

      {/* Bottom White Section */}
      <View style={styles.bottomSection}>
        <Button
          title={isCapturing ? "Stop Capturing" : "Start Capturing"}
          onPress={isCapturing ? stopCapturing : startCapturing}
          color="#3B71F3"
        />
      </View>
      
      {cameraError && <Text style={styles.errorText}>Error: {cameraError}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  bottomSection: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: 100,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  errorText: {
    color: "red",
    position: "absolute",
    bottom: 120,
    left: 20,
    fontWeight: "bold",
  },
});
