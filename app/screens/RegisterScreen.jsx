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
      const response = await fetch("http://192.168.1.9:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        Alert.alert("Success", "User registered successfully!");
        navigation.navigate("Login"); // Redirect to login after successful registration
      } else {
        Alert.alert("Error", data.message || "Registration failed");
      }
    } catch (error) {
      console.error("Registration Error:", error);
      Alert.alert("Error", "Something went wrong. Please try again.");
    }
  };

  return (
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
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, marginHorizontal: 20 },
  input: { height: 40, width: "100%", marginVertical: 10, borderWidth: 1, padding: 10 },
  dont: { width: "100%", marginTop: 20 },
  dontLink: { color: "#3B71F3" },
  dontText: { fontSize: 20 },
  headerContainer: { marginTop: 50, alignItems: "center", marginBottom: 30 },
  header: { fontSize: 50, fontWeight: "bold" },
  btnContainer: { padding: 15, backgroundColor: "#3B71F3", borderRadius: 15, marginTop: 20 },
  btnText: { color: "#fff", textAlign: "center", fontSize: 20 },
  placeholderText: { fontSize: 20, fontWeight: "300" },
});
