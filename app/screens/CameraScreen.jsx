import React, { useRef, useState, useEffect } from "react";
import { Button, StyleSheet, View, Text } from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import * as Location from "expo-location";
import LocationComp from "../components/LocationComp";

export default function CameraScreen() {
  const cameraRef = useRef(null);
  const [permission, requestPermission] = useCameraPermissions();
  const [isRecording, setIsRecording] = useState(false);
  const [cameraError, setCameraError] = useState(null);

  const handleCameraReady = () => {
    setCameraError(null); // Reset any previous errors when the camera is ready
  };

  const handleCameraError = (error) => {
    setCameraError(error.message); // Update the error state if camera fails
    console.error("Camera Error: ", error.message);
  };

  const startRecording = async () => {
    if (cameraRef.current) {
      try {
        console.log("started");
        const video = await cameraRef.current.recordAsync();
        console.log("Video URI:", video.uri);
        await sendVideoToBackend(video.uri);
      } catch (error) {
        console.error("Error starting recording:", error);
        setCameraError(error.message);
      }
    }
  };

  const stopRecording = () => {
    if (cameraRef.current) {
      console.log("stopped");
      cameraRef.current.stopRecording();
      setIsRecording(false);
    }
  };

  const sendVideoToBackend = async (uri) => {
    try {
      const formData = new FormData();
      formData.append("video", {
        uri,
        name: "video.mp4",
        type: "video/mp4",
      });

      const response = await fetch("somya idhar url write kar for backend", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to upload video");
      }

      console.log("Video uploaded successfully");
    } catch (error) {
      console.error("Error sending video:", error);
    }
  };

  if (!permission) {
    return <View />;
  }

  if (permission.status !== "granted") {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="Grant Permission" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CameraView
        ref={cameraRef}
        style={styles.camera}
        type={"back"}
        mode="video"
        onCameraReady={handleCameraReady}
        onError={handleCameraError}
      />

        <LocationComp />

      {/* <Location/> */}
      <View style={styles.buttonContainer}>
        <Button
          title={isRecording ? "Stop Recording" : "Start Recording"}
          onPress={isRecording ? stopRecording : startRecording}
        />
      </View>
      {cameraError && (
        <Text style={styles.errorText}>Error: {cameraError}</Text>
      )}
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
  buttonContainer: {
    position: "absolute",
    bottom: 60,
    fontSize: 20,
    width: "100%",
    alignItems: "center",
    backgroundColor: "transparent",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  errorText: {
    color: "red",
    position: "absolute",
    bottom: 70,
    left: 20,
    fontWeight: "bold",
  },
  speedText: {
    position: "absolute",
    top: 20,
    right: 20,
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
});
