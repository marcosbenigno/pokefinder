
import axios from 'axios';
import React, { useEffect, useRef, useState, useCallback, useContext } from 'react';
import {
  FlatList,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  Text
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

import CommonStyles from '../CommonStyles';
import Card from '../components/Card';
import Chip from '../components/Chip';
import DefaultTitle from '../components/DefaultTitle';
import SubtitleDefault from '../components/SubtitleDefault';
import MyCharacterContext from '../context/MyCharactersContext';

export default props => {

  const [suggestionCharacters, setSuggestionCharacters] = useState([]);
  const [abillities, setAbillities] = useState([]);
  const [moves, setMoves] = useState([]);
  const [types, setTypes] = useState([]);
  const [randomColors, setRandomColors] = useState([]);
  const isCancelled = useRef(false);
  const [randomNumbers ,setRandomNumbers] = useState();
  const { updateMyCharacters } = useContext(MyCharacterContext);

  useEffect(()=>{
    isCancelled.current = true
    let i = 0;
    let ram = [];
    while (i < 12) {
      ram.push(getRandomColor());
      i++;
    }
    setRandomColors(ram);
    if (isCancelled) {
      getRandomNumbers(5);
      getAbilities();
      getMoves();
      getTypes();
      updateMyCharacters();
      
    }

    return () => {
      setSuggestionCharacters([]);
    }
  }, []);

  useEffect( ()=>{

    getSuggestionCharacters();
  }, [randomNumbers]);

  const getSuggestionCharacters = useCallback(async () => {
    if (randomNumbers) {
      let i = 0;
      while (i < randomNumbers.length) {
        try {
          let res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${randomNumbers[i]}`);
            setSuggestionCharacters((current) => [...current, res.data]);
            console.log(res.data.name)
          
        } catch (err) {
          console.log(err)
        }
        i++; 
      }
    }
    
  }, [randomNumbers]);

  const getRandomNumbers = (n) => {
    let i = 0;
    let array = [];
    while(i<n) {
      array.push(parseInt(Math.random() * (588)));
      i++;
    }
    setRandomNumbers(array);
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

  const getRandomColor = () => {
    return CommonStyles.colors[(parseInt(Math.random() * (CommonStyles.colors.length - 1)))];
  }

  const navigateToSearch = () => {
    props.navigation.push("Search");
  }

  return (
  
    <ScrollView  contentContainerStyle={styles.container}>
      <View style={styles.searchButtonContainer}>
        <TouchableOpacity style={styles.searchButton} onPress={navigateToSearch} >
          <Icon name="search" color="#000" size={20} />
          <Text style={styles.searchButtonText}>Search for a resource.</Text>
        </TouchableOpacity>
      </View>

    { suggestionCharacters.length > 0 &&  (<><DefaultTitle title="Suggenstions" />
      <FlatList
        
        data={suggestionCharacters.length > 0 ? suggestionCharacters : []}
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
    flexGrow: 1
  },
  searchButtonContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center"
  },
  searchButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "90%", 
    borderRadius: 10,
    padding: 6,
    margin: 8,
    backgroundColor: "#cdd0d4"
  },
  searchButtonText: {
    fontSize: 16,
    marginHorizontal: 5
  }
});