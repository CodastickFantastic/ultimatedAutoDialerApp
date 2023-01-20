import React, { useContext, useEffect, useState } from "react";
import { ScrollView, View, Text, StyleSheet } from "react-native";

import { firebase } from "@react-native-firebase/database";

import CurrentListContext from "../utility/Contexts/CurrentListContext";

import ContactListItem from "./ContactListItem";

function ContactList(props) {
  const { currentList } = useContext(CurrentListContext);
  const [dataBase, setDataBase] = useState();

  useEffect(() => {
    if (currentList != "") {
      firebase
        .app()
        .database(
          "https://ultimatedialerapp-default-rtdb.europe-west1.firebasedatabase.app/"
        )
        .ref(`/users/${props.userID}/contactLists/${currentList}/contacts`)
        .on("value", (response) => {
          data = response.toJSON();
          data = Object.entries(data);

          componentsDataArray = data.map((contact) => {
            return (
              <ContactListItem
                name={contact[0]}
                number={contact[1].number}
                lastCall={contact[1].called}
                feedback={contact[1].feedback}
                key={Math.random() * 100000000000}
              />
            );
          });
          setDataBase(componentsDataArray);
        });
    }
  }, [currentList]);

  return (
    <View style={styles.componentContainer}>
      {currentList == "" ? (
        <View style={styles.userGreeting}>
          <Text style={{ marginBottom: 10, textAlign: "center" }}>
            Go to settings, pick "list to call" and come here back to see all
            contacts in choosen list.
          </Text>
          <Text style={{ textAlign: "center" }}>
            If you dont have any lists you have to add it via Web Browser under
            https://www.ultiamteautodialer.com/
          </Text>
        </View>
      ) : (
        <ScrollView contentContainerStyle={{ padding: 10 }}>
          {dataBase}
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  componentContainer: {
    padding: 20,
    alignContent: "center",
    justifyContent: "center",
    flex: 1,
    backgroundColor: "#d9d9d9",
  },
});

export default ContactList;
