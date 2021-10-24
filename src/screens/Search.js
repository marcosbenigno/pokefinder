import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Feather";
import { TextInput } from "react-native";
import TabSelector from "../components/TabSelector";
import MultiuseCard from "../components/MultiuseCard";
import axios from "axios";
import CommonStyles from "../CommonStyles";


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
            console.log(`https://pokeapi.co/api/v2/${items[selectedTab].toLowerCase()}/${searchString.toLowerCase().replace(/ /g, "-")}`)
            axios.get(`https://pokeapi.co/api/v2/${items[selectedTab].toLowerCase()}/${searchString.toLowerCase().replace(/ /g, "-")}`)
                .then((res) => {
                    if (items[selectedTab] == "Pokemon") {
                            setArrayOfContent({...res.data, urlToFetch: `https://pokeapi.co/api/v2/${items[selectedTab].toLowerCase()}/${searchString.toLowerCase().replace(/ /g, "-")}`});
                           
                     
                    } else if (items[selectedTab] == "Type" || items[selectedTab] == "Move" || items[selectedTab] == "Ability") {
                        setArrayOfContent({...res.data, urlToFetch: `https://pokeapi.co/api/v2/${items[selectedTab].toLowerCase()}/${searchString.toLowerCase().replace(/ /g, "-")}`});
                    }

                    setIsLoading(false);
                })
                .catch((err) => {
                    if (err.response.status == 404) {
                        setError("Not found.");
                        setArrayOfContent({});

                        console.log("err")
                    } else {
                        setError("Internal error.");
                        setArrayOfContent({});
                    }
                })
                setIsLoading(false);
            }

        } ,[searchString]);

        const navigateToCharacter = (url) => {
            console.log(url)
            props.navigation.push("Pokemon", url);
           
        };

        const getRandomColor = () => {
            return CommonStyles.colors[(parseInt(Math.random() * (CommonStyles.colors.length - 1)))];
        }

        const navigateToDetail = (data) => { 
            props.navigation.push("Detail", {data});
          };

    return (
        <View style={styles.container}>
            <View style={styles.inputContainer}>
                <Icon size={30} name="search" color="#000" />
                <TextInput style={styles.input} value={searchString} onChangeText={(text) => setSearchString(text)} placeholder="Search for a resource." />
            </View>
            <TabSelector items={items} onPress={selectTab} />



            {  arrayOfContent.name && (items[selectedTab] == "Pokemon") ?
                
                (<MultiuseCard text={arrayOfContent.name} urlToFetch={arrayOfContent.urlToFetch} color={getRandomColor()} onPress={navigateToCharacter} />)
                
                
                : false
            }



            {   arrayOfContent.name && (items[selectedTab] == "Type") ?
                
                (<MultiuseCard text={arrayOfContent.name} contentType={items[selectedTab]} onPress={navigateToDetail} urlToFetch={arrayOfContent.urlToFetch} data={arrayOfContent} title="Type" color={getRandomColor()}/>)
                
                
                : false
            }


{           arrayOfContent.name && (items[selectedTab] == "Move") ?
                
                (<MultiuseCard text={arrayOfContent.name} contentType={items[selectedTab]} onPress={navigateToDetail} urlToFetch={arrayOfContent.urlToFetch} data={arrayOfContent} title="Move" color={getRandomColor()}/>)
                
                
                : false
            }

{           arrayOfContent.name && (items[selectedTab] == "Ability") ?
                
                (<MultiuseCard text={arrayOfContent.name} contentType={items[selectedTab]} onPress={navigateToDetail} urlToFetch={arrayOfContent.urlToFetch} data={arrayOfContent} title="Ability" color={getRandomColor()}/>)
                
                
                : false
            }

            {
                !arrayOfContent.name && !isLoading ? (<Text style={{marginVertical: 20}}>No content to show.</Text>) : false
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