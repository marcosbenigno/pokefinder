import React, { useState, useEffect } from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  useWindowDimensions,
  Alert
} from 'react-native';
import PagerView from 'react-native-pager-view';
import { AnimatedCircularProgress } from 'react-native-circular-progress';

import axios from 'axios';
import { getColorFromURL } from 'rn-dominant-color';

import Chip from '../components/Chip';
import MultiuseCard from '../components/MultiuseCard';
import VerticalIndicator from '../components/VerticalIndicator';
import PaginationManager from '../components/PaginationManager';
import CharacterHeader from '../components/CharacterHeader';
import { Storage } from 'expo-storage'


export default (props) => {
    const [characterPic, setCharacterPic] = useState(null);
    const [mainColor, setMainColor] = useState(null);
    const [data, setData] = useState(null);
    const [currentPage, setCurrentPage] = useState(0);

    const { height } = useWindowDimensions();

    useEffect(()=>{

        if (props.route.params.url) {
            setDataFromUrl();
        } else if (props.route.params.data) {
            setDataFromNavigation();
        } 
    },[]);

    const setDataFromNavigation = () => {
        setCharacterPic(props.route.params.data.sprites.other["official-artwork"].front_default);
        setMainColor(props.route.params.data.bgColor);
        setData(props.route.params.data);
        addRecentlyViewed(props.route.params.data.id);
    };

    const setDataFromUrl = () => {
        axios.get(props.route.params.url)
        .then((res) => {
            setCharacterPic(res.data.sprites.other["official-artwork"].front_default);
            
            setData(res.data);
            addRecentlyViewed(res.data.id);
            getColorFromURL(res.data.sprites.other["official-artwork"].front_default).then(colors => {
                setMainColor(colors.background);
            })
            .catch((err) => setMainColor("#7FADD1"));
            
        })
        .catch((err) => console.log(err))
    };
    const sortMovesArray = (array) => {
        return array.sort((a, b) => {
            let nameA = a.move.name.toLowerCase();
            let nameB  =b.move.name.toLowerCase();
            if (nameA < nameB) {
             return -1;
            }
            if (nameA > nameB) {
             return 1;
            }
            return 0;
           });
    }

    const selectedPage = (event) => {
        setCurrentPage(event.nativeEvent.position);
    }

    const addRecentlyViewed = (id) => {
        Storage.getItem({ key: '@pokefinder_view_data'}).then((value) => {
            value = value ? JSON.parse(value).reverse() : [];
            //add if is in array
            if (!value.includes(id)) {
                value.push(id);
                
                Storage.setItem({ key: '@pokefinder_view_data', value: JSON.stringify(value) }).then(_ => {console.log("salvo!")})
                .catch((err)=> {console.log(err);});

            }
            //max 5 elements
            if (value.length > 5) {
                value.shift();
                Storage.setItem({ key: '@pokefinder_view_data', value: JSON.stringify(value.filter(e => e !== id)) }).then(_ => {console.log("removido!")})
                    .catch((err)=> {console.log(err);});
            }
        })
        .catch((err)=> {console.log(err);});
    };
    


    const saveUnsave = (save) => {
        if (save) {
            Storage.getItem({ key: '@pokefinder_data'}).then((value) => {  
                value = value != null ? JSON.parse(value) : [];
                value = [...value, data.id ];
                value = JSON.stringify(value);
                Storage.setItem({ key: '@pokefinder_data', value: value }).then(_ => {console.log("salvo!")})
                    .catch((err)=> {Alert.alert("Unable to save.")});
                })
                .catch((err)=> {Alert.alert("Unable to save.");});
        } else {
            Storage.getItem({ key: '@pokefinder_data'}).then((value) => {
                value = JSON.parse(value);
                console.log({value})
                //console.log(value)
                
                value = JSON.stringify(value.filter(e => e !== data.id));
                Storage.setItem({ key: '@pokefinder_data', value }).then(_ => {console.log("removido!")})
                    .catch((err)=> {Alert.alert("Unable to remove.");});
                })
                .catch((err)=> {Alert.alert("Unable to remove.");});
        }
    }

    const navigateToDetail = (data) => { 
        props.navigation.push("Detail", {data});
      };

    return (
        <ScrollView style={styles.container}>
          {characterPic && <CharacterHeader name={data && data.name} color={mainColor} image={characterPic} saveFunction={saveUnsave} /> }

            <PaginationManager number={4} selectedPage={currentPage} color={mainColor} />

            <PagerView 
                onPageSelected={selectedPage} 
                    style={{ flex:1, width: "100%", height: height - 350, zIndex: -1}} 
                        initialPage={0}>

                {/*page 1*/}
                <View key="0">
                    <Text style={styles.sectionTitle}>About</Text>
                    <ScrollView nestedScrollEnabled={true} >
                        <View style={styles.listItem}>
                            <Text style={styles.label}>Name</Text>
                            <Text style={styles.text}>{data && data.name.replace(/-/g, " ")}</Text>
                        </View>
                        <View style={styles.listItem}>
                            <Text style={styles.label}>Types</Text>
                            <View style={{flexDirection: "row", flexWrap: "wrap"}}>
                                {data && data.types.map((item, index) => (<Chip key={`${Math.random()}`} color={mainColor} text={item.type.name} onPress={navigateToDetail} data={item.type} title={"Type"} />))        
                                }
                            </View>
                        </View>
                        <View style={styles.listItem}>
                            <Text style={styles.label}>Abilities</Text>
                            <View style={{flexDirection: "row", flexWrap: "wrap"}}>
                                {data && data.abilities.map((item, index) => (<Chip key={`${Math.random()}`} color={mainColor} text={item.ability.name} data={item.ability} title={"Ability"} onPress={navigateToDetail} />))        
                                    }
                            </View>
                        </View>

                        <View style={styles.listItem}>
                            <View 
                                style={styles.indicatorContainer}>
                                <VerticalIndicator number={data && data.height} label="Height" />
                                <VerticalIndicator number={data && data.weight} label="Weight" />
                                <VerticalIndicator number={data && data.order} label="Order" />
                                <VerticalIndicator number={data && data.base_experience} label="Base Experience" />
                            </View>
                        </View>
                    </ScrollView>
                </View>

                {/*page 2*/}
                <View style={{flexGrow: 1 }} key="1">
                    <Text style={styles.sectionTitle}>Moves</Text>
                    <ScrollView nestedScrollEnabled={true} >
                        
                        <View style={{flexDirection: "row",  justifyContent: "space-evenly", alignItems: "center", flexWrap: "wrap"}}>
                            {data && sortMovesArray(data.moves).map((item, index) => (<MultiuseCard key={`${Math.random()}`} color={mainColor} text={item.move.name} url={item.move.url} onPress={navigateToDetail} data={item.move} title={"Move"} />))        
                                }
                                
                        </View>
                    </ScrollView>
                </View>

                {/*page 3*/}
                <View style={{flexGrow: 1, }} key="2">
                    <Text style={styles.sectionTitle}>Stats</Text>
                    <View style={{flexDirection: "row", justifyContent: "space-evenly", alignItems: "center", flexWrap: "wrap", width: "100%", height: "100%",  marginHorizontal: 10, marginBottom: 10}}>
                        { data && data.stats.map((item, index)=>(
                            <View key={index} style={{alignItems: "center", marginVertical: 15, marginHorizontal: 20}}>
                                <AnimatedCircularProgress
                                size={50}
                                width={8}
                                fill={item.base_stat}

                                tintColor={mainColor}
                                backgroundColor="#000">
                                        {(fill) => (<Text>{ fill }</Text>)}
                                </AnimatedCircularProgress>
                                <Text style={{ color: "#000", fontSize: 16, fontWeight: "700", textTransform: "capitalize"}}>{item.stat.name.replace(/-/g," ")} </Text>
                            </View>
                        ))   
                }
                    </View>

                </View>

                {/*page 4*/}
                <View style={{flexGrow: 1, }} key="3">
                    <Text style={styles.sectionTitle}>Held Items</Text>
                    <ScrollView nestedScrollEnabled={true} >
                        
                        <View style={{flexDirection: "row",  justifyContent: "space-evenly", alignItems: "center", flexWrap: "wrap"}}>
                            {data && data.held_items.map((item, index) => (<MultiuseCard key={`${Math.random()}`} color={mainColor} text={item.item.name} />))}       
                            {data && data.held_items.length === 0 ? (<Text>No items to show.</Text>) : false}
                        </View>
                    </ScrollView>
                </View>
                

            </PagerView>
        </ScrollView>
    );
}
const styles = StyleSheet.create({
    container: {
        flexGrow: 1
    },

    listItem: {
        marginHorizontal: 10,
        marginBottom: 10
    },
    label: {
        color: "#848484",
        fontSize: 16,
        fontWeight: "600"
    },
    text: {
        color: "#000",
        fontSize: 16,
        fontWeight: "800",
        textTransform: "capitalize"
    },
    sectionTitle: {
        color: "#000",
        fontWeight: "700",
        fontSize: 30,
        margin: 10
    },
    indicatorContainer: {
        flexDirection: "row", 
        justifyContent: "space-evenly", 
        alignItems: "center", 
        flexWrap: "wrap", 
        width: "100%", 
        height: "100%"
    },

    
});