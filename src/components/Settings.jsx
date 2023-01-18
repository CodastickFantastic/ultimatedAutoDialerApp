// Import React
import React, { useContext } from "react";
import { Image, StyleSheet, Text, View, Pressable } from "react-native";

// Import DropDown Selector
import SelectDropdown from "react-native-select-dropdown";

// Import Google Firebase Auth
import auth from "@react-native-firebase/auth";

// Import Context
import CurrentListContext from "../utility/Contexts/CurrentListContext";

function Settings() {
  const { callList, setCurrentList } = useContext(CurrentListContext);
  return (
    <View style={styles.componentContainer}>
      <Pressable
        style={styles.logOut}
        onPress={() =>
          auth()
            .signOut()
            .then(() => console.log("User signed out!"))
        }
      >
        <Image
          style={{ width: 50, height: 50 }}
          source={require("../images/icons/logout.png")}
        />

        <Text style={{ fontSize: 20 }}>Sing-Out</Text>
      </Pressable>
      <View style={styles.callList}>
        <Text style={{fontSize: 20, color: "#24A0ED"}}>Choose list to call:</Text>
        <SelectDropdown
          data={callList}
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
  },
  logOut: {
    borderWidth: 1,
    borderRadius: 60,
    padding: 20,
    justifyConten: "center",
    alignItems: "center",
  },
  callList: {
    alignItems: "center",
    marginTop: 20
  },
});

export default Settings;
