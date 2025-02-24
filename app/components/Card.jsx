import { Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const Card = ({ title, img, link}) => {
    const navigation = useNavigation(); 
  
  const navigateTo = () => {
    if (link) {
      navigation.navigate(link.toString());
    }
  };
  return (
    <TouchableOpacity style={styles.cardContainer} onPress={navigateTo}>
      <Image source={img} style={styles.getImage} resizeMode="contain" />
      <Text style={styles.cardText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: "#edf7f9",
    height: 250,
    width: 250, // Set card width smaller to allow for partial view of the next card
    padding: 10,
    marginHorizontal: 10, // Margin between cards
    borderRadius: 20,

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 7,

    elevation: 3,
  },
  cardText: {
    fontSize: 20,
    color: "#6b6b6b",
    zIndex: 1000,
  },
  getImage: {
    position: "absolute",
    top: 0,
    bottom: 0,
    width: "100%",
    height: "130%",
    zIndex: -1,
    opacity: 0.7,
  },
});

export default Card;
