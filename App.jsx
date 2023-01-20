// React Import
import React, { useState, useEffect } from "react";
import { View, StyleSheet, Image } from "react-native";

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
import SmsCampaign from "./src/components/SmsCampaign";

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
            <Tab.Navigator screenOptions={{ tabBarInactiveTintColor: "black" }}>
              <Tab.Screen
                name="Dashboard"
                options={{
                  headerShown: false,
                  tabBarIcon: ({ focused, size }) => {
                    return focused ? (
                      <Image
                        source={require("./src/images/icons/home-blue.png")}
                        style={{ width: size, height: size }}
                      />
                    ) : (
                      <Image
                        source={require("./src/images/icons/home.png")}
                        style={{ width: size, height: size }}
                      />
                    );
                  },
                }}
              >
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
                options={{
                  headerShown: false,
                  tabBarIcon: ({ focused, size }) => {
                    return focused ? (
                      <Image
                        source={require("./src/images/icons/contacts-book-blue.png")}
                        style={{ width: size, height: size }}
                      />
                    ) : (
                      <Image
                        source={require("./src/images/icons/contacts-book.png")}
                        style={{ width: size, height: size }}
                      />
                    );
                  },
                }}
              >
                {(props) => <ContactList {...props} userID={user.uid} />}
              </Tab.Screen>
              <Tab.Screen
                name="Campaign"
                component={SmsCampaign}
                options={{
                  headerShown: false,
                  tabBarIcon: ({ focused, size }) => {
                    return focused ? (
                      <Image
                        source={require("./src/images/icons/sms-blue.png")}
                        style={{ width: size, height: size }}
                      />
                    ) : (
                      <Image
                        source={require("./src/images/icons/sms.png")}
                        style={{ width: size, height: size }}
                      />
                    );
                  },
                }}
              />
              <Tab.Screen
                name="Settings"
                options={{
                  headerShown: false,
                  tabBarBadgeStyle: "green",
                  tabBarIcon: ({ focused, size }) => {
                    return focused ? (
                      <Image
                        source={require("./src/images/icons/settings-blue.png")}
                        style={{ width: size, height: size }}
                      />
                    ) : (
                      <Image
                        source={require("./src/images/icons/settings.png")}
                        style={{ width: size, height: size }}
                      />
                    );
                  },
                }}
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
