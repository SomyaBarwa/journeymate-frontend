import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { LineChart } from "react-native-chart-kit";

export default function Graph({ title, labels, data, yAxisLabel = "" }) {
    return (
        <View style={styles.container}>
          <Text style={styles.title}>{title}</Text>
          <LineChart
            data={{
              labels: labels,
              datasets: [{ data: data }],
            }}
            width={Dimensions.get("window").width - 20}
            height={250}
            yAxisLabel={yAxisLabel}
            chartConfig={{
              backgroundGradientFrom: "#f3f3f3",
              backgroundGradientTo: "#e8e8e8",
              decimalPlaces: 1,
              color: (opacity = 1) => `rgba(0, 122, 255, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              style: { borderRadius: 16 },
              propsForDots: { r: "5", strokeWidth: "2", stroke: "#007AFF" },
            }}
            bezier
            style={styles.chart}
          />
        </View>
      );
}

const styles = StyleSheet.create({
    container: {
      alignItems: "center",
      justifyContent: "center",
      marginVertical: 20,
    },
    title: {
      fontSize: 18,
      fontWeight: "bold",
      marginBottom: 10,
    },
    chart: {
      borderRadius: 10,
    },
  });