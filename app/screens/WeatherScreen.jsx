import { View, Text, ScrollView, StyleSheet, Image } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { LocationContext } from "../context/LocationContext";
import { WEATHER_API_KEY } from "@env";

export default function WeatherScreen() {
  const { currentLocation } = useContext(LocationContext);
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getCurrentWeather() {
      try {
        const response = await fetch(
          `http://api.weatherapi.com/v1/forecast.json?key=${WEATHER_API_KEY}&q=${currentLocation.latitude},${currentLocation.longitude}&days=7&aqi=no&alerts=no`
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
      getCurrentWeather();
    }
  }, [currentLocation]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Fetching weather data...</Text>
      </View>
    );
  }

  if (!weatherData) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.errorText}>Failed to load weather data</Text>
      </View>
    );
  }

  const { location, current, forecast } = weatherData;
  const temperature = current.temp_c;
  const conditionText = current.condition.text;
  const conditionIcon = `https:${current.condition.icon}`;
  const windSpeed = current.wind_kph;
  const humidity = current.humidity;
  const feelsLike = current.feelslike_c;
  const uvIndex = current.uv;
  const visibility = current.vis_km;
  const pressure = current.pressure_mb;
  const sunrise = forecast.forecastday[0].astro.sunrise;
  const sunset = forecast.forecastday[0].astro.sunset;

  return (
    <View style={styles.container}>
      <Navbar />
      <ScrollView style={styles.mainContent}>
        {/* Top Section - City, Temp, Condition */}
        <View style={styles.topSection}>
          <Text style={styles.city}>{location.name}, {location.country}</Text>
          <Image source={{ uri: conditionIcon }} style={styles.weatherIcon} />
          <Text style={styles.temp}>{temperature}°C</Text>
          <Text style={styles.condition}>{conditionText}</Text>
        </View>

        {/* Forecast Section */}
        <Text style={styles.sectionTitle}>Future Forecast</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.forecastContainer}
        >
          {forecast.forecastday.map((day, index) => (
            <View key={index} style={styles.forecastCard}>
              <Text style={styles.forecastDay}>
                {new Date(day.date).toLocaleDateString('en-US', { weekday: 'short' })}
              </Text>
              <Image
                source={{ uri: `https:${day.day.condition.icon}` }}
                style={styles.forecastIcon}
              />
              <Text style={styles.forecastTemp}>
                {day.day.maxtemp_c}° / {day.day.mintemp_c}°
              </Text>
              <Text style={styles.forecastRain}>🌧️ {day.day.daily_chance_of_rain}%</Text>
            </View>
          ))}
        </ScrollView>

        {/* Weather Details Section */}
        <Text style={styles.sectionTitle}>Weather Details</Text>
        <View style={styles.detailsGrid}>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Feels Like</Text>
            <Text style={styles.detailValue}>{feelsLike}°C</Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Humidity</Text>
            <Text style={styles.detailValue}>{humidity}%</Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Wind Speed</Text>
            <Text style={styles.detailValue}>{windSpeed} km/h</Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Visibility</Text>
            <Text style={styles.detailValue}>{visibility} km</Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Pressure</Text>
            <Text style={styles.detailValue}>{pressure} mb</Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>UV Index</Text>
            <Text style={styles.detailValue}>{uvIndex}</Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Sunrise</Text>
            <Text style={styles.detailValue}>{sunrise}</Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Sunset</Text>
            <Text style={styles.detailValue}>{sunset}</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E0F7FA",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#E0F7FA",
  },
  mainContent: {
    padding: 20,
  },
  loadingText: {
    fontSize: 18,
    color: "#00796B",
  },
  errorText: {
    fontSize: 18,
    color: "red",
  },
  topSection: {
    alignItems: "center",
    marginBottom: 30,
  },
  city: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#004D40",
  },
  weatherIcon: {
    width: 100,
    height: 100,
  },
  temp: {
    fontSize: 72,
    fontWeight: "200",
    color: "#004D40",
  },
  condition: {
    fontSize: 20,
    color: "#00796B",
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#004D40",
    marginBottom: 15,
  },
  forecastContainer: {
    flexDirection: "row",
    marginBottom: 30,
  },
  forecastCard: {
    backgroundColor: "#4DD0E1",
    padding: 15,
    borderRadius: 15,
    marginRight: 15,
    alignItems: "center",
    width: 120,
  },
  forecastDay: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
  forecastIcon: {
    width: 50,
    height: 50,
    marginVertical: 10,
  },
  forecastTemp: {
    fontSize: 16,
    color: "#fff",
  },
  forecastRain: {
    fontSize: 12,
    color: "#E1F5FE",
    marginTop: 5,
  },
  detailsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 30,
  },
  detailItem: {
    width: "48%",
    backgroundColor: "#B2EBF2",
    padding: 15,
    borderRadius: 15,
    marginBottom: 15,
  },
  detailLabel: {
    fontSize: 14,
    color: "#00695C",
  },
  detailValue: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#004D40",
    marginTop: 5,
  },
});
