import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React from "react";

export default function LoginScreen({navigation}) {
  const navigateToHome = () => {
    navigation.navigate("Home");
  };
  const navigateToRegister = () => {
    navigation.navigate("Home");
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Sign In</Text>
      </View>
      {/* <View> */}
        <Text>Email address</Text>
        <TextInput style={styles.input} placeholder="enter email" />
        <Text>Password</Text>
        <TextInput style={styles.input} placeholder="enter password" />
        <TouchableOpacity style={styles.btnContainer} onPress={navigateToHome}>
          <Text style={styles.btnText}>Sign In</Text>
        </TouchableOpacity>
        <Text>Dont have an account? <Text onPress={navigateToRegister}>Sign Up</Text></Text>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent:"center",
    marginHorizontal: 20,
    alignItems: "left",
  },
  inputView:{
    width: "100%",
  },
  input: {
    height: 40,
    width: "100%",
    // margin: 12,
    marginVertical: 20,
    borderWidth: 1,
    padding: 10,
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
});
