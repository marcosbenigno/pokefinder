import React from "react"

import { StyleSheet, View, Text } from "react-native"


export default props => {

    return (
        <View style={styles.container}>
            <Text style={styles.text}>{props.subtitle}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        marginTop: 8,
        marginRight: 10,
        marginLeft: 20,
    },
    text: {
        color: "#000",
        fontWeight: "500",
        fontSize: 14
    }
})