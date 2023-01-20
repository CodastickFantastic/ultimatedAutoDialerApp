import React from "react";
import { View, Text, StyleSheet} from "react-native";

function SmsCampaign(){
    return(
        <View style={styles.componentContainer}>
            <Text>Section Under Development</Text>
            <Text>To Do:</Text>
            <Text>Native Module For Autoamted SMS Campaigns</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    componentContainer:{
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#d9d9d9"
    }
})

export default SmsCampaign