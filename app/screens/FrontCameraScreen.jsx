import React, { useRef, useState, useEffect } from "react";
import { Button, StyleSheet, View, Text, Alert, Animated, PanResponder } from "react-native";
import { CameraView, useCameraPermissions, useMicrophonePermissions } from "expo-camera";
import LocationComp from "../components/LocationComp";
import * as FileSystem from "expo-file-system";
import axios from "axios";
import * as Speech from "expo-speech";
import { Audio } from "expo-av"; 
import alarmPlay from "../assets/alarm.mp3"

export default function FrontCameraScreen() {
  const cameraRef = useRef(null);
  const [cameraPermission, requestCameraPermission] = useCameraPermissions();
  const [micPermission, requestMicPermission] = useMicrophonePermissions();
  const [isCapturing, setIsCapturing] = useState(false);
  const [captureInterval, setCaptureInterval] = useState(null);
  const [cameraError, setCameraError] = useState(null);
  const [isAlarmActive, setIsAlarmActive] = useState(false);
  const alarmSound = useRef(new Audio.Sound());
  const slideAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    requestPermissions();
    loadAlarmSound();
  
    return () => {
      stopAlarm(); 
    };
  }, []);
  
  const requestPermissions = async () => {
    if (!cameraPermission || cameraPermission.status !== "granted") {
      await requestCameraPermission();
    }
    if (!micPermission || micPermission.status !== "granted") {
      await requestMicPermission();
    }
  };

  const loadAlarmSound = async () => {
    try {
      await alarmSound.current.loadAsync((alarmPlay), { shouldPlay: false });
    } catch (error) {
      console.error("Error loading alarm sound:", error);
    }
  };

  const playAlarm = async () => {
    setIsAlarmActive(true);
    try {
      await alarmSound.current.setIsLoopingAsync(true);
      await alarmSound.current.playAsync();
    } catch (error) {
      console.error("Error playing alarm:", error);
    }
  };

  const stopAlarm = async () => {
    setIsAlarmActive(false);
    try {
      await alarmSound.current.stopAsync();
    } catch (error) {
      console.error("Error stopping alarm:", error);
    }
  };

  const capturePhoto = async () => {
    if (cameraRef.current) {
      try {
        const photo = await cameraRef.current.takePictureAsync({ base64: true });
        console.log("Captured Photo URI:", photo.uri);

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

      const response = await axios.post("http://IPCONFIG_IP:5000/drowsiness", formData, {
        headers: { 
          "Content-Type": "multipart/form-data",
         },
      });

      console.log("Backend Response:", response.data[0]);

      if (response.data && response.data.length > 0) {
        const message = response.data[0].message;
        const flag=response.data[0].drowsiness_detected;
        Speech.speak(message);

        if (flag) {
          stopCapturing();
          playAlarm();
        }
      }
    } catch (error) {
      console.error("Error sending photo:", error.message);
    }
  };

  const startCapturing = () => {
    if (!cameraPermission || cameraPermission.status !== "granted") {
      Alert.alert("Permission Required", "Camera permission is required.");
      return;
    }

    setIsCapturing(true);
    const interval = setInterval(() => {
      capturePhoto();
    }, 10000);

    setCaptureInterval(interval);
  };

  const stopCapturing = () => {
    setIsCapturing(false);
    if (captureInterval) {
      clearInterval(captureInterval);
      setCaptureInterval(null);
    }
  };

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: (evt, gestureState) => {
      if (gestureState.dx > 0) {
        slideAnim.setValue(gestureState.dx);
      }
    },
    onPanResponderRelease: async (evt, gestureState) => {
      if (gestureState.dx > 150) { 
        stopAlarm();
        startCapturing();
        Animated.timing(slideAnim, { toValue: 0, duration: 200, useNativeDriver: true }).start();
      } else {
        Animated.timing(slideAnim, { toValue: 0, duration: 200, useNativeDriver: true }).start();
      }
    },
  });

  if (!cameraPermission || !micPermission) return <View />;

  return (
    <View style={styles.container}>
      <CameraView 
        ref={cameraRef}
        style={styles.camera}
        facing={"front"}
      />

      <LocationComp />

      {isAlarmActive && (
        <View style={styles.alarmContainer}>
          <Text style={styles.alarmText}>Drowsiness Detected!</Text>
          <View style={styles.slideContainer} {...panResponder.panHandlers}>
            <Animated.View style={[styles.slideButton, { transform: [{ translateX: slideAnim }] }]}>
              <Text style={styles.slideArrow}>➤</Text>
            </Animated.View>
            <Text style={styles.slideText}>Slide to Stop Alarm</Text>
          </View>
        </View>
      )}

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
  alarmContainer: {
    position: "absolute",
    top: 50,
    left: 20,
    right: 20,
    alignItems: "center"
  },
  alarmText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "red"
  },
  slideContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "blue",
    borderRadius: 50,
    padding: 10
  },
  slideButton: {
    width: 50,
    height: 50,
    backgroundColor: "white",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center"
  },
  slideArrow: {
    fontSize: 20,
    color: "black"
  },
  slideText: {
    color: "white",
    marginLeft: 20
  },
});
