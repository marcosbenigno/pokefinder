
import React from 'react';
import {
  FlatList,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';

import CommonStyles from '../CommonStyles';
import Card from '../components/Card';
import Chip from '../components/Chip';
import DefaultTitle from '../components/DefaultTitle';
import SubtitleDefault from '../components/SubtitleDefault';

export default props => {

  const DATA = [{
    id: 1,
    title: "Picachu",
    image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png"
  },
  {
    id: 2,
    title: "Picachu",
    image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/386.png"
  },
  {
    id: 3,
    title: "Picachu",
    image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/3.png"
  },
  {
    id: 4,
    title: "Picachu",
    image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/7.png"
  },
  {
    id: 5,
    title: "Picachu",
    image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/49.png"
  },
];
  const getRandomColor = () => {
    return CommonStyles.colors[(parseInt(Math.random() * (CommonStyles.colors.length - 1)))];
  }

  return (
    <ScrollView style={styles.container}>
      <DefaultTitle title="Recentily viewed" />
      <FlatList
        data={DATA}
        renderItem={({item}) => <Card text={item.title} image={item.image} />}
        keyExtractor={item => item.id}
        horizontal
      />

      <DefaultTitle title="Suggenstions" />
      <FlatList
        data={DATA}
        renderItem={({item}) => <Card text={item.title} image={item.image} />}
        keyExtractor={item => item.id}
        horizontal
      />
      
      <DefaultTitle title="Explore attributes" />
      <SubtitleDefault subtitle="Abilities" />
      <View style={{flexDirection: "row", flexWrap: "wrap"}}>
      {Array(10).fill(0).map((item, index) => (<Chip key={index} color={getRandomColor()} text="Static" />))        
      }
      </View>

      <SubtitleDefault subtitle="Moves" />
      <View style={{flexDirection: "row", flexWrap: "wrap"}}>
      {Array(10).fill(0).map((item, index) => (<Chip key={index} color={getRandomColor()} text="Static" />))        
      }
      </View>

      <SubtitleDefault subtitle="Types" />
      <View style={{flexDirection: "row", flexWrap: "wrap"}}>
      {Array(10).fill(0).map((item, index) => (<Chip key={index} color={getRandomColor()} text="Static" />))        
      }
      </View>

    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});

