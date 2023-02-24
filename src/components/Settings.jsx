// Import React
import React, { useContext } from "react";
import { Image, StyleSheet, Text, View, Button } from "react-native";

// Import DropDown Selector
import SelectDropdown from "react-native-select-dropdown";

// Import Google Firebase Auth
import auth from "@react-native-firebase/auth";

// Import Context
import CurrentListContext from "../utility/Contexts/CurrentListContext";

function Settings(props) {
  const { callList, setCurrentList } = useContext(CurrentListContext);
  return (
    <View style={styles.componentContainer}>
      <View style={styles.loggedUser}>
        <Image style={styles.userAvatar} source={{ uri: props.avatar }} />
        <Text style={{ fontSize: 22, marginBottom: 10, color: "white" }}>{props.userName}</Text>
        <Button
          title="Sing-Out"
          onPress={() =>
            auth()
              .signOut()
              .then(() => console.log("User signed out!"))
          }
        />
      </View>

      <View style={styles.callList}>
        <Text style={{ fontSize: 20, color: "#24A0ED" }}>
          Choose list to call
        </Text>
        <SelectDropdown
          data={callList}
          defaultButtonText="Select list..."
          onSelect={(selectItem, index) => {
            setCurrentList(selectItem);
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  componentContainer: {
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    backgroundColor: "#181818",
  },
  loggedUser: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  userAvatar: {
    marginTop: 30,
    width: 110,
    height: 110,
    borderRadius: 50,
    marginBottom: 10,
  },
  callList: {
    alignItems: "center",
    marginTop: 20,
    flex: 1,
  },
});

export default Settings;
