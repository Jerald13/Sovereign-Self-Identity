import type { BottomTabBarProps } from "@react-navigation/bottom-tabs"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { NavigationContainer } from "@react-navigation/native"
import { StyleSheet } from "react-native"
import Home from "./src/screens/Home/Home"
import Scan from "./src/screens/Scan/Scan"

import MyTabBar from "./MyTabBar"
import Profile from "./Profile"
import Connect from "./src/screens/Connect/Connect"
import Connections from "./src/screens/Connections/Connections"

const Tab = createBottomTabNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        tabBar={(props: BottomTabBarProps) => <MyTabBar {...props} />}
        screenOptions={{
          headerShown: true,
          tabBarHideOnKeyboard: true,
        }}
      >
        <Tab.Screen
          name="Home"
          component={Home}
          key={"Home"}
          navigationKey="1"
        />
        <Tab.Screen
          name="Connect"
          component={Connect}
          key={"Connect"}
          navigationKey="2"
        />
        <Tab.Screen
          name="Scan"
          component={Scan}
          key={"Scan"}
          navigationKey="3"
        />
        <Tab.Screen
          name="Connections"
          component={Connections}
          key={"Connections"}
          navigationKey="4"
        />
      </Tab.Navigator>
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
  },
  content: {
    marginTop: 20,
  },
})
