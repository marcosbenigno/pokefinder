import React, { useState, useEffect } from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity
} from 'react-native';
import axios from 'axios';

import Chip from '../components/Chip';
import DefaultTitle from '../components/DefaultTitle';
import CommonStyles from '../CommonStyles';



export default (props) => {
    const [arrayOfContent, setArrayOfContent] = useState([]);
    const [urlToFetch, setUrlToFetch] = useState(props.route.params.url);
    const [isLoading, setIsLoading] = useState(false);
    const [randomColors, setRandomColors] = useState([]);

    useEffect(()=>{
        fetchData();
    },[]);

    const fetchData = () => {
        
        if (urlToFetch) {
            setIsLoading(true);
            
        axios.get(urlToFetch)
            .then((res)=>{
                
                setUrlToFetch(res.data.next);

                if (randomColors.length == 0) {
                    getArrayOfColors(res.data.count);
                }
                setArrayOfContent([...arrayOfContent, ...res.data.results]);
                setIsLoading(false);
            })
            .catch((err) => {console.log(err)});
        }
    };

    const navigateToCharacter = (url) => {
        props.navigation.push("Pokemon", url);   
    };

    const getArrayOfColors = (n) => {
        let i = 0;
        let array = [];
        while(i<n) {
          array.push(CommonStyles.colors[parseInt(Math.random() * (CommonStyles.colors.length - 1))]);
          i++;
        }
        setRandomColors(array);
      };

      const navigateToDetail = (data) => { 
        props.navigation.push("Detail", {data});
      };

    return (
        <View style={styles.container}>
            <DefaultTitle title={`${props.route.params.title}:`} />
            <ScrollView contentContainerStyle={styles.scrollView}>
                <View style={styles.contentContainer}>
    
                {
                    arrayOfContent.length > 0 && arrayOfContent.map((item, index) => (
                        <Chip 
                            text={item.name} 
                            key={index} 
                            color={randomColors[index]} 
                            title={props.route.params.type} 
                            data={item}
                            urlToFetch={item.url}
                            onPress={props.route.params.type == "Pokemon" ? () => navigateToCharacter({url: item.url}) : navigateToDetail} />
                    ))
                }

                {
                    arrayOfContent.length == 0 && !isLoading ? (<Text style={styles.message}>No content to show.</Text>) : false
                }  
                {
                    isLoading ? (<Text style={styles.message}>Loading...</Text>) : false
                }  
                    
                { urlToFetch && !isLoading ?
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.button}onPress={()=>{fetchData()}}>
                            <Text style={styles.textButton}>Show more</Text>
                        </TouchableOpacity>
                    </View>
                    :
                    <Text style={styles.message}>End of list.</Text>
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
    },
    scrollView: {
        flexGrow: 1,
        justifyContent: "flex-start",
        alignItems: "center", 
        width: "100%"
    },
    contentContainer: { 
        flexDirection: "row",  
        justifyContent: "flex-start", 
        flexWrap: "wrap", 
        width: "95%"
    },
    message: {
        marginVertical: 20, 
        width: "100%", 
        textAlign: "center"
    }


})