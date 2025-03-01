import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useState } from "react";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please enter both email and password");
      return;
    }

    try {
      const response = await fetch("http://192.168.1.4:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert("Success", "Login successful!");
        navigation.navigate("Home"); // Navigate to Home on success
      } else {
        Alert.alert("Error", data.message || "Invalid credentials");
      }
    } catch (error) {
      console.error("Login Error:", error);
      Alert.alert("Error", "Something went wrong. Please try again.");
    }
  };

  const navigateToRegister = () => {
    navigation.navigate("Register");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Sign In</Text>
      </View>
      <Text style={styles.placeholderText}>Email address</Text>
      <TextInput
        style={styles.input}
        placeholder="johndoe@gmail.com"
        value={email}
        onChangeText={(text) => setEmail(text)}
        keyboardType="email-address"
      />
      <Text style={styles.placeholderText}>Password</Text>
      <TextInput
        secureTextEntry
        style={styles.input}
        placeholder="Enter password"
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      <TouchableOpacity style={styles.btnContainer} onPress={handleLogin}>
        <Text style={styles.btnText}>Sign In</Text>
      </TouchableOpacity>
      <View style={styles.dont}>
        <Text style={styles.dontText}>
          Don't have an account?{" "}
          <Text style={styles.dontLink} onPress={navigateToRegister}>
            Sign Up
          </Text>
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 20,
    alignItems: "left",
  },
  dont: {
    width: "100%",
    marginTop: 20,
  },
  dontLink: {
    color: "#3B71F3",
  },
  dontText: {
    fontSize: 20,
  },
  input: {
    height: 40,
    width: "100%",
    marginVertical: 20,
    borderWidth: 1,
    padding: 10,
    fontSize: 20,
  },
  headerContainer: {
    height: 100,
    width: "100%",
    marginTop: 50,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
    borderRadius: 10,
  },
  header: {
    color: "#2e2e2e",
    textAlign: "center",
    fontSize: 50,
    fontWeight: "bold",
  },
  btnContainer: {
    padding: 15,
    backgroundColor: "#3B71F3",
    borderRadius: 15,
    marginTop: 30,
    width: "100%",
  },
  btnText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 25,
  },
  placeholderText: {
    fontSize: 25,
    fontWeight: "300",
  },
});
