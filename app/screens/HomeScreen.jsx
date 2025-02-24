import React from "react";
import {
  View,
  SafeAreaView,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Text,
} from "react-native";
import Navbar from "../components/Navbar";
import Card from "../components/Card";

export default function HomeScreen({ navigation }) {
  const cardsData = [
    {
      id: 2,
      title: "Drowziness Detection",
      img: require("../assets/Tiredness.png"),
      link: "Frontcamera",
    },
    {
      id: 1,
      title: "Real-time traffic sign recognition",
      img: require("../assets/Carpool2.png"),
      link: "Camera",
    },
    { id: 3, 
      title: "Maps", 
      img: require("../assets/Carpool2.png"),
      link: "Map" 
    },
    { id: 4, 
      title: "Voice Assitance", 
      img: require("../assets/voice.png"),
      link: "" 
    },
  ];

  const renderCard = ({ item }) => <Card title={item.title} img={item.img} link={item.link} navigation={navigation}/>;

  const openCamera = () => {
    navigation.navigate("FrontCamera");
  };


  return (
    <SafeAreaView style={styles.container}>
      <Navbar />
      <SafeAreaView style={styles.mainContent}>
        <Text style={styles.textHead}>Features:</Text>
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
      </SafeAreaView>
      <View style={styles.footerContainer}>
        <TouchableOpacity style={styles.btnContainer} onPress={openCamera}>
          <Text style={styles.btnText}>Start your ride</Text>
        </TouchableOpacity>
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
  textHead: {
    fontSize: 40,
    padding: 10,
    marginLeft: 15,
    width: "100%",
    fontWeight: "400",
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
  },
  carousel: {
    paddingVertical: 10,
    marginBottom: 20,
  },
  footerContainer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 50,
  },
});
