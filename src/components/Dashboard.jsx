// Import React
import React, { useEffect, useState, useContext } from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  NativeModules,
  PermissionsAndroid,
} from "react-native";

// Dropdown Selector
import SelectDropdown from "react-native-select-dropdown";

// Import Context
import CurrentListContext from "../utility/Contexts/CurrentListContext";

function Dashboard(props) {
  // Feedback List
  const feedbackOptions = ["Called", "Not answer", "Lead", "Calendar"];

  // Context Variables
  const { currentList, dataBaseObj } = useContext(CurrentListContext);

  // Native Module Initializer - Dialer
  const { DialerModule } = NativeModules;

  function makeCall(number = "") {
    // Andoid require permision to make calls, here we ask user for that permission if it is not granted.
    async function requestCallPhonePrrmission() {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CALL_PHONE,
          {
            title: "Ultimate Dialer App Permission",
            message: "Ultimate Dialer need acces to your phone call",
            buttonNeutral: "Ask me later",
            buttonNegative: "Denied",
            buttonPositive: "Grant",
          }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          await DialerModule.makeCall(number);
        } else {
          console.log("Permission denied");
        }
      } catch (err) {
        console.log(err);
      }
    }
    requestCallPhonePrrmission();
  }

  // if (dataBaseObj) {
  //   for (contact in dataBaseObj.contactLists.Facebook) {
  //     console.log(contact, dataBaseObj.contactLists.Facebook[contact].number);
  //   }
  // }

  return (
    <View style={styles.componentContainer}>
      {currentList == "" ? (
        <View style={styles.userGreeting}>
          <Text style={{ color: "#24A0ED", fontSize: 24, textAlign: "center" }}>
            Hi {props.userName}
          </Text>
          <Text style={{ marginBottom: 10, textAlign: "center" }}>
            Go to settings, pick "list to call" and come here back.
          </Text>
          <Text style={{ textAlign: "center" }}>
            If you dont have any lists you have to add it via Web Browser under
            https://www.ultiamteautodialer.com/
          </Text>
        </View>
      ) : (
        <>
          <View style={styles.statsContainer}>
            <Text style={styles.basicFont}>Currently calling list</Text>
            <Text style={{ color: "#24A0ED", fontSize: 26 }}>
              {currentList}
            </Text>
            <View style={styles.callsInfo}>
              <View style={styles.callsInfoLeft}>
                <Text style={{ color: "#24A0ED", fontSize: 34 }}>127</Text>
                <Text style={styles.basicFont}>Done</Text>
              </View>
              <View style={styles.callsInfoRight}>
                <Text style={{ color: "#24A0ED", fontSize: 34 }}>231</Text>
                <Text style={styles.basicFont}>To Call</Text>
              </View>
            </View>
          </View>
          <View style={styles.mainContentConatiner}>
            <Text
              style={{ color: "#24A0ED", fontSize: 24, textAlign: "center" }}
            >
              Current Contact
            </Text>
            <Text
              style={{
                color: "black",
                fontSize: 28,
                marginBottom: 10,
                fontWeight: "700",
                textAlign: "center",
              }}
            >
              Adam Kowalski
            </Text>

            <Text style={styles.basicFont}>
              <Image
                source={require("../images/icons/phone.png")}
                style={{ width: 20, height: 20 }}
              />{" "}
              501 721 417
            </Text>
            <Text style={styles.basicFont}>
              <Image
                source={require("../images/icons/mail.png")}
                style={{ width: 20, height: 20 }}
              />{" "}
              adam.kowalskii@gmail.com
            </Text>
            <SelectDropdown
              data={feedbackOptions}
              buttonStyle={styles.selectDropdown}
              buttonTextStyle={{ fontSize: 26 }}
              defaultButtonText="Select feedback..."
            />
            <Text style={styles.basicFont}>Add note</Text>
            <TextInput style={styles.note} multiline={true} />
            <View style={styles.buttonSection}>
              <TouchableOpacity
                style={styles.callBtn}
                onPress={() => makeCall("+48 501 721 417")}
              >
                <Text style={styles.basicFont}>Call</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.nextBtn}>
                <Text style={styles.basicFont}>Next</Text>
              </TouchableOpacity>
            </View>
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  basicFont: {
    color: "black",
    fontSize: 22,
    textAlign: "center",
  },
  componentContainer: {
    height: "100%",
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    backgroundColor: "#d9d9d9",
  },
  statsContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  callsInfo: {
    marginTop: 20,
    width: 300,
    flexDirection: "row",
    borderWidth: 1,
    borderRadius: 20,
  },
  callsInfoLeft: {
    flex: 1,
    borderRightWidth: 1,
    alignItems: "center",
  },
  callsInfoRight: {
    flex: 1,
    alignItems: "center",
  },
  mainContentConatiner: {
    flex: 2,
    justifyContent: "center",
    alignContent: "center",
  },
  selectDropdown: {
    marginTop: 20,
    marginBottom: 20,
    width: "100%",
  },
  note: {
    backgroundColor: "white",
    marginBottom: 20,
    height: 100,
  },
  buttonSection: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  callBtn: {
    backgroundColor: "#32DE84",
    flex: 2,
    marginRight: 10,
    height: 35,
    justifyContent: "center",
    alignItems: "center",
  },
  nextBtn: {
    backgroundColor: "#24A0ED",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Dashboard;
