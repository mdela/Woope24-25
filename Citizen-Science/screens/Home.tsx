import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import {useNavigation} from "@react-navigation/native";
import {auth} from "../firebase";


//does not exist in main team branch.

const Home = () => {
    const navigator = useNavigation();

    const handleLogout = () => {
        auth.signOut().then(() => {
            navigator.navigate("Login");
        }).catch((error) => {
            console.log(error);
        });
    }

    const ToMap = () => {
            navigator.navigate("MapHome");
    }

    const ToPinCreation = () => {
        navigator.navigate("AddPin");
    }

    const ToMapCamera = () => {
        navigator.navigate("MapCameraScreen");
    }

  return (
    <View style={styles.container}>
        <Text>Email: {auth.currentUser?.email}</Text>
    <TouchableOpacity
        onPress={handleLogout}
        style={styles.button}
    >
        <Text style={styles.buttonText}>Sign out</Text>
    </TouchableOpacity>
    <TouchableOpacity
        onPress={ToMap}
        style={styles.button}
    >
        <Text style={styles.buttonText}>Map section</Text>
    </TouchableOpacity>
    <TouchableOpacity
        onPress={ToPinCreation}
        style={styles.button}
    >
        <Text style={styles.buttonText}>Add Pin</Text>
    </TouchableOpacity>
{/* `    <TouchableOpacity
        onPress={ToMapCamera}
        style={styles.button}
    >
        <Text style={styles.buttonText}>Take A Picture</Text>
    </TouchableOpacity>` */}
    </View>
  );
};

export default Home;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        justifyContent: "center",
        padding: 20,
    },
    button: {
        backgroundColor: "blue",
        padding: 20,
        borderRadius: 5,
        marginTop: 20,
    },
    buttonText: {
        color: "white",
        fontWeight: "bold",
        fontSize: 16,
        textAlign: "center",
    },
});