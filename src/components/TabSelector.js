import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";

export default props => {

    const [selected, setSelected] = useState(0);

    const onPressFunction = (item) => {
        setSelected(item);
        props.onPress(item);
    };

    return (
        <View style={styles.container}>
            {
               props.items && props.items.map((item, index) => {
                    if (index == 0) {

                        return (
                            <TouchableOpacity 
                                key={index} 
                                style={[styles.tab, { borderTopLeftRadius: 5 }, 
                                    index == selected ? 
                                    {  backgroundColor: "#cdd0d4" } : null]} 
                                onPress={() => {onPressFunction(index)}}>

                                <Text style={styles.tabText}>{item}</Text>

                        </TouchableOpacity> );

                    } else if (index == props.items.length - 1) {

                        return (
                            <TouchableOpacity 
                                key={index} 
                                style={[styles.tab, { borderTopRightRadius: 5 }, index == selected ? 
                                    {  backgroundColor: "#cdd0d4" } : null]} 
                                onPress={() => {onPressFunction(index)}}>

                                <Text style={styles.tabText}>{item}</Text>

                            </TouchableOpacity> );

                    }
                    return (
                        <TouchableOpacity 
                            key={index} 
                            style={[styles.tab, index == selected ? 
                            {  backgroundColor: "#cdd0d4" } : null]} 
                            onPress={() => {onPressFunction(index)}}>

                            <Text style={styles.tabText}>{item}</Text>
                        </TouchableOpacity> );         
                })
            }
    
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: "85%",
        height: 50,
        borderWidth: 2,
        borderColor: "#cdd0d4",
        borderRadius: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
   
    },
    tab: {
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
        flex: 1
    },
    tabText: {
        textAlign: "center"
    }
});