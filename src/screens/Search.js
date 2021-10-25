import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";
import Icon from "react-native-vector-icons/Feather";
import axios from "axios";

import TabSelector from "../components/TabSelector";
import MultiuseCard from "../components/MultiuseCard";

import CommonStyles from "../CommonStyles";


export default props => {

    const [searchString, setSearchString] = useState('');
    const [selectedTab, setSelectedTab] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const items = ["Pokemon", "Type", "Move", "Ability", "Held Items"];
    const [objectResult, setobjectResult] = useState([]);

    const selectTab = (item) => {
        setSelectedTab(item);
    };

    useEffect(() =>{
        if (searchString.length != 0) {
            let resource = items[selectedTab] == "Held Items" ? "item" :  items[selectedTab];
            setError('');
            setIsLoading(true);
            let url = `https://pokeapi.co/api/v2/${resource.toLowerCase()}/${searchString.toLowerCase().replace(/ /g, "-")}`;
            axios.get(url)
                .then((res) => {
                    setobjectResult({
                        ...res.data, 
                        urlToFetch: url
                    });
                    setIsLoading(false);
                })
                .catch((err) => {
                    if (err.response.status == 404) {
                        setError("Not found.");
                        setobjectResult({});
                    } else {
                        setError("Internal error.");
                        setobjectResult({});
                    }
                });
                setIsLoading(false);
        }
    } ,[searchString]);

    const navigateToCharacter = (url) => {
        props.navigation.push("Pokemon", url);
    };

    const getRandomColor = () => {
        return CommonStyles.colors[(parseInt(Math.random() * (CommonStyles.colors.length - 1)))];
    };

    const navigateToDetail = (data) => { 
        props.navigation.push("Detail", {data});
    };

    return (
        <View style={styles.container}>
            <View style={styles.inputContainer}>
                <Icon size={30} name="search" color="#000" />
                <TextInput 
                    style={styles.input} 
                    value={searchString} 
                    onChangeText={(text) => setSearchString(text)} 
                    placeholder="Enter the name of the element." />
            </View>

            <TabSelector items={items} onPress={selectTab} />

            { objectResult.name && (items[selectedTab] == "Pokemon") ?
                (<MultiuseCard 
                    text={objectResult.name} 
                    urlToFetch={objectResult.urlToFetch} 
                    color={getRandomColor()} 
                    onPress={navigateToCharacter} />)
                : 
                false
            }

            { objectResult.name && (items[selectedTab] != "Pokemon") ?
                (<MultiuseCard 
                    text={objectResult.name} 
                    contentType={items[selectedTab]} 
                    onPress={navigateToDetail} 
                    urlToFetch={objectResult.urlToFetch} 
                    data={objectResult} 
                    title={items[selectedTab]} 
                    color={getRandomColor()}/>)
                    : false
            }

            {
                !objectResult.name && !isLoading ? (<Text style={{marginVertical: 20}}>No content to show.</Text>) : false
            }
            
            {
                isLoading ? (<Text style={{marginVertical: 20}}>Loading...</Text>) : false
            }  
        </View>
    );
};

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