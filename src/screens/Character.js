import React, { useState, useEffect } from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  useWindowDimensions
} from 'react-native';
import PagerView from 'react-native-pager-view';
import { AnimatedCircularProgress } from 'react-native-circular-progress';

import axios from 'axios';
import { getColorFromURL } from 'rn-dominant-color';



import Chip from '../components/Chip';
import CardMoves from '../components/CardMoves';
import VerticalIndicator from '../components/VerticalIndicator';
import PaginationManager from '../components/PaginationManager';
import CharacterHeader from '../components/CharacterHeader';


export default props => {
    const [characterPic, setCharacterPic] = useState("https://color-hex.org/colors/c60b0b.png");
    const [mainColor, setMainColor] = useState('#C60B0B');

    const [data, setData] = useState(null);
    const [currentPage, setCurrentPage] = useState(0);

    const { height } = useWindowDimensions();

    useEffect(()=> {
        axios.get("https://pokeapi.co/api/v2/pokemon/385/").then((res)=>{
            setData(res.data);
            setCharacterPic(res.data.sprites.other["official-artwork"].front_default);
            //console.log(res.data.types.type.name)//url)
        })
        .catch((err)=>console.log(err))
    }, [])
    
    useEffect(() => {
        if (characterPic) {
            getColorFromURL(characterPic).then(colors => {
                setMainColor(colors.primary)
            })
            .catch(err => console.log(err));

        }
    }, [characterPic])

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

    return (
        <ScrollView style={styles.container}>
           <CharacterHeader name={data && data.name} color={mainColor} image={characterPic} />

            <PaginationManager number={4} selectedPage={currentPage} color={mainColor} />

            <PagerView 
                onPageSelected={selectedPage} 
                    style={{ flex:1, width: "100%", height: height - 350, zIndex: -1}} 
                        initialPage={0}>

                {/*page 1*/}
                <View key="0">
                    <Text style={styles.sectionTitle}>About</Text>
                    <View style={styles.listItem}>
                        <Text style={styles.label}>Name</Text>
                        <Text style={styles.text}>{data && data.name.replace(/-/g, " ")}</Text>
                    </View>
                    <View style={styles.listItem}>
                        <Text style={styles.label}>Types</Text>
                        <View style={{flexDirection: "row", flexWrap: "wrap"}}>
                            {data && data.types.map((item, index) => (<Chip key={`${Math.random()}`} color={mainColor} text={item.type.name.replace(/-/g, " ")} />))        
                            }
                        </View>
                    </View>
                    <View style={styles.listItem}>
                        <Text style={styles.label}>Abilities</Text>
                        <View style={{flexDirection: "row", flexWrap: "wrap"}}>
                            {data && data.abilities.map((item, index) => (<Chip key={`${Math.random()}`} color={mainColor} text={item.ability.name.replace(/-/g, " ")} />))        
                                }
                        </View>
                    </View>

                    <View style={styles.listItem} >
                        <View 
                            style={styles.indicatorContainer}>
                            <VerticalIndicator number={data && data.height} label="Height" />
                            <VerticalIndicator number={data && data.weight} label="Weight" />
                            <VerticalIndicator number={data && data.order} label="Order" />
                            <VerticalIndicator number={data && data.base_experience} label="Base Experience" />
                        </View>
                    </View>

                </View>

                {/*page 2*/}
                <View style={{flexGrow: 1 }} key="1">
                    <Text style={styles.sectionTitle}>Moves</Text>
                    <ScrollView nestedScrollEnabled={true} >
                        
                        <View style={{flexDirection: "row",  justifyContent: "space-evenly", alignItems: "center", flexWrap: "wrap"}}>
                            {data && sortMovesArray(data.moves).map((item, index) => (<CardMoves key={`${Math.random()}`} color={mainColor} text={item.move.name} />))        
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
                            {data && data.held_items.map((item, index) => (<CardMoves key={`${Math.random()}`} color={mainColor} text={item.item.name} />))}       
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