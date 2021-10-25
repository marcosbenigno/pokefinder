import React, { useEffect, useRef, useState, useCallback, useContext } from 'react';
import {
  FlatList,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  Image
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import axios from 'axios';

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
  const [heldItems, setHeldItems] = useState([]);

  const [randomColors, setRandomColors] = useState([]);
  const [randomNumbers, setRandomNumbers] = useState();
  const [arrayMyCharacters, setArrayMyCharacters] = useState([]);
  const isCancelled = useRef(false);
 
  const { updateMyCharacters, data } = useContext(MyCharacterContext);

  useEffect(()=>{
    isCancelled.current = true
    let i = 0;
    let random = [];

    while (i < 12) {
      random.push(getRandomColor());
      i++;
    }
    setRandomColors(random);

    if (isCancelled) {
      getRandomNumbers(5);
      updateMyCharacters();
      getAbilities();
      getMoves();
      getTypes();
      getHeldItems();
    }

    return () => {
      setSuggestionCharacters([]);
    }
  }, []);

  useEffect(()=>{
    if (data) {
      setArrayMyCharacters(Object.entries(data).sort(() => 0.5 - Math.random()).slice(0,5));
    }
  },[data]);

  useEffect( ()=>{
    getSuggestionCharacters();
  }, [randomNumbers]);

  //function used this way to fetch multiple characters and try to prevent memory leak
  const getSuggestionCharacters = useCallback(async () => {
    if (randomNumbers) {
      let i = 0;
      while (i < randomNumbers.length) {
        try {
          let res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${randomNumbers[i]}`);
          setSuggestionCharacters((current) => [...current, res.data]);
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
  };

  const getAbilities = () => {
    let randomNumber = parseInt(Math.random() * (257));
    axios(`https://pokeapi.co/api/v2/ability/?offset=${randomNumber}&limit=8`)
      .catch(err => console.log(err))
      .then((res) => setAbillities(res.data.results));
  };

  const getMoves = () => {
    let randomNumber = parseInt(Math.random() * (117));
    axios(`https://pokeapi.co/api/v2/move/?offset=${randomNumber}&limit=8`)
      .catch(err => console.log(err))
      .then((res) => {setMoves(res.data.results);});
  };

  const getTypes = () => {
    let randomNumber = parseInt(Math.random() * (9));
    axios(`https://pokeapi.co/api/v2/type/?offset=${randomNumber}&limit=8`)
      .catch(err => console.log(err))
      .then((res) => {setTypes(res.data.results);});
  };

  const getHeldItems = () => {
    let randomNumber = parseInt(Math.random() * (996));
    axios(`https://pokeapi.co/api/v2/item/?offset=${randomNumber}&limit=8`)
      .catch(err => console.log(err))
      .then((res) => {setHeldItems(res.data.results);});
  };

  const navigateToCharacter = (data) => { 
    props.navigation.push("Pokemon", {data});
  };

  const navigateToCharacterWithUrl = (url) => {
    props.navigation.push("Pokemon", url);
  };

  const navigateToDetail = (data) => { 
    props.navigation.push("Detail", {data});
  };

  const getRandomColor = () => {
    return CommonStyles.colors[(parseInt(Math.random() * (CommonStyles.colors.length - 1)))];
  };

  const navigateToSearch = () => {
    props.navigation.push("Search");
  };

  const navigateToShowAll = (data) => {
    props.navigation.push("ShowAll", data);
  };

  const navigateToMyCharacters = () => {
    props.navigation.push("MyCharacters");
  };

  return (
  
    <ScrollView  contentContainerStyle={styles.container}>
      <View style={styles.searchButtonContainer}>
        <TouchableOpacity style={styles.searchButton} onPress={navigateToSearch} >
          <Icon name="search" color="#000" size={20} />
          <Text style={styles.searchButtonText}>Search for an element.</Text>
        </TouchableOpacity>
      </View>

      { suggestionCharacters.length > 0 &&  (<><DefaultTitle title="Suggestions" />
        <FlatList
          data={suggestionCharacters.length > 0 ? suggestionCharacters : []}
          renderItem={({item}) => (<Card text={item.name} image={item.sprites.other["official-artwork"].front_default} 
          content={item} 
          onPress={navigateToCharacter}   />)}
          keyExtractor={item => Math.random()}
          horizontal
        />

        <View style={styles.showMoreButtonContainer}>
          <TouchableOpacity 
            style={styles.showMoreButton} 
            onPress={() => {navigateToShowAll({
              url: "https://pokeapi.co/api/v2/pokemon/", 
              title: "All Pokemons", 
              type: "Pokemon"})}}>
            <Text style={styles.showMoreButtonText}>Show All</Text>
          </TouchableOpacity>
        </View>
        </>)
      }

      { arrayMyCharacters.length > 0 &&  (<>
        <View style={{ flexDirection: "row", alignItems: "center" }} >
          <DefaultTitle title="My Saved Pokemons" />
          <Image source={require(`../assets/characterNotSaved.png`)} style={styles.iconImage}  />
        </View>
        <FlatList
          data={arrayMyCharacters}
          renderItem={({item}) => (<Card text={item[1].name} image={item[1].image} 
          content={item[1]} 
          url={item[1].url} 
          onPress={navigateToCharacterWithUrl}   />)}
          keyExtractor={item => Math.random()}
          horizontal
        />
        <View style={styles.showMoreButtonContainer}>
          <TouchableOpacity 
            style={styles.showMoreButton} 
            onPress={navigateToMyCharacters}>
            <Text style={styles.showMoreButtonText}>Show All</Text>
          </TouchableOpacity>
        </View>
        </>)
      }
        
        <DefaultTitle title="Explore attributes" />

        { abillities.length > 6 && (<>
          <SubtitleDefault subtitle="Abilities" />
          <View style={{flexDirection: "row", flexWrap: "wrap"}}>
            {abillities.map((item, index) => (<Chip 
              key={index} 
              color={randomColors[index]} 
              text={item.name} 
              data={item} 
              urlToFetch={item.url}
              onPress={navigateToDetail} 
              title={"Ability"} />)) 
            }
          </View>
        <View style={styles.showMoreButtonContainer}>
          <TouchableOpacity 
            style={styles.showMoreButton} 
            onPress={() => {navigateToShowAll({
              url: "https://pokeapi.co/api/v2/ability/", 
              title: "All abilities", 
              type: "Ability"})}}>
            <Text style={styles.showMoreButtonText}>Show All</Text>
          </TouchableOpacity>
        </View>
        </>)
        }

        { moves.length > 6 && (<>
          <SubtitleDefault subtitle="Moves" />
            <View style={{flexDirection: "row", flexWrap: "wrap"}}>
              {moves.map((item, index) => (<Chip 
                key={index} 
                color={randomColors[index+1]} 
                text={item.name} 
                data={item} 
                urlToFetch={item.url}
                onPress={navigateToDetail} 
                title={"Move"} />))
              }
            </View>
          <View style={styles.showMoreButtonContainer}>
            <TouchableOpacity 
              style={styles.showMoreButton} 
              onPress={() => {navigateToShowAll({
                url: "https://pokeapi.co/api/v2/move/", 
                title: "All moves", 
                type: "Move"})}}>
              <Text style={styles.showMoreButtonText}>Show All</Text>
            </TouchableOpacity>
          </View></>)
        }

      { types.length > 6 && (<>
        <SubtitleDefault subtitle="Types" />
        <View style={{flexDirection: "row", flexWrap: "wrap"}}>
          {types.map((item, index) => (<Chip 
            key={index} 
            color={randomColors[index+2]} 
            text={item.name} 
            data={item} 
            urlToFetch={item.url}
            onPress={navigateToDetail} 
            title={"Type"} />))
          }
        </View>
      <View style={styles.showMoreButtonContainer}>
        <TouchableOpacity 
          style={styles.showMoreButton} 
          onPress={() => {navigateToShowAll({
            url: "https://pokeapi.co/api/v2/type/", 
            title: "All types", 
            type: "Type"})}}>
          <Text style={styles.showMoreButtonText}>Show All</Text>
        </TouchableOpacity>
      </View>
      </>)
      }

      { heldItems.length > 6 && (<>
        <SubtitleDefault subtitle="Held Items" />
          <View style={{flexDirection: "row", flexWrap: "wrap"}}>
            {heldItems.map((item, index) => (<Chip 
              key={index} 
              color={randomColors[index+1]} 
              text={item.name} 
              data={item} 
              urlToFetch={item.url}
              onPress={navigateToDetail} 
              title={"Held Items"} />))
            }
          </View>
      <View style={styles.showMoreButtonContainer}>
        <TouchableOpacity 
          style={styles.showMoreButton} 
          onPress={() => {navigateToShowAll({
            url: "https://pokeapi.co/api/v2/item/", 
            title: "All items", 
            type: "Held Items"})}}>
          <Text style={styles.showMoreButtonText}>Show All</Text>
        </TouchableOpacity>
      </View>
      </>)
      }
    </ScrollView>
  )
};

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
  },
  showMoreButtonContainer: {
    alignItems: "center", 
    justifyContent: "center", 
    marginVertical: 5
  },
  showMoreButton: {

  },
  showMoreButtonText: {

  },
  iconImage: {
    width: 28,
    height: 28,
    resizeMode: "contain",
    marginTop: 10,
}
});