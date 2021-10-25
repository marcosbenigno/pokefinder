import React from "react";
import { StyleSheet, View, Text } from "react-native";


export default props => {

    return (
        <View style={styles.container}>
            <Text style={styles.text}>{props.title.replace(/-/g, " ")}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 10,
        marginHorizontal: 10
    },
    text: {
        color: "#000",
        fontWeight: "900",
        fontSize: 24,
        textTransform: "capitalize"
    }
});