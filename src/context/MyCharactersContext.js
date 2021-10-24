import React, { createContext, useState } from "react";

import { Storage } from "expo-storage";

const MyCharacterContext = createContext({});

export const MyCharacterProvider = props => {

    const [data, setData] = useState({});

    const insertCharacter = (id, character) => {
            let localData = {...data, [id]: character };
            Storage.setItem({ key: '@pokefinder_data', value: JSON.stringify(localData) }).then(_ => {console.log("salvo!")})
                .catch((err)=> {Alert.alert("Unable to save.")});   
        setData(localData);
    };

    const removeCharacter = (id) => {
        let localData = {...data};
        delete localData[id];
        Storage.setItem({ key: '@pokefinder_data', value: JSON.stringify(localData) }).then(_ => {console.log("removido!")})
        .catch((err)=> {Alert.alert("Unable to remove.");});
        setData(localData);
    };

    const updateMyCharacters = () => {
        Storage.getItem({ key: '@pokefinder_data'}).then((value) => {  
            value = value != null ? JSON.parse(value) : {};
            setData(value);
            console.log(value);
            })
            .catch((err)=> {Alert.alert("Unable to save.");});
    };

    const isMyCharacter = (id) => {
        console.log(data.hasOwnProperty(id))
        return data.hasOwnProperty(id);
    }


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
}

export default MyCharacterContext;