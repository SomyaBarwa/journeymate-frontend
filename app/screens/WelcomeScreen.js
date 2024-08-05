import { View, Text, TouchableOpacity, StyleSheet, Image, ImageBackground, SafeAreaView } from 'react-native';
import React from 'react';

export default function WelcomeScreen({ navigation }) {
    const navigateTo = () => {
        navigation.navigate('Login');
    }
    return (
        <SafeAreaView style={styles.container2}>
            <View style={styles.headerContainer}>
                <Text style={styles.header}>Welcome</Text>
                <Text style={styles.header}>Journey Mate</Text>
            </View>

            <Image source={require('../assets/Carpool.png')} style={styles.getImage} resizeMode="contain" />
            <View style={styles.footerContainer}>
                <TouchableOpacity style={styles.btnContainer} onPress={navigateTo}>
                    <Text style={styles.btnText}>Get Started</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView >
    );
}

const styles = StyleSheet.create({
    container2: {
        flex: 1,
        alignItems: 'center',
        justifyContent: "space-between",
        backgroundColor: '#dce7f7',
        flexDirection: "column",
    },
    headerContainer:{
        height: 100,
        width: '100%',
        marginTop: 100,
    },
    footerContainer: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        height: 150,
        backgroundColor: '#fff',
        borderTopLeftRadius: 100,
        borderTopRightRadius: 100,
        alignItems: "center",
        justifyContent: 'center',
    },
    header: {
        color: '#2e2e2e',
        textAlign: 'center',
        fontSize: 50,
        fontWeight: 'bold',
    },
    getImage: {
        flex: 1,
        justifyContent: "center",
        zIndex: -1,
        padding: 0,
        width: "100%",
        // height: "100%",

    },
    btnContainer: {
        padding: 15,
        backgroundColor: '#3B71F3',
        borderRadius: 15,
        width: "90%",
        // marginBottom: 10,
    },
    btnText: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 25,
    },
});
