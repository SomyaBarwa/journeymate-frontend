import React from "react";
import {
  View,
  SafeAreaView,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Text,
  ScrollView,
} from "react-native";
import Navbar from "../components/Navbar";
import Card from "../components/Card";
import { useNavigation } from "@react-navigation/native";

export default function HomeScreen() {
  const navigation = useNavigation();

  const cardsData = [
    {
      id: 1,
      title: "Drowziness Detection",
      img: require("../assets/Tiredness.png"),
      link: "Frontcamera",
    },
    {
      id: 2,
      title: "Real-time traffic sign recognition",
      img: require("../assets/Carpool2.png"),
      link: "Camera",
    },
    {
      id: 3,
      title: "Maps",
      img: require("../assets/Carpool2.png"),
      link: "Map",
    },
    {
      id: 4,
      title: "Weather",
      img: require("../assets/voice.png"),
      link: "Weather",
    },
    {
      id: 5,
      title: "Voice Assitance",
      img: require("../assets/voice.png"),
      link: "",
    },
  ];

  const openCamera = () => {
    navigation.navigate("Camera");
  };

  const renderCard = ({ item }) => (
    <Card
      title={item.title}
      img={item.img}
      link={item.link}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <Navbar />
      <View style={styles.mainContent}>
        {/* <Text style={styles.textHead}>Features:</Text> */}
        <FlatList
          data={cardsData}
          renderItem={renderCard}
          keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.carousel}
          snapToAlignment="center"
          decelerationRate="fast"
          snapToInterval={200}
          pagingEnabled
        />
      </View>
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
    padding: 10,
    backgroundColor: "#f9f9f9",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginBottom: 50,
    maxHeight: "80%",
  },
  carousel: {
    paddingVertical: 10,
    marginBottom: 0,
    justifyContent: "center",
    flexDirection: "column",
    rowGap: 20,
    padding: 20,
    width: "100%",
    backgroundColor: "#f9f9f9",
  },
  footerContainer: {
    backgroundColor: "#f9f9f9",
    position: "absolute",
    bottom: 0,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 50,
  },
});


// 2 cards per column 
// import React from "react";
// import {
//   View,
//   SafeAreaView,
//   StyleSheet,
//   FlatList,
//   TouchableOpacity,
//   Text,
// } from "react-native";
// import Navbar from "../components/Navbar";
// import Card from "../components/Card";
// import { useNavigation } from "@react-navigation/native";

// export default function HomeScreen() {
//   const navigation = useNavigation();

//   const cardsData = [
//     { id: 1, title: "Drowsiness Detection", img: require("../assets/Tiredness.png"), link: "Frontcamera" },
//     { id: 2, title: "Traffic Sign Recognition", img: require("../assets/Carpool2.png"), link: "Camera" },
//     { id: 3, title: "Maps", img: require("../assets/Carpool2.png"), link: "Map" },
//     { id: 4, title: "Weather", img: require("../assets/voice.png"), link: "Weather" },
//     { id: 5, title: "Voice Assistance", img: require("../assets/voice.png"), link: "" },
//   ];

//   return (
//     <SafeAreaView style={styles.container}>
//       <Navbar />
//       <View style={styles.mainContent}>
//         <Text style={styles.textHead}>Features:</Text>
//         <FlatList
//           data={cardsData}
//           renderItem={({ item }) => <Card title={item.title} img={item.img} link={item.link} />}
//           keyExtractor={(item) => item.id.toString()}
//           numColumns={2}
//           columnWrapperStyle={styles.row} // Space between columns
//           key={"numColumnsTwo"} // Forces re-render
//           showsVerticalScrollIndicator={false}
//           contentContainerStyle={styles.carousel}
//         />
//       </View>
//       <View style={styles.footerContainer}>
//         <TouchableOpacity style={styles.btnContainer} onPress={() => navigation.navigate("Camera")}>
//           <Text style={styles.btnText}>Start your ride</Text>
//         </TouchableOpacity>
//       </View>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: "center",
//   },
//   textHead: {
//     fontSize: 40,
//     padding: 10,
//     marginLeft: 15,
//     width: "100%",
//     fontWeight: "400",
//   },
//   btnContainer: {
//     padding: 15,
//     backgroundColor: "#3B71F3",
//     borderRadius: 15,
//     width: "95%",
//   },
//   btnText: {
//     color: "#fff",
//     textAlign: "center",
//     fontSize: 25,
//   },
//   mainContent: {
//     width: "100%",
//     padding: 10,
//     backgroundColor: "#f9f9f9",
//     borderTopLeftRadius: 20,
//     borderTopRightRadius: 20,
//     flex: 1,
//   },
//   carousel: {
//     paddingVertical: 10,
//     paddingHorizontal: 10, // Padding for spacing
//   },
//   row: {
//     justifyContent: "space-between", // Spaces between columns
//     marginBottom: 20, // Space between rows
//   },
//   footerContainer: {
//     backgroundColor: "#f9f9f9",
//     width: "100%",
//     alignItems: "center",
//     justifyContent: "center",
//     paddingVertical: 20,
//   },
// });


