import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Feather";
import { TextInput } from "react-native";
import TabSelector from "../components/TabSelector";
import MultiuseCard from "../components/MultiuseCard";
import axios from "axios";


export default props => {
    const [searchString, setSearchString] = useState('');
    const [selectedTab, setSelectedTab] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const items = ["Pokemon", "Type", "Move", "Ability"];
    const [arrayOfContent, setArrayOfContent] = useState([]);

    const selectTab = (item) => {
        setSelectedTab(item);
    };

    useEffect(() =>{
        if (searchString.length != 0) {
            setError('');
            setIsLoading(true);
            axios.get(`https://pokeapi.co/api/v2/${items[selectedTab].toLowerCase()}/${searchString.toLowerCase().replace(/ /g, "-")}`)
                .then((res) => {
                    if (items[selectedTab] == "Ability" || items[selectedTab] == "Type") {
                            setArrayOfContent(res.data.pokemon);
                    } else if (items[selectedTab] == "Move") {
                            setArrayOfContent(res.data.learned_by_pokemon);
                    }

                    setIsLoading(false);
                })
                .catch((err) => {
                    if (err.response.status == 404) {
                        setError("Not found.");
                        console.log("err")
                    } else {
                        setError("Internal error.");
                    }
                })
                setIsLoading(false);
            }

        } ,[searchString]);

        const navigateToCharacter = (url) => {
            console.log(url)
            props.navigation.push("Pokemon", url);
           
        };

    return (
        <View style={styles.container}>
            <View style={styles.inputContainer}>
                <Icon size={30} name="search" color="#000" />
                <TextInput style={styles.input} value={searchString} onChangeText={(text) => setSearchString(text)} placeholder="Search for a resource." />
            </View>
            <TabSelector items={items} onPress={selectTab} />

            {  arrayOfContent.length > 0 && (items[selectedTab] == "Ability" || items[selectedTab] == "Type") ?
                arrayOfContent.map((item, index)=>
                (<MultiuseCard key={index} text={item.pokemon.name} urlToFetch={item.pokemon.url} contentType={contentType} title={title} onPress={navigateToCharacter} />)
                )
                
                : false
            }

            {  arrayOfContent.length > 0 && items[selectedTab] == "Move"?
                arrayOfContent.map((item, index)=>
                (<MultiuseCard key={index} text={item.name} urlToFetch={item.url} contentType={contentType} title={title} onPress={navigateToCharacter} />)
                )
                
                : false
            }   

            {
                arrayOfContent.length == 0 && !isLoading ? (<Text style={{marginVertical: 20}}>No content to show.</Text>) : false
            }  
            {
                isLoading ? (<Text style={{marginVertical: 20}}>Loading...</Text>) : false
            }  
        </View>
    );
}

const styles= StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
    },
    inputContainer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        width: "90%", 
        backgroundColor: "blue",
        borderRadius: 10,
        padding: 6,
        margin: 8,
        backgroundColor: "#cdd0d4"
    },
    input: {
        flex: 1,
        height: "100%",
        marginLeft: 5,
        color: "#000",
        fontSize: 16
    }

});