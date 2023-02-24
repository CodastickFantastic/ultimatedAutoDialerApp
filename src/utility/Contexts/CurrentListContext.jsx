//Import React
import React, { createContext, useState, useEffect } from "react";

//Firebase Database Import
import database, { firebase } from "@react-native-firebase/database";

const CurrentListContext = createContext();

export function CurrentListContextProvider(props) {
  const [callList, setCallList] = useState(); // Holding all contact lists
  const [currentList, setCurrentList] = useState(""); // Holding current list
  const [dataBaseObj, setDataBaseObj] = useState(); // Holding whole STATIC Data Base Object
  const [userStats, setUserStats] = useState(); // Holding User Stats

  useEffect(() => {
    //Download User Database Object
    firebase
      .app()
      .database(
        "https://ultimatedialerapp-default-rtdb.europe-west1.firebasedatabase.app/"
      )
      .ref(`/users/${props.userID}`)
      .once("value")
      .then((response) => response.toJSON())
      .then((data) => {
        setCallList(
          Object.keys(data.contactLists).map((key) => {
            return key;
          })
        );
        setDataBaseObj(data);
      });

    //Download User Stats
    firebase
      .app()
      .database(
        "https://ultimatedialerapp-default-rtdb.europe-west1.firebasedatabase.app/"
      )
      .ref(`/users/${props.userID}/stats`)
      .on("value", (response) => {
        let data = response.toJSON();
        setUserStats(data);
      });
  }, []);

  return (
    <CurrentListContext.Provider
      value={{
        callList,
        setCallList,
        currentList,
        setCurrentList,
        dataBaseObj,
        userStats,
      }}
    >
      {props.children}
    </CurrentListContext.Provider>
  );
}

export default CurrentListContext;
