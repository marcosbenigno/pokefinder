import React, { useEffect, useState } from "react";
import { TouchableOpacity, Image, Text, StyleSheet, Dimensions } from "react-native";
import FastImage from 'react-native-fast-image';

import { getColorFromURL } from 'rn-dominant-color';

export default props => {

    const [backgroundColor, setBackgroundColor] = useState('#F15D53');
    
    useEffect(() => {
        if (props.image && !props.color) {
            getColorFromURL(props.image).then(colors => {
                setBackgroundColor(colors.background);
            })
            .catch(err => console.log(err));
        }
    }, [props.image]);

    const onPressFunction = () => {
        if (props.content) {
            props.onPress({...props.content, bgColor: backgroundColor});
        } else if (props.url) {
            props.onPress({url: props.url});
        }
    }
    
    return (
        <TouchableOpacity style={[styles.container, { backgroundColor: props.color || backgroundColor }]} onPress={onPressFunction}>
            <FastImage source={{uri: props.image}} style={styles.image} />
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
        resizeMode: "contain",
        aspectRatio: 1/1 
    },
    text: {
        color: "#000",
        fontWeight: "700",
        fontSize: 16,
        textTransform: "capitalize"
    }
})