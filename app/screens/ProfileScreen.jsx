import React from 'react';
import { SafeAreaView, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native'; 
import Navbar from '../components/Navbar';

export default function ProfileScreen() {
  const navigation = useNavigation(); 

  const userDetails = {
    name: "Vighnesh Adelkar",
    email: "test@gmail.com",
    id: "12345",
    number: "+91 1234567890",
    address: "JPM CHSL, MULUND EAST, MUMBAI 400081"
  };

  return (
    <SafeAreaView style={styles.container}>
      <Navbar />

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>User Details</Text>
        <Text style={styles.detailText}>Name: {userDetails.name}</Text>
        <Text style={styles.detailText}>Email: {userDetails.email}</Text>
        <Text style={styles.detailText}>ID: {userDetails.id}</Text>
        <Text style={styles.detailText}>Phone: {userDetails.number}</Text>
        <Text style={styles.detailText}>Address: {userDetails.address}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Navigation</Text>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Graph")}>
          <Text style={styles.buttonText}>Analytics</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Frontcamera")}>
          <Text style={styles.buttonText}>Drowziness Detection</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Camera")}>
          <Text style={styles.buttonText}>Traffic Sign Detection</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Map")}>
          <Text style={styles.buttonText}>Directions</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Weather")}>
          <Text style={styles.buttonText}>Weather</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#f9f9f9",
  },
  section: {
    width: "90%",
    backgroundColor: "#ffffff",
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  detailText: {
    fontSize: 16,
    marginBottom: 5,
    color: "#555",
  },
  button: {
    backgroundColor: "#3B71F3",
    padding: 12,
    borderRadius: 8,
    marginTop: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
});

