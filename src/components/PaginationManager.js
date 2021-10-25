import React from "react";
import { View, StyleSheet } from "react-native";

import Icon from "react-native-vector-icons/Feather";

export default props => {
    return (
        <View style={styles.container}>
            {
                Array(props.number).fill(0).map((item, index) => 
                    (<View key={index} style={[styles.circle, index === props.selectedPage ? {backgroundColor: props.color || "#000"} :  { borderWidth: 2, borderColor: props.color, backgroundColor: "#fff" }]} />)
                )
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
        height: 30,
    },
    circle: {
        width: 10,
        height: 10,
        borderRadius: 5,
        margin: 5
    }

})