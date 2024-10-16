import React from "react";
import { View, SafeAreaView, StyleSheet, FlatList, TouchableOpacity, Text } from "react-native";
import Navbar from "../components/Navbar"; 
import Card from "../components/Card"; 

export default function HomeScreen({ navigation }) {
  const cardsData = [
    { id: 1, title: "Card 1" },
    { id: 2, title: "Card 2" },
    { id: 3, title: "Card 3" },
    { id: 4, title: "Card 4" },
  ];

  const openCamera = () => {
    navigation.navigate('CameraScreen'); 
  };

  const renderCard = ({ item }) => <Card title={item.title} />; 

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

        <View style={styles.footerContainer}>
          <TouchableOpacity style={styles.btnContainer} onPress={openCamera}>
            <Text style={styles.btnText}>Start your ride</Text>
          </TouchableOpacity>
        </View>
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
  footerContainer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 100,
  },
});
