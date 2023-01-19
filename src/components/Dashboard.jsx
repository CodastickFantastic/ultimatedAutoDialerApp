// Import React
import React, { useEffect, useState, useContext, useRef } from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  ToastAndroid,
} from "react-native";

// Dropdown Selector
import SelectDropdown from "react-native-select-dropdown";

// Import Context
import CurrentListContext from "../utility/Contexts/CurrentListContext";

// Import Firebase
import { firebase } from "@react-native-firebase/database";

// Import own Native module - dialer
import dialer from "../utility/dialer";

function Dashboard(props) {
  // Feedback List
  const feedbackOptions = ["Called", "Not answer", "Lead", "Calendar"];

  // Context Variables
  const { currentList, dataBaseObj } = useContext(CurrentListContext);

  // Handling of show database records
  // const [contactDetials, setContactDetials] = useState({name: "Adam Kowalski", number: "501 722 427", mail: "adam.kowalski@gmail.com"})
  const [contactDetials, setContactDetials] = useState({});
  const [lastToCall, setLastToCall] = useState({ initial: 0 });
  const [totalCalled, setTotalCalled] = useState();
  const [contactNumber, setContactNumber] = useState(0);
  const feedbackDropdownRef = useRef({});

  useEffect(() => {
    let convertedDataBaseArr;
    if (
      currentList != "" &&
      dataBaseObj.contactLists[currentList].contacts != undefined
    ) {
      convertedDataBaseArr = Object.entries(
        dataBaseObj.contactLists[currentList].contacts
      ); // Current database object converted to array

      convertedDataBaseArr = convertedDataBaseArr.filter(
        (record) => record[1].called === "none"
      ); // Filter out called contacts

      // Start tracking "Done" calls on Live
      firebase
        .app()
        .database(
          "https://ultimatedialerapp-default-rtdb.europe-west1.firebasedatabase.app/"
        )
        .ref(`/users/${props.userID}/contactLists/${currentList}/`)
        .on("value", (response) => {
          let data = response.toJSON();
          setTotalCalled(data.calledCounter);
        });
    }

    if (convertedDataBaseArr != undefined) {
      setContactDetials({
        name: convertedDataBaseArr[contactNumber][0],
        number: convertedDataBaseArr[contactNumber][1].number,
        mail: convertedDataBaseArr[contactNumber][1].mail,
        note: "",
      });

      if (lastToCall.initial != convertedDataBaseArr.length) {
        setLastToCall({
          initial: convertedDataBaseArr.length,
          current: convertedDataBaseArr.length,
        });
      } else {
        setLastToCall((prevNumber) => {
          return {
            ...prevNumber,
            current: prevNumber.current - 1,
          };
        });
      }
    }
  }, [currentList, contactNumber]);

  // Handling Next contact button
  function nextContact() {
    if (contactDetials.feedback !== undefined) {
      if (contactNumber < lastToCall.initial - 1) {
        setContactNumber((prevNumber) => prevNumber + 1);
        feedbackDropdownRef.current.reset();
        saveData();
        //Update Done calls counter
        firebase
          .app()
          .database(
            "https://ultimatedialerapp-default-rtdb.europe-west1.firebasedatabase.app/"
          )
          .ref(`/users/${props.userID}/contactLists/${currentList}/`)
          .update({
            calledCounter: totalCalled + 1,
          });
      } else {
        ToastAndroid.showWithGravity(
          "All contacts has been called, load another list !!!! REMEBER TO ADD SAVE OPTION HERE !!!!",
          ToastAndroid.LONG,
          ToastAndroid.CENTER
        );
        saveData();
      }
    } else {
      ToastAndroid.showWithGravity(
        "You need to select feedback first",
        ToastAndroid.LONG,
        ToastAndroid.CENTER
      );
    }
  }

  // Handling Save Feedback in database
  function saveData() {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let currentDate = new Date();
    let d = currentDate.getDay();
    let m = currentDate.getMonth();
    let y = currentDate.getFullYear();
    let h = currentDate.getHours();
    let mi = currentDate.getMinutes();
    let s = currentDate.getSeconds();
    d.toString().length == 1 ? (d = "0" + d) : (d = d);
    h.toString().length == 1 ? (h = "0" + h) : (h = h);
    mi.toString().length == 1 ? (mi = "0" + mi) : (mi = mi);
    s.toString().length == 1 ? (s = "0" + s) : (s = s);
    let date = d + "/" + months[m] + "/" + y + " - " + h + ":" + mi + ":" + s;
    // Save contact details
    firebase
      .app()
      .database(
        "https://ultimatedialerapp-default-rtdb.europe-west1.firebasedatabase.app/"
      )
      .ref(
        `/users/${props.userID}/contactLists/${currentList}/contacts/${contactDetials.name}`
      )
      .update({
        note: contactDetials.note,
        feedback: contactDetials.feedback,
        called: date,
      });
  }

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
                <Text style={{ color: "#24A0ED", fontSize: 34 }}>
                  {totalCalled}
                </Text>
                <Text style={styles.basicFont}>Done</Text>
              </View>
              <View style={styles.callsInfoRight}>
                <Text style={{ color: "#24A0ED", fontSize: 34 }}>
                  {lastToCall.current}
                </Text>
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
              {contactDetials.name}
            </Text>
            <Text style={styles.basicFont}>
              <Image
                source={require("../images/icons/phone.png")}
                style={{ width: 20, height: 20 }}
              />{" "}
              {contactDetials.number}
            </Text>
            <Text style={styles.basicFont}>
              <Image
                source={require("../images/icons/mail.png")}
                style={{ width: 20, height: 20 }}
              />{" "}
              {contactDetials.mail}
            </Text>
            <SelectDropdown
              data={feedbackOptions}
              buttonStyle={styles.selectDropdown}
              buttonTextStyle={{ fontSize: 26 }}
              defaultButtonText="Select feedback..."
              ref={feedbackDropdownRef}
              onSelect={(selectedItem, index) =>
                setContactDetials((prevState) => {
                  return { ...prevState, feedback: selectedItem };
                })
              }
            />
            <TextInput
              style={styles.note}
              multiline={true}
              placeholder="Add here note if you need to precise some infomration..."
              value={contactDetials.note}
              onChangeText={(text) =>
                setContactDetials((prevState) => {
                  return { ...prevState, note: text };
                })
              }
            />
            <View style={styles.buttonSection}>
              <TouchableOpacity
                style={styles.callBtn}
                onPress={() => dialer(contactDetials.number)}
              >
                <Text style={styles.basicFont}>Call</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.nextBtn}
                onPress={() => nextContact()}
              >
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
    flex: 0.7,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  callsInfo: {
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
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 15,
  },
  selectDropdown: {
    marginTop: 20,
    marginBottom: 20,
    width: "100%",
  },
  note: {
    backgroundColor: "white",
    marginBottom: 20,
    height: 110,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#24A0ED",
  },
  buttonSection: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginBottom: 10,
  },
  callBtn: {
    backgroundColor: "#32DE84",
    flex: 2,
    marginRight: 10,
    height: 35,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
  nextBtn: {
    backgroundColor: "#24A0ED",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
});

export default Dashboard;
