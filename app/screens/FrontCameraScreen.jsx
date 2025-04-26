import React, { useRef, useState, useEffect } from "react";
import { Button, StyleSheet, View, Text, Alert, Animated, PanResponder } from "react-native";
import { CameraView, useCameraPermissions, useMicrophonePermissions } from "expo-camera";
import LocationComp from "../components/LocationComp";
import * as FileSystem from "expo-file-system";
import axios from "axios";
import * as Speech from "expo-speech";
import { Audio } from "expo-av"; 
import alarmPlay from "../assets/alarm.mp3";
import { API_IP} from "@env";

export default function FrontCameraScreen() {
  const cameraRef = useRef(null);
  const [cameraPermission, requestCameraPermission] = useCameraPermissions();
  const [micPermission, requestMicPermission] = useMicrophonePermissions();
  const [isCapturing, setIsCapturing] = useState(false);
  const [cameraError, setCameraError] = useState(null);
  const [isAlarmActive, setIsAlarmActive] = useState(false);
  const alarmSound = useRef(new Audio.Sound());
  const slideAnim = useRef(new Animated.Value(0)).current;
  const captureTimeout = useRef(null);
  const isCapturingRef = useRef(false);

  useEffect(() => {
    requestPermissions();
    loadAlarmSound();
  
    return () => {
      stopAlarm(); 
      stopCapturing(); 
    };
  }, []);

  useEffect(() => {
    if (isAlarmActive) {
      startAutoSwipeAnimation();
    } else {
      slideAnim.stopAnimation();
    }
  }, [isAlarmActive]);
  
  
  const startAutoSwipeAnimation = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(slideAnim, {
          toValue: 20,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
      ])
    ).start();
  };

  
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
      const timestamp = new Date().toLocaleTimeString();
      console.log(`[${timestamp}] ALARM RINGING! Drowsiness detected.`);
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
    if (!isCapturingRef.current) return;
    if (cameraRef.current) {
      try {
        const timestamp = new Date().toLocaleTimeString();
        console.log(`[${timestamp}] Capturing photo...`);

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

      const response = await axios.post(`http://${API_IP}:5000/drowsiness`, formData, {
        headers: { 
          "Content-Type": "multipart/form-data",
        },
      });
  
      const data = response.data;
  
      console.log("Backend Response:", data);
  
      // Handle both cases: array or single object
      const result = Array.isArray(data) ? data[0] : data;
  
      if (result && result.message) {
        Speech.speak(result.message);
  
        if (result.drowsiness_detected) {
          stopCapturing();
          playAlarm();
        }
      } else {
        console.log("Unexpected backend response:", result);
      }
  
    } catch (error) {
      console.error("Error sending photo:", error.message);
    }
  };
  

  // Recursive scheduling using the ref for up-to-date status.
  const scheduleCapture = () => {
    console.log("in schedule capture", isCapturingRef.current);
    if (isCapturingRef.current) {
      capturePhoto();
      captureTimeout.current = setTimeout(scheduleCapture, 10000);
    }
  };

  const startCapturing = () => {
    if (!cameraPermission || cameraPermission.status !== "granted") {
      Alert.alert("Permission Required", "Camera permission is required.");
      return;
    }
    if (isCapturingRef.current) return; 

    setIsCapturing(true);
    isCapturingRef.current = true;
    scheduleCapture();
  };

  const stopCapturing = () => {
    setIsCapturing(false);
    isCapturingRef.current = false;
    if (captureTimeout.current) {
      clearTimeout(captureTimeout.current);
      captureTimeout.current = null;
    }
  };

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => true,
    onPanResponderGrant: () => {
      slideAnim.stopAnimation();
    },
    onPanResponderMove: (_evt, gestureState) => {
      if (gestureState.dx > 0) {
        slideAnim.setValue(gestureState.dx);
      }
    },
    onPanResponderRelease: async (_evt, gestureState) => {
      if (gestureState.dx > 150) {
        await stopAlarm();
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true
        }).start(() => {
          startCapturing();
        });
      } else {
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }).start(() => {
          if (isAlarmActive) startAutoSwipeAnimation();
        });
      }
    },
  });
  

  if (!cameraPermission || !micPermission) return <View />;

  return (
    <View style={styles.container}>
      {isAlarmActive ? (
        <View style={[styles.camera, { backgroundColor: "white" }]}>
          <View style={styles.alarmContainer}>
            <Text style={styles.alarmText}>Drowsiness Detected!</Text>
            <View style={styles.slideContainer} {...panResponder.panHandlers}>
              <Animated.View style={[
                styles.sosCircleWrapper,
                { transform: [{ translateX: slideAnim }] }
              ]}>
                <View style={styles.sosCircle}>
                  <Text style={styles.sosText}>I'm Awake</Text>
                </View>
              </Animated.View>
            </View>
          </View>
        </View>
      ) : (
        <>
          <CameraView ref={cameraRef} style={styles.camera} facing={"front"} />
          <LocationComp />
          <View style={styles.bottomSection}>
            <Button
              title={isCapturing ? "Stop Capturing" : "Start Capturing"}
              onPress={isCapturing ? stopCapturing : startCapturing}
              color="#3B71F3"
            />
          </View>
        </>
      )}

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
    fontSize:"90px"
  },
  alarmContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // position: "absolute",
    // top: 50,
    // left: 20,
    // right: 20,
    // alignItems: "center"
  },
  alarmText: {
    fontSize: 40,
    fontWeight: "bold",
    color: "red",
    marginBottom: 30,
  },
  slideContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    borderRadius: 34,
    overflow: "hidden",
    width: "80%",
    height: 70,
    borderWidth: 4,
    // borderColor: "#3B71F3"
    borderColor: "rgb(124, 163, 255)"
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
  sosCircleWrapper: {
    position: "absolute",
    left: 0,
    zIndex: 2,
  },
  sosCircle: {
    width: 100,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#3B71F3",
    alignItems: "center",
    justifyContent: "center",
  },

  sosText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  slideLabel: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
