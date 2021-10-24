import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';

import CharacterName from './CharacterName';
import RoundSvg from './RoundSvg';

export default props => {

    const toggleIsCharacterSaved = () => {
        props.saveFunction(!props.isSavedState);
    };

    

    return (
        <View style={styles.container}>
            <View style={[styles.characterHeader, { backgroundColor: props.color || "#C60B0B" }]}>
                <View style={styles.header}>
                    <CharacterName name={props.name && props.name.replace(/-/g, " ")} />
                    <TouchableOpacity styles={styles.saveCharacterButton} onPress={toggleIsCharacterSaved}>
                    {props.isSavedState ? 
                        ( <Image source={require(`../../assets/characterSaved.png`)} style={styles.icon}  />)
                        :
                        ( <Image source={require(`../../assets/characterNotSaved.png`)} style={styles.icon}  />)
                    }   
                    </TouchableOpacity>
                </View>
                <Image source={{uri: props.image }} style={styles.artwork} />
            </View>
            <View style={{position: "relative", marginTop: -0.5, width: "100%", height: 49 }}>
                <RoundSvg color={props.color || "#C60B0B"} />
            </View>
        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1
    },
    characterHeader: {
        height: 350,
        width: "100%",
        justifyContent: "flex-end",
        alignItems: "center"
    },
    header: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    saveCharacterButton: {

    },
    icon: {
        height: 38, 
        width: 38, 
        resizeMode: "contain",
        margin: 10
      
    },
    artwork: {
        width: "100%",
        height: "75%",
        resizeMode: "contain"
    },

});