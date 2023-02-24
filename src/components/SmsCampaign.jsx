import React from "react";
import { View, Text, StyleSheet } from "react-native";

function SmsCampaign() {
  return (
    <View style={styles.componentContainer}>
      <Text style={{ color: "white" }}>Section Under Development</Text>
      <Text style={{ color: "white" }}>To Do:</Text>
      <Text style={{ color: "white" }}>
        Native Module For Autoamted SMS Campaigns
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  componentContainer: {
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#181818",
  },
});

export default SmsCampaign;
