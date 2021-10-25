import React, { useState, useEffect } from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  useWindowDimensions,
  TouchableOpacity
} from 'react-native';

import axios from 'axios';
import DefaultTitle from '../components/DefaultTitle';
import SubtitleDefault from '../components/SubtitleDefault';
import MultiuseCard from '../components/MultiuseCard';
import CommonStyles from '../CommonStyles';


export default (props) => {
    const [title, setTitle] = useState(props.route.params.data.title);
    const [contentType, setContentType] = useState(props.route.params.data.contentType);
    const [arrayOfContent, setArrayOfContent] = useState([]);
    const [arrayToDisplay, setArrayToDisplay] = useState([]);
    const [urlToFetch, setUrlToFetch] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [offset, setOffset] = useState(0);
    const [randomColors, setRandomColors] = useState();

    useEffect(()=> {
        console.log({title: props.route.params.data.url})
        if (urlToFetch) {
            setIsLoading(true);
            if (title == "Ability" || title == "Type") {

                axios.get(urlToFetch)
                .then((res)=>{
                    setArrayOfContent(res.data.pokemon);
                    setIsLoading(false);
                }).catch((res)=>{console.log(err)})

            } else if (title == "Move") {
                axios.get(urlToFetch).then((res)=>{
                    setArrayOfContent(res.data.learned_by_pokemon);
                    setIsLoading(false);
                }).catch((res)=>{console.log(err)})   
            } else if (title == "Held Items") {
                console.log({"aqui": urlToFetch})
                axios.get(urlToFetch).then((res)=>{
                    setArrayOfContent(res.data.held_by_pokemon ? res.data.held_by_pokemon : []);
                   console.log({"aqui":res.data.held_by_pokemon})
                    setIsLoading(false);
                }).catch((err)=>{console.log(err)})   
            }
        }
    }, [urlToFetch]);

    useEffect(()=>{
        if (arrayOfContent.length > 0) {
        repopulateDisplayArray(10);
        console.log(arrayOfContent)
        getArrayOfColors(arrayOfContent && arrayOfContent.length);
        }
    }, [arrayOfContent]);

    useEffect(()=>{
        setUrlToFetch(props.route.params.data.url || props.route.params.data.content.url || props.route.params.url || props.route.params.data.url);
    }, [])


    const navigateToCharacter = (url) => {
        props.navigation.push("Pokemon", url);   
    };


    const repopulateDisplayArray = (numberOfElements) => {
        if (arrayOfContent && offset < arrayOfContent.length) {
            let selectLastElement = offset + numberOfElements > arrayOfContent.length ? arrayOfContent.length : offset + numberOfElements;
            setArrayToDisplay([...arrayToDisplay, ...arrayOfContent.slice(offset, selectLastElement)]);
            console.log(arrayToDisplay.length)
            setOffset(selectLastElement + 1);
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
                <View style={{ flexDirection: "row",  justifyContent: "flex-start", flexWrap: "wrap", width: "90%"}}>
            {  arrayToDisplay.length > 0 && (title == "Ability" || title == "Type") ?
                arrayToDisplay.map((item, index)=>
                (<MultiuseCard key={index} text={item.pokemon.name} urlToFetch={item.pokemon.url} contentType={contentType} title={title} color={randomColors[index]} onPress={navigateToCharacter} />)
                )
                
                : false
            }

            {  arrayToDisplay.length > 0 && title == "Move"?
                arrayToDisplay.map((item, index)=>
                (<MultiuseCard key={index} text={item.name} urlToFetch={item.url} contentType={contentType} title={title} color={randomColors[index]} onPress={navigateToCharacter} />)
                )
                
                : false
            }   

            {  arrayToDisplay.length > 0 && title == "Held Items"?
                arrayToDisplay.map((item, index)=>
                (<MultiuseCard key={index} text={item.pokemon.name} urlToFetch={item.pokemon.url} contentType={contentType} title={title} color={randomColors[index]} onPress={navigateToCharacter} />)
                )
                
                : false
            }   

            {
                arrayOfContent.length == 0 && !isLoading ? (<Text style={{marginVertical: 20, width: "100%", textAlign: "center"}}>No content to show.</Text>) : false
            }  
            {
                isLoading ? (<Text style={{marginVertical: 20, width: "100%", textAlign: "center"}}>Loading...</Text>) : false
            }  
            {arrayOfContent && offset < arrayOfContent.length && !isLoading ?
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button}onPress={()=>{repopulateDisplayArray(10)}}>
                    <Text style={styles.textButton}>Show more</Text>
                </TouchableOpacity>
            </View>
            :
            <Text style={{width: "100%", textAlign: "center"}}>End of list.</Text>
            }
            </View>
            </ScrollView>
        </View>
    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1
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
    }


})