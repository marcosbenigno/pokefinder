import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

import Icon from 'react-native-vector-icons/Feather';

export default props => {

    const onPressFunction = () => {
        props.onPress({
            contentType: props.text.replace(/-/g, " "),
            title: props.title,
            content: props.data,
            url: props.urlToFetch
        })
    };
    
    return (
        <TouchableOpacity style={[styles.container, { backgroundColor: props.color || "#F15D53", }]} onPress={onPressFunction}>
            <Text style={styles.text}>{props.text.replace(/-/g, " ")}</Text>
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