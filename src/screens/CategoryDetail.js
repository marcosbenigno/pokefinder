import React, { useState, useEffect } from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity
} from 'react-native';

import axios from 'axios';

import DefaultTitle from '../components/DefaultTitle';
import SubtitleDefault from '../components/SubtitleDefault';
import CommonStyles from '../CommonStyles';
import Card from '../components/Card';


export default (props) => {
    const [title, setTitle] = useState(props.route.params.data.title);
    const [contentType, setContentType] = useState(props.route.params.data.contentType);
    const [arrayOfContent, setArrayOfContent] = useState([]);
    const [arrayToDisplay, setArrayToDisplay] = useState([]);
    const [urlToFetch, setUrlToFetch] = useState(props.route.params.data.url);
    const [isLoading, setIsLoading] = useState(false);
    const [offset, setOffset] = useState(0);
    const [randomColors, setRandomColors] = useState();

    useEffect(()=> {
        if (urlToFetch) {

            setIsLoading(true);
            axios.get(urlToFetch)
                .then((res)=>{
                    
                    if (title == "Ability" || title == "Type") {
                        setArrayOfContent(res.data.pokemon);
                    } else if (title == "Move") {
                        setArrayOfContent(res.data.learned_by_pokemon);
                    } else if (title == "Held Items") {
                        setArrayOfContent(res.data.held_by_pokemon);
                    }
                    setIsLoading(false);
                })
                .catch((res)=>{console.log(err)});
            }    
    }, [urlToFetch]);

    useEffect(()=>{
        if (arrayOfContent.length > 0) {
            repopulateDisplayArray(5);
            getArrayOfColors(arrayOfContent && arrayOfContent.length);
        }
    }, [arrayOfContent]);


    const navigateToCharacter = (url) => {
        props.navigation.push("Pokemon", url);   
    };

    const repopulateDisplayArray = (numberOfElements) => {
        if (arrayOfContent && offset < arrayOfContent.length) {
            let selectLastElement = 
                offset + numberOfElements > arrayOfContent.length ? 
                    arrayOfContent.length : offset + numberOfElements;
                    
            setArrayToDisplay([...arrayToDisplay, ...arrayOfContent.slice(offset, selectLastElement)]);
            setOffset(selectLastElement);
        }
    };

    const getArrayOfColors = (n) => {
        let i = 0;
        let array = [];
        while(i<n) {
          array.push(CommonStyles.colors[parseInt(Math.random() * (CommonStyles.colors.length - 1))]);
          i++;
        }
        setRandomColors(array);
      }

    return (
        <View style={styles.container}>
            <DefaultTitle title={`${title}: ${contentType}`} />
            <SubtitleDefault subtitle={`Pokemons with this feature:`} />
            <ScrollView contentContainerStyle={{flexGrow: 1, justifyContent: "flex-start", alignItems: "center", width: "100%"}}>
                <View style={styles.itemsContainer}>
                    {
                        arrayToDisplay.length > 0 && (title == "Ability" || title == "Type" || title == "Held Items") ?
                        arrayToDisplay.map((item, index)=>
                            (<Card 
                                key={index}
                                url={item.pokemon.url}
                                text={item.pokemon.name}
                                image={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${item.pokemon.url.match(/\/([^\/]+)\/?$/)[1]}.png`} 
                                onPress={navigateToCharacter}
                                color={randomColors[index]}
                            />)
                            )
                            : false                    
                    }

                    {
                        arrayToDisplay.length > 0 && title == "Move"?
                        arrayToDisplay.map((item, index)=>
                            (<Card 
                                key={index} 
                                text={item.name} 
                                url={item.url} 
                                image={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${item.url.match(/\/([^\/]+)\/?$/)[1]}.png`} 
                                onPress={navigateToCharacter} 
                                color={randomColors[index]}
                                />)
                            )
                        : false
                    }      

                    {
                        arrayOfContent.length == 0 && !isLoading ?
                         (<Text style={styles.message}>No content to show.</Text>) : false
                    }

                    {
                        isLoading ? (<Text style={styles.message}>Loading...</Text>) : false
                    }  
                    {
                        arrayOfContent && offset < arrayOfContent.length && !isLoading ?
                            (<View style={styles.buttonContainer}>
                                <TouchableOpacity style={styles.button}
                                    onPress={()=>{repopulateDisplayArray(5)}}>
                                    <Text style={styles.textButton}>Show more</Text>
                                </TouchableOpacity>
                            </View>)
                            :
                            <Text style={styles.message}>End of list.</Text>
                    }
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    itemsContainer: { 
        flexDirection: "row",  
        justifyContent: "center", 
        flexWrap: "wrap", 
        width: "90%"
    },
    buttonContainer: {
        width: "100%",
        justifyContent: "center",
        alignItems: "center"
    },
    button: {
        backgroundColor: "#7FADD1",
        padding: 10,
        borderRadius: 10,
        height: 44,
        justifyContent: "center",
        alignItems: "center"
    },
    textButton: {
        fontSize: 18,
        fontWeight: "700",
        color: "#000"
    },
    message: {
        marginVertical: 20,
        width: "100%", 
        textAlign: "center"
    }
});