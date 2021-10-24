
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import {
  FlatList,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  Text
} from 'react-native';

import CommonStyles from '../CommonStyles';
import Card from '../components/Card';
import Chip from '../components/Chip';
import DefaultTitle from '../components/DefaultTitle';
import SubtitleDefault from '../components/SubtitleDefault';

export default props => {

  const [suggestionCharacters, setSuggestionCharacters] = useState([]);
  const [abillities, setAbillities] = useState([]);
  const [moves, setMoves] = useState([]);
  const [types, setTypes] = useState([]);
  const [randomColors, setRandomColors] = useState([]);
  const [nextScreenDataCharacter, setNextScreenDataCharacter] = useState(null);
  const isCancelled = useRef(false);

  useEffect(()=>{
    isCancelled.current = true
    let i = 0;
    let ram = [];
    while (i < 12) {
      ram.push(getRandomColor());
      i++;
    }
    setRandomColors(ram);
    getSuggestionCharcters();
    getAbilities();
    getMoves();
    getTypes();

    return () => {
      isCancelled.current = false;
    }
  }, [])




  const getSuggestionCharcters = async () => {
    let i = 0;
    while(i<5) {
      let randomNumber = parseInt(Math.random() * (599));
      try {
      let res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${randomNumber}`)
      setSuggestionCharacters((current) => [...current, res.data])
    }
      catch (err) {
        console.log(err)
      }
        i++;
      }
  }

  const getAbilities = () => {
    let randomNumber = parseInt(Math.random() * (257));
    axios(`https://pokeapi.co/api/v2/ability/?offset=${randomNumber}&limit=8`)
      .catch(err => console.log(err))
      .then((res) => setAbillities(res.data.results));
  }

  const getMoves = () => {
    let randomNumber = parseInt(Math.random() * (117));
    axios(`https://pokeapi.co/api/v2/move/?offset=${randomNumber}&limit=8`)
      .catch(err => console.log(err))
      .then((res) => {setMoves(res.data.results);});
  }
  const getTypes = () => {
    let randomNumber = parseInt(Math.random() * (9));
    axios(`https://pokeapi.co/api/v2/type/?offset=${randomNumber}&limit=8`)
      .catch(err => console.log(err))
      .then((res) => {setTypes(res.data.results);});
  }


  const navigateToCharacter = (data) => { 
    props.navigation.push("Pokemon", {data});
  };

  const navigateToDetail = (data) => { 
    props.navigation.push("Detail", {data});
  };

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

  const navigateToSearch = () => {
    props.navigation.push("Search");
  }

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity style={{backgroundColor: "blue"}} onPress={navigateToSearch} ><Text>Busca</Text></TouchableOpacity>
      <DefaultTitle title="Recentily viewed" />
      <FlatList
        data={DATA}
        renderItem={({item}) => <Card text={item.title} image={item.image} />}
        keyExtractor={item => item.id}
        horizontal
    />

    { suggestionCharacters.length == 5 &&  (<><DefaultTitle title="Suggenstions" />
      <FlatList
        
        data={suggestionCharacters.length == 5 ? suggestionCharacters : []}
        renderItem={({item}) => <Card text={item.name} image={item.sprites.other["official-artwork"].front_default} content={item} onPress={navigateToCharacter}   />}
        keyExtractor={item => Math.random()}
        horizontal
      /></>)
  }
      
      <DefaultTitle title="Explore attributes" />
      { abillities.length > 6 && (<>
      <SubtitleDefault subtitle="Abilities" />
      <View style={{flexDirection: "row", flexWrap: "wrap"}}>
      {abillities.map((item, index) => (<Chip key={index} color={randomColors[index]} text={item.name} data={item} onPress={navigateToDetail} title={"Ability"} />)) 
      }
      </View></>)
      }

      { moves.length > 6 && (<>
      <SubtitleDefault subtitle="Moves" />
      <View style={{flexDirection: "row", flexWrap: "wrap"}}>
      {moves.map((item, index) => (<Chip key={index} color={randomColors[index+1]} text={item.name} data={item} onPress={navigateToDetail} title={"Move"} />))
        }
    </View></>)
    }

    { types.length > 6 && (<>
      <SubtitleDefault subtitle="Types" />
      <View style={{flexDirection: "row", flexWrap: "wrap"}}>
      {types.map((item, index) => (<Chip key={index} color={randomColors[index+2]} text={item.name} data={item} onPress={navigateToDetail} title={"Type"} />))
        }
    </View></>)
    }



    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});

