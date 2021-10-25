import React from "react";
import { StyleSheet, View, Text } from "react-native";

export default props => {

    return (
        <View style={styles.container}>
            <Text style={styles.number}>{props.number}</Text>
            <Text style={styles.label}>{props.label}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center",
        marginHorizontal: 20,
        marginTop: 10

    },
    number: {
        color: "#000",
        fontWeight: "800",
        fontSize: 30
    },
    label: {
        color: "#848484",
        fontSize: 16,
        fontWeight: "600"
    },
});