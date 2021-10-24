import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity, StatusBar } from "react-native";
import Icon from "react-native-vector-icons/Feather";
import CommonStyles from "../CommonStyles";

export default props => {

    const [color, setColor] = useState(props.color ? props.color : getRandomColor());

    useEffect(() => {
        if (props.color){
            setColor(props.color);
        }
    }, [props.color])

    function getRandomColor() {
        return CommonStyles.colors[(parseInt(Math.random() * (CommonStyles.colors.length - 1)))];
    }

    function goBack() {
        props.navigation.pop();
    }

    function goToMyCharacters() {
       props.navigation.push("MyCharacters");
    }

    return (
        <View style={[styles.container, {backgroundColor: color} ]}>
            <StatusBar backgroundColor ={ color } />
            <Text style={styles.text}>{props.text}</Text>
            <View style={styles.iconsContainer}>
                <View style={styles.iconsBar}>
                    <View style={styles.leftIconsContainer}>
                        {
                            props.back && (
                                <TouchableOpacity style={styles.icon} onPress={goBack}>
                                    <Icon name="arrow-left" size={28} color="#000" />
                                </TouchableOpacity>
                            )
                        }
                    </View>

                    <View style={styles.rightIconsContainer}>
                        {props.myPokemon && 
                            (<TouchableOpacity style={styles.icon} onPress={goToMyCharacters}>
                                <Image source={require(`../../assets/characterNotSaved.png`)} style={styles.iconImage}  />
                            </TouchableOpacity>)
                            }
                    </View>
                </View>
            </View>

        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: 56,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    text: {
        fontSize: 18,
        fontWeight: "700",
        color: "#000"
    },
    iconsContainer: {
        position: "absolute",
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center"
    },
    iconsBar: {
        width: "95%",
        flexDirection: "row",
        justifyContent: "space-between"
    },
    rightIconsContainer: {
        flexDirection: "row",
        height: "100%",
        alignItems: "center"
    },
    leftIconsContainer: {
        flexDirection: "row",
        height: "100%",
        alignItems: "center"
    },
    icon: {
        width: 28,
        height: 28,
        marginRight: 8
    },
    iconImage: {
        width: 28,
        height: 28,
        resizeMode: "contain",
        margin: 0
    }


})