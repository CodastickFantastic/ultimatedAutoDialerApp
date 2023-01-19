// React Import
import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
} from "react-native";

// Google FireBase Import
import auth from "@react-native-firebase/auth";

// Navigation Import
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

// Components Import
import LogInScreen from "./src/components/LogInScreen";
import Dashboard from "./src/components/Dashboard";
import Settings from "./src/components/Settings";
import ContactList from "./src/components/ContactList";

//Context Import
import { CurrentListContextProvider } from "./src/utility/Contexts/CurrentListContext";

function App() {
  // Initializing Tab Navigation
  const Tab = createBottomTabNavigator();

  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
    console.log(user);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;

  if (!user) {
    return (
      <View>
        <LogInScreen />
      </View>
    );
  } else {
    return (
      <View style={styles.componentContainer}>
        <CurrentListContextProvider userID={user.uid}>
          <NavigationContainer>
            <Tab.Navigator>
              <Tab.Screen name="Dashboard" options={{ headerShown: false }}>
                {(props) => (
                  <Dashboard
                    {...props}
                    userName={user.displayName.split(" ")[0]}
                    userID={user.uid}
                    
                  />
                )}
              </Tab.Screen>
              <Tab.Screen
                name="Call List"
                options={{ headerShown: false }}
              >
                {(props) => (
                  <ContactList
                    {...props}
                    userID={user.uid}
                  />
                )}
              </Tab.Screen>
              <Tab.Screen
                name="SMS Campaign"
                component={Dashboard}
                options={{ headerShown: false }}
              />
              <Tab.Screen
                name="Settings"
                options={{ headerShown: false }}
              >
                {(props) => (
                  <Settings
                    {...props}
                    userName={user.displayName}
                    avatar={user.photoURL}
                  />
                )}
              </Tab.Screen>
            </Tab.Navigator>
          </NavigationContainer>
        </CurrentListContextProvider>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  componentContainer: {
    height: "100%",
  },
});

export default App;
