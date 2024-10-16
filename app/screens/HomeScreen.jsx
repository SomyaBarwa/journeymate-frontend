import React, { useEffect, useState } from "react";
import {
  View,
  SafeAreaView,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Text,
  Alert,
} from "react-native";
import { Camera } from "expo-camera"; // Ensure expo-camera is correctly installed
import Navbar from "../components/Navbar"; // Check this path
import Card from "../components/Card"; // Check this path

export default function HomeScreen() {
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraVisible, setCameraVisible] = useState(false);
  const [cameraRef, setCameraRef] = useState(null);

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
    return <View />; // Waiting for permission
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>; // No access to camera
  }

  // Example card data array
  const cardsData = [
    { id: 1, title: "Card 1" },
    { id: 2, title: "Card 2" },
    { id: 3, title: "Card 3" },
    { id: 4, title: "Card 4" },
  ];

  const renderCard = ({ item }) => <Card title={item.title} />; // Make sure Card is defined

  return (
    <SafeAreaView style={styles.container}>
      <Navbar />
      <View style={styles.mainContent}>
        <FlatList
          data={cardsData}
          renderItem={renderCard}
          keyExtractor={(item) => item.id.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.carousel}
          snapToAlignment="center"
          decelerationRate="fast"
          snapToInterval={200} // Adjust based on card width + margin
          pagingEnabled
        />
        {cameraVisible ? (
          <Camera style={styles.camera} ref={(ref) => setCameraRef(ref)}>
            <View style={styles.cameraContainer}>
              <TouchableOpacity style={styles.button} onPress={capturePhoto}>
                <Text style={styles.buttonText}>Capture</Text>
              </TouchableOpacity>
            </View>
          </Camera>
        ) : (
          <View style={styles.footerContainer}>
            <TouchableOpacity
              style={styles.btnContainer}
              onPress={() => setCameraVisible(true)} // Show camera on press
            >
              <Text style={styles.btnText}>Start your ride</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  btnContainer: {
    padding: 15,
    backgroundColor: "#3B71F3",
    borderRadius: 15,
    width: "95%",
  },
  btnText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 25,
  },
  mainContent: {
    marginTop: 0,
    width: "100%",
    display: "flex",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#f9f9f9",
    height: "100%",
  },
  carousel: {
    paddingVertical: 10,
  },
  camera: {
    width: "100%",
    height: 400, // Adjust height as necessary
  },
  cameraContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  button: {
    backgroundColor: "#3B71F3",
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
  },
  footerContainer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 100,
  },
});
