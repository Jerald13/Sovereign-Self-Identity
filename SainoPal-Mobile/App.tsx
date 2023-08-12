import React from "react"
import { Text, Platform, View, ViewStyle } from "react-native"
import Connection from "./src/screens/Connections/Connections"
import ConnectionUI from "./src/screens/Connections/ConnectionsUI"
import Settings from "./src/screens/Settings/Settings"

import Home from "./src/screens/Home/Home"
import Scan from "./src/screens/Scan/Scan"
import { NavigationContainer } from "@react-navigation/native"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { Entypo } from "@expo/vector-icons"
import { MaterialIcons } from "@expo/vector-icons"
import { Ionicons } from "@expo/vector-icons"
import { FontAwesome } from "@expo/vector-icons"
import {
  FirstScreenNavigator,
  SecondScreenNavigator,
  ThirdScreenNavigator,
} from "./CustomNavigation"

const Tab = createBottomTabNavigator()

interface ScreenOptions {
  tabBarShowLabel: boolean
  headerShown: boolean
  tabBarStyle: {
    position: "absolute"
    bottom: 0
    right: 0
    left: 0
    elevation: number
    height: number
    backgroundColor: string
    paddingBottom: number
    paddingTop: number
  }
}

const screenOptions: ScreenOptions = {
  tabBarShowLabel: false,
  headerShown: false,
  tabBarStyle: {
    position: "absolute",
    bottom: 0,
    right: 0,
    left: 0,
    elevation: 0,
    height: 70,
    backgroundColor: "#fff",
    paddingBottom: 20,
    paddingTop: 20,
  },
}

const notificationAlert: ViewStyle = {
  position: "absolute",
  bottom: 30,
  left: 30,
  backgroundColor: "#93b6f8",
  borderRadius: 10,
  width: 15,
  height: 15,
  justifyContent: "center",
  alignItems: "center",
}

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={screenOptions}>
        <Tab.Screen
          name="Connection"
          component={FirstScreenNavigator}
          options={{
            tabBarIcon: ({ focused }) => (
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  position: "relative",
                }}
              >
                <Entypo
                  name="wallet"
                  size={24}
                  color={focused ? "#0e2b45" : "#828c9f"}
                />

                <Text style={{ fontSize: 14, color: "#0e2b45" }}>Wallet</Text>
              </View>
            ),
          }}
        />

        <Tab.Screen
          name="Creadentials"
          component={SecondScreenNavigator}
          options={{
            tabBarIcon: ({ focused }) => (
              <View style={{ alignItems: "center", justifyContent: "center" }}>
                <Ionicons
                  name="person-circle-outline"
                  size={24}
                  color={focused ? "#0e2b45" : "#828c9f"}
                />
                <Text style={{ fontSize: 14, color: "#0e2b45" }}>Contacts</Text>
                <View style={notificationAlert}>
                  <Text style={{ color: "white", fontSize: 12 }}></Text>
                </View>
              </View>
            ),
          }}
        />

        <Tab.Screen
          name="Settings"
          component={ThirdScreenNavigator}
          options={{
            tabBarIcon: ({ focused }) => (
              <View style={{ alignItems: "center", justifyContent: "center" }}>
                <Ionicons
                  name="settings"
                  size={24}
                  color={focused ? "#0e2b45" : "#828c9f"}
                />
                <Text style={{ fontSize: 14, color: "#0e2b45" }}>Settings</Text>
              </View>
            ),
          }}
        />

        <Tab.Screen
          name="Scan"
          component={Scan}
          options={{
            tabBarIcon: ({ color }) => (
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  width: Platform.OS === "ios" ? 50 : 60,
                  height: Platform.OS === "ios" ? 50 : 60,
                  top: Platform.OS === "ios" ? -10 : -30,
                  borderRadius: Platform.OS === "ios" ? 25 : 30,
                  backgroundColor: "#0e2b45",
                  position: "relative",
                }}
              >
                <FontAwesome name="qrcode" size={24} color="#fff" />
                <Text
                  style={{
                    fontSize: 14,
                    color: "#0e2b45",
                    position: "absolute", // Add this line
                    top: 62, // Adjust this value as needed
                  }}
                >
                  Scan
                </Text>
              </View>
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  )
}

export default App

// import type { BottomTabBarProps } from "@react-navigation/bottom-tabs"
// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
// import { NavigationContainer } from "@react-navigation/native"
// import { StyleSheet } from "react-native"
// import Home from "./src/screens/Home/Home"
// import Scan from "./src/screens/Scan/Scan"

// import MyTabBar from "./MyTabBar"
// import Profile from "./Profile"
// import Connect from "./src/screens/Connect/Connect"
// import Connections from "./src/screens/Connections/Connections"

// const Tab = createBottomTabNavigator()

// export default function App() {
//   return (
//     <NavigationContainer>
//       <Tab.Navigator
//         tabBar={(props: BottomTabBarProps) => <MyTabBar {...props} />}
//         screenOptions={{
//           headerShown: true,
//           tabBarHideOnKeyboard: true,
//         }}
//       >
//         <Tab.Screen
//           name="Home"
//           component={Home}
//           key={"Home"}
//           navigationKey="1"
//         />
//         <Tab.Screen
//           name="Connect"
//           component={Connect}
//           key={"Connect"}
//           navigationKey="2"
//         />
//         <Tab.Screen
//           name="Scan"
//           component={Scan}
//           key={"Scan"}
//           navigationKey="3"
//         />
//         <Tab.Screen
//           name="Connections"
//           component={Connections}
//           key={"Connections"}
//           navigationKey="4"
//         />
//       </Tab.Navigator>
//     </NavigationContainer>
//   )
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   title: {
//     fontSize: 20,
//   },
//   content: {
//     marginTop: 20,
//   },
// })
