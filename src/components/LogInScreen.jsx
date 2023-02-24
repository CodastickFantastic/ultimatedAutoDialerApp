import React from "react";
import { Button, View, Text, StyleSheet, Image } from "react-native";

import { GoogleSignin } from "@react-native-google-signin/google-signin";
import auth from "@react-native-firebase/auth";

function LogInScreen() {
  GoogleSignin.configure({
    webClientId:
      "643640911504-shh028kbpgkinmirk8tdkr49badf1n8s.apps.googleusercontent.com",
  });

  async function onGoogleButtonPress() {
    // Check if your device supports Google Play
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });

    // Get the users ID token
    const { idToken } = await GoogleSignin.signIn();

    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    // Sign-in the user with the credential
    return auth().signInWithCredential(googleCredential);
  }

  return (
    <View style={styles.sectionContainer}>
      <Image source={require("../images/logo.png")} style={styles.logo} />
      <Button
        title="Google Sign-In"
        onPress={() =>
          onGoogleButtonPress().then(() =>
            console.log("Signed in with Google!")
          )
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#181818",
  },
  logo: {
    width: 200,
    height: 200,
    resizeMode: "contain"
  },
  loginDescription: {
    fontSize: 20,
    marginBottom: 30,
  },
});

export default LogInScreen;
