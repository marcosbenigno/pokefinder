import React, { createContext, useState } from "react";

import { Storage } from "expo-storage";

const MyCharacterContext = createContext({});

export const MyCharacterProvider = props => {

    const [data, setData] = useState({});

    const insertCharacter = (id, character) => {
        let localData = { ...data, [id]: character };
        Storage.setItem({ key: '@pokefinder_data', value: JSON.stringify(localData) })
            .then(_ => {
                console.log("Saved!");
                setData(localData);
        })
            .catch((err)=> {Alert.alert("Unable to save.")});   
        
    };

    const removeCharacter = (id) => {
        let localData = { ...data };
        delete localData[id];
        Storage.setItem({ key: '@pokefinder_data', value: JSON.stringify(localData) })
            .then(_ => {
                setData(localData); 
                console.log("Removed!")
            })
            .catch((err)=> {Alert.alert("Unable to remove.");});
        
    };

    const updateMyCharacters = () => {
        Storage.getItem({ key: '@pokefinder_data'})
            .then((value) => {  
                value = value != null ? JSON.parse(value) : {};
                setData(value);
            })
            .catch((err)=> {console.log("Unable to get characters.");});
    };

    const isMyCharacter = (id) => data.hasOwnProperty(id);
    
    return (
        <MyCharacterContext.Provider value={{
            data,
            updateMyCharacters,
            insertCharacter,
            removeCharacter,
            isMyCharacter
        }}>
            {props.children}
        </MyCharacterContext.Provider>
    )
};

export default MyCharacterContext;