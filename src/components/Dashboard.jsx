// Import React
import React, { useEffect, useState, useContext } from "react";
import { Text, View, StyleSheet, Image, Button } from "react-native";

// Dropdown Selector
import SelectDropdown from "react-native-select-dropdown";

// Firebase Database Import
import database, { firebase } from "@react-native-firebase/database";

// Import Context
import CurrentListContext from "../utility/Contexts/CurrentListContext";

function Dashboard(props) {
  const feedbackOptions = ["Called", "Not answer", "Lead", "Calendar"];
 
  const { currentList, dataBaseObj } = useContext(CurrentListContext);

  

  // function getContacts() {
  //   firebase
  //     .app()
  //     .database(
  //       "https://ultimatedialerapp-default-rtdb.europe-west1.firebasedatabase.app/"
  //     )
  //     .ref(`/users/${props.userID}/contactLists/${callingList}`)
  //     .once("value")
  //     .then(response => response.toJSON())
  //     .then(data => console.log(data))
  // }
  // console.log(dataBaseObj.contactLists.Facebook);
  if (dataBaseObj) {
    for (contact in dataBaseObj.contactLists.Facebook) {
      console.log(contact, dataBaseObj.contactLists.Facebook[contact].number);
    }
  }

  return (
    <View style={styles.componentContainer}>
      <View style={styles.userGreeting}>
        <Image style={styles.userAvatar} source={{ uri: props.avatar }} />
        <View>
          <Text style={styles.userName}>Hi {props.userName}, </Text>

          {currentList == "" ? (
            <Text>Go to settings and pick a list to start calling</Text>
          ) : (
            <Text>
              you have <Text tyle={{ color: "#24A0ED" }}>128</Text> contact to
              call in list{" "}
              <Text style={{ color: "#24A0ED" }}>{currentList}</Text>
            </Text>
          )}
        </View>
      </View>
      <View style={styles.mainContent}>
        <Text>Adam Kowalski</Text>
        <Text>501 721 417</Text>
        <Button title="Make a call" />
        <SelectDropdown
          data={feedbackOptions}
          buttonStyle={{ width: "auto" }}
          buttonTextStyle={{ fontSize: 14 }}
          defaultButtonText="Select feedback..."
        />
        <Button title="Next Number" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  componentContainer: {
    height: "100%",
    alignItems: "center",
    flex: 1,
  },
  userGreeting: {
    flex: 1,
    alignItems: "center",
  },
  userAvatar: {
    marginTop: 30,
    width: 90,
    height: 90,
    borderRadius: 50,
  },
  userName: {
    fontSize: 20,
    color: "#24A0ED",
  },
  mainContent: {
    backgroundColor: "pink",
    flex: 2,
    width: 200,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Dashboard;
