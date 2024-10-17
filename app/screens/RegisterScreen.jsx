import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";

export default function RegisterScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const navigateToHome = () => {
    navigation.navigate("Home");
  };
  const navigateToLogin = () => {
    navigation.navigate("Login");
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Sign Up</Text>
      </View>
      {/* <View> */}
      <Text style={styles.placeholderText}>Username</Text>
      <TextInput
        style={styles.input}
        placeholder="Batman"
        value={username}
        onChangeText={(text) => setUsername(text)}
        required
      />
      <Text style={styles.placeholderText}>Email address</Text>
      <TextInput
        style={styles.input}
        placeholder="jogndoe@gmail.com"
        value={email}
        onChangeText={(text) => setEmail(text)}
        required
      />
      <Text style={styles.placeholderText}>Password</Text>
      <TextInput
        secureTextEntry
        style={styles.input}
        placeholder="enter password"
        value={password}
        onChangeText={(text) => setPassword(text)}
        required
      />
      <TouchableOpacity style={styles.btnContainer} onPress={navigateToHome}>
        <Text style={styles.btnText}>Sign Up</Text>
      </TouchableOpacity>
      <View style={styles.dont}>
        <Text style={styles.dontText}>
          Have an account?
          <Text style={styles.dontLink} onPress={navigateToLogin}>
            Sign In
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
  inputView: {
    width: "100%",
  },
  input: {
    height: 40,
    width: "100%",
    marginVertical: 20,
    borderWidth: 1,
    padding: 10,
    fontSize: 20,
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
    height: 100,
    width: "100%",
    marginTop: 50,
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
    // marginBottom: 10,
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
