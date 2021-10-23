import React from "react";
import Icon from "react-native-vector-icons/Feather";

import { TouchableOpacity, Text, StyleSheet, Dimensions, View } from "react-native"

export default props => {

    
    return (
        <TouchableOpacity style={[styles.container, { backgroundColor: props.color || "#C60B0B" }]}>
            <View style={styles.iconContainer}>
            <Icon name="chevron-right" style={styles.icon} size={20} color="#000" />
            </View>    
            <Text style={styles.text}>{props.text.replace(/-/g, " ")}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
      
        width: Dimensions.get("window").width * 0.25,
        height: Dimensions.get("window").width * 0.25,
        borderRadius: 15,
        justifyContent: "space-between",
        alignItems: "center",
        padding: 5,
        margin: 10
    },
    iconContainer: {
        width: "100%",
        alignItems: "flex-end",
        padding: 2
    },
    icon: {},
    text: {
        color: "#000",
        fontWeight: "700",
        fontSize: 16, 
        textTransform: "capitalize",
        width: "100%",
        padding: 2
    }
})