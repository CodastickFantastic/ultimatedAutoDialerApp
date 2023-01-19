//Import React
import React, { createContext, useState, useEffect } from "react";

//Firebase Database Import
import database, { firebase } from "@react-native-firebase/database";

const CurrentListContext = createContext();

export function CurrentListContextProvider(props) {
  const [callList, setCallList] = useState(); // Holding all contact lists
  const [currentList, setCurrentList] = useState(""); // Holding current list
  const [dataBaseObj, setDataBaseObj] = useState(); // Holding whole STATIC Data Base Object

  //Download User Database Object
  useEffect(() => {
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
  }, []);

  //Download Database Called
  // useEffect(() => {
  //   firebase
  //     .app()
  //     .database(
  //       "https://ultimatedialerapp-default-rtdb.europe-west1.firebasedatabase.app/"
  //     )
  //     .ref(`/users/${props.userID}`)
  //     .once("value")
  //     .then((response) => response.toJSON())
  //     .then((data) => {
  //       setCallList(
  //         Object.keys(data.contactLists).map((key) => {
  //           return key;
  //         })
  //       );
  //       setDataBaseObj(data);
  //     });
  // }, []);

  return (
    <CurrentListContext.Provider
      value={{
        callList,
        setCallList,
        currentList,
        setCurrentList,
        dataBaseObj,
      }}
    >
      {props.children}
    </CurrentListContext.Provider>
  );
}

export default CurrentListContext;
