import { View, Text, ScrollView, StyleSheet } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { LocationContext } from "../context/LocationContext";

export default function WeatherScreen() {
  const { currentLocation } = useContext(LocationContext);
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);

  console.log(currentLocation.latitude,currentLocation.longitude)

  useEffect(() => {
    async function getCurrentWeather() {
      const options = {
        method: "GET",
        headers: {
          "x-rapidapi-key": "35646dbea5msh47cc576bae2f2c1p1c6c65jsn053d747717e2",
          "x-rapidapi-host": "yahoo-weather5.p.rapidapi.com",
        },
      };

      try {
        const response = await fetch(
          `https://yahoo-weather5.p.rapidapi.com/weather?lat=${currentLocation.latitude}&long=${currentLocation.longitude}&format=json&u=f`,
          options
        );
        const result = await response.json();
        setWeatherData(result);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    if (currentLocation) {
    //   getCurrentWeather();
    }
  }, [currentLocation]);

  if (loading) {
    return (
      <View style={styles.mainContent}>
        <Text style={styles.loadingText}>Fetching weather data...</Text>
      </View>
    );
  }

  if (!weatherData) {
    return (
      <View style={styles.mainContent}>
        <Text style={styles.errorText}>Failed to load weather data</Text>
      </View>
    );
  }

  const { location, current_observation, forecasts } = weatherData;
  const { temperature, text } = current_observation.condition;
  const { sunrise, sunset } = current_observation.astronomy;
  const { humidity } = current_observation.atmosphere;
  const windSpeed = current_observation.wind.speed;

  return (
    <View style={styles.container}>
      <Navbar />
      <ScrollView style={styles.mainContent}>
        <View style={styles.weatherCard}>
          <Text style={styles.city}>{location.city}, {location.country}</Text>
          <Text style={styles.temp}>{temperature}°F</Text>
          <Text style={styles.condition}>{text}</Text>
          <Text style={styles.details}>Wind: {windSpeed} mph | Humidity: {humidity}%</Text>
          <Text style={styles.details}>Sunrise: {sunrise} | Sunset: {sunset}</Text>
        </View>

        {/* Forecast Section */}
        <Text style={styles.forecastTitle}>7-Day Forecast</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.forecastContainer}
        >
          {forecasts.slice(0, 7).map((day, index) => (
            <View key={index} style={styles.forecastCard}>
              <Text style={styles.forecastDay}>{day.day}</Text>
              <Text style={styles.forecastTemp}>{day.high}°F</Text>
              <Text style={styles.forecastCondition}>{day.text}</Text>
            </View>
          ))}
        </ScrollView>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  mainContent: {
    marginTop: 0,
    width: "100%",
    display: "flex",
    padding: 20,
    backgroundColor: "#f9f9f9",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    rowGap: 15,
  },
  loadingText: {
    fontSize: 18,
    color: "black",
    textAlign: "center",
    marginTop: 20,
  },
  errorText: {
    fontSize: 18,
    color: "red",
    textAlign: "center",
    marginTop: 20,
  },
  weatherCard: {
    alignItems: "center",
    padding: 20,
    borderRadius: 20,
    marginBottom: 20,
  },
  city: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
  },
  temp: {
    fontSize: 85,
    fontWeight: "300",
    color: "#333",
  },
  condition: {
    fontSize: 20,
    color: "#555",
  },
  details: {
    fontSize: 20,
    color: "#666",
    marginTop: 5,
  },
  forecastTitle: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  forecastContainer: {
    flexDirection: "row",
    backgroundColor: "#7bb9ff",
    borderRadius: 20,
    padding: 15,
  },
  forecastCard: {
    padding: 15,
    borderRadius: 10,
    marginRight: 10,
    alignItems: "center",
    width: 100,
    borderWidth: 1,
    borderColor: "#e8e9ea",
  },
  forecastDay: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
  forecastTemp: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
    marginVertical: 5,
  },
  forecastCondition: {
    fontSize: 14,
    color: "#ddd",
  },
});
