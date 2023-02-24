import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";

import dialer from "../utility/dialer";

function ContactListItem(props) {
  return (
    <View style={styles.contact}>
      <View style={styles.left}>
        <View style={styles.contactHeader}>
          <Text style={styles.basicFont}>{props.name} | </Text>
          <Text style={styles.basicFont}>{props.number}</Text>
        </View>
        <Text style={styles.basicFont}>Last call: {props.lastCall}</Text>
        <Text style={styles.basicFont}>Feedback: {props.feedback[0]} </Text>
      </View>
      <View style={styles.right}>
        <TouchableOpacity
          style={styles.callBtn}
          onPress={() => dialer(props.number)}
        >
          <Image
            style={{ width: 40, height: 40 }}
            source={require("../images/icons/phone.png")}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  basicFont: {
    color: "white",
    fontSize: 16,
  },
  contact: {
    borderRadius: 20,
    paddingBottom: 10,
    paddingTop: 10,
    flexDirection: "row",
    backgroundColor: "#111111",
    marginBottom: 15,
  },
  left: {
    flex: 3,
    paddingLeft: 10,
  },
  contactHeader: {
    flexDirection: "row",
  },
  right: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  callBtn: {
    backgroundColor: "#32DE84",
    padding: 10,
    borderRadius: 50,
  },
});

export default ContactListItem;
