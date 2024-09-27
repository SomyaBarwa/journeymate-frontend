import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React from "react";
import Navbar from "../components/Navbar";
import Card from "../components/Card";

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Navbar />

      <View style={styles.mainContent}>
        <ScrollView
          contentContainerStyle={styles.cardView}
          showsVerticalScrollIndicator={false}
        >
          <Card />
          <Card />
          {/* <Card />  */}
        </ScrollView>
        <View style={styles.footerContainer}>
          <TouchableOpacity style={styles.btnContainer}>
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
    flexDirection: "column",
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
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    width: "100%",
    display: "flex",
    alignItems: "center",
    padding: 10,
    rowGap: 40,
    backgroundColor: "#f9f9f9",
    height: "100%",
    color: "black",
    borderRadius: 40,
  },
  cardView: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    width: "100%",
    padding: 10,
    marginTop: 40,
    height: "auto",
    overflow: "hidden",
    rowGap: 40,
    borderRadius: 40,
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
