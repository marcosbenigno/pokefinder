import React, { useContext } from "react";
import { StyleSheet, View, ScrollView, Text } from "react-native";
import DefaultTitle from "../components/DefaultTitle";
import MyCharacterContext from "../context/MyCharactersContext";
import Card from "../components/Card";

export default props => {
    const { data } = useContext(MyCharacterContext);

    const navigateToCharacter = (url) => { 
        props.navigation.push("Pokemon", url);
    };

    return (
        <View style={styles.container}>
            <DefaultTitle title="Your selected Pokemons" />
            <ScrollView contentContainerStyle={{felxGrow: 1, flexDirection: "row",  justifyContent: "space-evenly", alignItems: "center", flexWrap: "wrap"}} >
                {data && Object.entries(data).map((item, index) => <Card key={index} image={item[1].image} text={item[1].name} url={item[1].url} onPress={navigateToCharacter} />)}
                {data.length == 1 ? (<Text>No content to show.</Text>): false}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});