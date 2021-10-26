
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Toast from 'react-native-toast-message';

import Home from './screens/Home';
import Character from './screens/Character';
import CategoryDetail from './screens/CategoryDetail';
import Search from './screens/Search';
import CustomHeader from './components/CustomHeader';
import MyCharacters from './screens/MyCharacters';
import ShowAllAttributes from './screens/ShowAllAttributes';
import { MyCharacterProvider } from './context/MyCharactersContext';


const Stack = createNativeStackNavigator();

function App() {
  return (
    <MyCharacterProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen 
            name="Home" 
            component={Home} 
            options={{header: (props) => <CustomHeader myPokemon {...props} text="Pokefinder" /> }} />
          <Stack.Screen 
            name="Pokemon" 
            component={Character} 
            options={{headerShown: false}} />
          <Stack.Screen 
            name="Detail" 
            component={CategoryDetail} 
            options={{header: (props) => <CustomHeader back  {...props} text="Details" /> }} />
          <Stack.Screen 
            name="Search" 
            component={Search} 
            options={{header: (props) => <CustomHeader back  {...props} text="Search" /> }} />
          <Stack.Screen 
            name="MyCharacters" 
            component={MyCharacters} 
            options={{header: (props) => <CustomHeader back  {...props} text="My Pokemons" /> }} />
          <Stack.Screen 
            name="ShowAll" 
            component={ShowAllAttributes} 
            options={{header: (props) => <CustomHeader back  {...props} text="Show All" /> }} />
        </Stack.Navigator>
        <Toast ref={(ref) => Toast.setRef(ref)} />
      </NavigationContainer>
    </MyCharacterProvider>
  );
}

export default App;