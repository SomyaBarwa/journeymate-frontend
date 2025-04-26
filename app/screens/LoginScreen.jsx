import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  ImageBackground,
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
      const response = await fetch("http://192.168.0.103:4000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert("Success", "Login successful!");
        navigation.navigate("Home");
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
    <ImageBackground
      source={require("../assets/getstarted.png")} 
      style={styles.background}
      blurRadius={1} 
    >
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
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  container: {
    flex: 1,
    marginHorizontal: 20,
    alignItems: "left",
    // backgroundColor: "rgba(255, 255, 255, 0.6)", // Light overlay for contrast
    paddingVertical: 30,
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
    height: 50,
    width: "100%",
    marginVertical: 20,
    borderWidth: 1,
    padding: 10,
    fontSize: 20,
    backgroundColor: "rgba(255, 255, 255, 0.8)", // Slight transparency for inputs
    borderRadius: 10,
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

