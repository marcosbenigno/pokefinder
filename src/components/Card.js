import React, { useEffect, useState } from "react"

import { TouchableOpacity, Image, Text, StyleSheet, Dimensions } from "react-native"
import { getColorFromURL } from 'rn-dominant-color';

export default props => {

    
    const [backgroundColor, setBackgroundColor] = useState('#C60B0B');
    
    useEffect(() => {
        if (props.image) {
            getColorFromURL(props.image).then(colors => {
                setBackgroundColor(colors.background)
            })
            .catch(err => console.log(err));

        }
    }, [props.image])

    const onPressFunction = () => {
        if (props.content) {
            props.onPress({...props.content, bgColor: backgroundColor});
        }
    }
    
    return (
        <TouchableOpacity style={[styles.container, { backgroundColor }]} onPress={onPressFunction}>
            <Image source={{uri: props.image}} style={styles.image} />
            <Text style={styles.text}>{props.text.replace(/-/g, " ")}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
      
        width: Dimensions.get("window").width * 0.35,
        height: Dimensions.get("window").width * 0.35,
        borderRadius: 15,
        justifyContent: "flex-end",
        alignItems: "center",
        padding: 5,
        margin: 10
    },
    image: {
        width: "100%",
        height: "70%",
        resizeMode: "contain"
    },
    text: {
        color: "#fff",
        fontWeight: "700",
        fontSize: 16,
        textTransform: "capitalize"
    }
})