import React from "react";
import { ScrollView, View, Text, StyleSheet } from "react-native";
import Graph from "../components/Graph";
import { SafeAreaView } from "react-native-safe-area-context";
import Navbar from "../components/Navbar";

const GraphScreen = () => {
  const graphsData = [
    {
      title: "Speed Over Time",
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
      data: [40, 50, 55, 60, 65, 70], // Speed values in km/h
      yAxisLabel: "km/h",
    },
    {
      title: "Distance Covered",
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
      data: [100, 150, 200, 250, 300, 350], // Distance in km
      yAxisLabel: "km",
    },
    {
      title: "Voice Assistance Success Rate",
      labels: ["Q1", "Q2", "Q3", "Q4"],
      data: [60, 68, 75, 82],
      yAxisLabel: "%",
    },
  ];
  

  return (
    <SafeAreaView style={styles.container}>
      <Navbar/>
      <ScrollView style={styles.mainContent}>
        <Text style={styles.header}>Performance Metrics</Text>
        {graphsData.map((graph, index) => (
          <Graph
            key={index}
            title={graph.title}
            labels={graph.labels}
            data={graph.data}
            yAxisLabel={graph.yAxisLabel}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainContent: {
    marginTop: 0,
    width: "100%",
    display: "flex",
    padding: 20,
    backgroundColor: "#f9f9f9",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 20,
  },
});

export default GraphScreen;
