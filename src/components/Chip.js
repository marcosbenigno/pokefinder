import React from "react";

import { StyleSheet, Text, TouchableOpacity } from "react-native";
import Icon from 'react-native-vector-icons/dist/Feather';

export default props => {
    return (
        <TouchableOpacity style={[styles.container, { backgroundColor: props.color || "#C60B0B", }]}>
            <Text style={styles.text}>{props.text}</Text>
            <Icon name="chevron-right" style={styles.icon} size={20} color="#000" />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {

        paddingVertical: 5,
        paddingHorizontal: 15,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderRadius: 100,
        margin: 5
        
    },
    text: {
        color: "#000",
        fontSize: 16,
        fontWeight: "700",
        textTransform: "capitalize"

    },
    icon: {
  
    }
})