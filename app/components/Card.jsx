import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";

const Card = () => {
  return (
    <View style={styles.cardContainer}>
      <Image
        source={require("../assets/Carpool2.png")}
        style={styles.getImage}
        resizeMode="contain"
      />
      <Text style={styles.cardText}>Real-time traffic sign recognition</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: "#edf7f9",
    height: 250,
    width: "100%",
    padding: 10,
    borderRadius: 20,
    paddingBottom: 0,

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 7,

    elevation: 3,
  },
  cardText: {
    fontSize: 30,
    color: "#6b6b6b",
    zIndex: 1000,
  },
  getImage: {
    position: "absolute",
    top: 0,
    bottom: 0,
    // left: 0,
    // right: 0,
    width: "100%",
    height: "130%",
    zIndex: -1,
    padding: 0,
    opacity: 0.7,
  },
});

export default Card;
