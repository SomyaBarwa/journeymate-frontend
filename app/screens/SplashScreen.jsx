import { View, Text, StyleSheet, Animated } from "react-native";
import React, { useEffect, useRef } from "react";

export default function SplashScreen({ navigation }) {
  const fadeAnim = useRef(new Animated.Value(0)).current; // Start opacity at 0
  const scaleAnim = useRef(new Animated.Value(0.5)).current; // Start scale at 0.5

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1, 
        duration: 800, 
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1, 
        duration: 800, 
        useNativeDriver: true,
      }),
    ]).start();

    setTimeout(() => {
      navigation.replace("Welcome");
    }, 1200);
  }, []);

  return (
    <View style={styles.container}>
      <Animated.Text
        style={[
          styles.brandName,
          { opacity: fadeAnim, transform: [{ scale: scaleAnim }] },
        ]}
      >
        JourneyMate
      </Animated.Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#3B71F3",
  },
  brandName: {
    fontSize: 60,
    fontWeight: "bold",
    color: "#fff",
  },
});
