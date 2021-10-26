import React from "react";
import { View, StyleSheet } from "react-native";

import Icon from "react-native-vector-icons/Feather";

export default props => {
    return (
        <View style={styles.container}>
            <View style={styles.itemsContainer}>
                {props.selectedPage != 0 && <Icon name="chevron-left" color={props.color || "#F15D53"} size={24} />}
                {
                    Array(props.number).fill(0).map((item, index) => 
                        (
                            <View key={index} 
                                style={[styles.circle, 
                                        index === props.selectedPage ? 
                                        {backgroundColor: props.color || "#F15D53"} 
                                        :  
                                        { borderWidth: 2, borderColor: props.color || "#F15D53", backgroundColor: "#fff" }]} />
                        )
                    )
                }
                {props.selectedPage != props.number - 1 && <Icon name="chevron-right" color={props.color || "#F15D53"} size={24} />}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center",

    },
    itemsContainer: {
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

});