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
import { API_IP,LOGIN_PORT} from "@env";

export default function RegisterScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const handleRegister = async () => {
    if (!username || !email || !password) {
      Alert.alert("Error", "All fields are required");
      return;
    }

    try {
      const response = await fetch(`http://${API_IP}:${LOGIN_PORT}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        Alert.alert("Success", "User registered successfully!");
        navigation.navigate("Login");
      } else {
        Alert.alert("Error", data.message || "Registration failed");
      }
    } catch (error) {
      console.error("Registration Error:", error);
      Alert.alert("Error", "Something went wrong. Please try again.");
    }
  };

  return (
    <ImageBackground
      source={require("../assets/getstarted.png")} // Your background image
      style={styles.background}
      blurRadius={1} // Adjust for more or less blur
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.header}>Sign Up</Text>
        </View>
        <Text style={styles.placeholderText}>Username</Text>
        <TextInput
          style={styles.input}
          placeholder="Batman"
          value={username}
          onChangeText={setUsername}
        />
        <Text style={styles.placeholderText}>Email address</Text>
        <TextInput
          style={styles.input}
          placeholder="johndoe@gmail.com"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
        <Text style={styles.placeholderText}>Password</Text>
        <TextInput
          secureTextEntry
          style={styles.input}
          placeholder="Enter password"
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity style={styles.btnContainer} onPress={handleRegister}>
          <Text style={styles.btnText}>Sign Up</Text>
        </TouchableOpacity>
        <View style={styles.dont}>
          <Text style={styles.dontText}>
            Have an account?{" "}
            <Text style={styles.dontLink} onPress={() => navigation.navigate("Login")}>
              Sign In
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
    // backgroundColor: "rgba(255, 255, 255, 0.6)", /
    paddingVertical: 30,
  },
  input: {
    height: 50,
    width: "100%",
    marginVertical: 10,
    borderWidth: 1,
    padding: 10,
    fontSize: 18,
    backgroundColor: "rgba(255, 255, 255, 0.8)", // Slight transparency for input fields
    borderRadius: 10,
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
  headerContainer: {
    marginTop: 50,
    alignItems: "center",
    marginBottom: 30,
  },
  header: {
    fontSize: 50,
    fontWeight: "bold",
  },
  btnContainer: {
    padding: 15,
    backgroundColor: "#3B71F3",
    borderRadius: 15,
    marginTop: 20,
  },
  btnText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 20,
  },
  placeholderText: {
    fontSize: 20,
    fontWeight: "300",
  },
});
