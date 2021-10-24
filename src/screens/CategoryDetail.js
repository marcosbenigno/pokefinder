import React, { useState, useEffect } from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  useWindowDimensions
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
    const [urlToFetch, setUrlToFetch] = useState();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(()=> {
        console.log(props.route.params.data.url)
        if (urlToFetch) {
            setIsLoading(true);
            if (title == "Ability" || title == "Type") {
                axios.get(urlToFetch).then((res)=>{
                    setArrayOfContent(res.data.pokemon);
                    setIsLoading(false);
                })    
            } else if (title == "Move") {
                axios.get(urlToFetch).then((res)=>{
                    setArrayOfContent(res.data.learned_by_pokemon);
                    setIsLoading(false);
                })   
            }
        }
    }, [urlToFetch]);

    useEffect(()=>{
        setUrlToFetch(props.route.params.data.url || props.route.params.data.content.url || props.route.params.url || props.route.url, props.route.params.data.url);
    }, [])


    const navigateToCharacter = (url) => {
        props.navigation.push("Pokemon", url);   
    };

    const getRandomColor = () => {
        return CommonStyles.colors[(parseInt(Math.random() * (CommonStyles.colors.length - 1)))];
    }

    return (
        <View style={styles.container}>
            <DefaultTitle title={`${title}: ${contentType}`} />
            <SubtitleDefault subtitle={`Pokemons with this feature:`} />
            <ScrollView contentContainerStyle={{felxGrow: 1, flexDirection: "row",  justifyContent: "space-evenly", alignItems: "center", flexWrap: "wrap"}}>

            {  arrayOfContent.length > 0 && (title == "Ability" || title == "Type") ?
                arrayOfContent.map((item, index)=>
                (<MultiuseCard key={index} text={item.pokemon.name} urlToFetch={item.pokemon.url} contentType={contentType} title={title} color={getRandomColor()} onPress={navigateToCharacter} />)
                )
                
                : false
            }

            {  arrayOfContent.length > 0 && title == "Move"?
                arrayOfContent.map((item, index)=>
                (<MultiuseCard key={index} text={item.name} urlToFetch={item.url} contentType={contentType} title={title} color={getRandomColor()} onPress={navigateToCharacter} />)
                )
                
                : false
            }   

            {
                arrayOfContent.length == 0 && !isLoading ? (<Text style={{marginVertical: 20}}>No content to show.</Text>) : false
            }  
            {
                isLoading ? (<Text style={{marginVertical: 20}}>Loading...</Text>) : false
            }  
            </ScrollView>
        </View>
    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },

})