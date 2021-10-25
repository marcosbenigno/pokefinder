import React from "react";
import { StyleSheet, View, Text } from "react-native";

export default props => {

    return (
        <View style={styles.container}>
            <Text style={styles.text}>{props.name}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        margin: 10,
    },
    text: {
        color: "#000",
        fontWeight: "900",
        fontSize: 38,
        textTransform: "capitalize"
    }
})