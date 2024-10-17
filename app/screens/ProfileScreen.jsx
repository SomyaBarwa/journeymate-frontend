import React from 'react';
import { SafeAreaView, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native'; 
import Navbar from '../components/Navbar';

export default function PorfileScreen() {
  const navigation = useNavigation(); 

  const navigateToProfile = () => {
    navigation.navigate("Profile");
  };

  return (
    <SafeAreaView style={styles.container}>
        <Navbar/>
        <View style={styles.mainContent}>

        </View>
    </SafeAreaView>
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
        alignItems: "center",
        padding: 10,
        backgroundColor: "#f9f9f9",
        height: "100%",
      },
});
