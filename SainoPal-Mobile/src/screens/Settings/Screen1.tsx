import React from "react"
import { StyleSheet, Text, View } from "react-native"
import { RouteProp } from "@react-navigation/native"
import { StackNavigationProp } from "@react-navigation/stack"
import { RootStackParamList } from "../../../CustomNavigation"

// Define the types for the navigation and route props
type NestedScreen1NavigationProp = StackNavigationProp<
  RootStackParamList,
  "BackUpWallet"
>
type NestedScreen1RouteProp = RouteProp<RootStackParamList, "BackUpWallet">

type NestedScreen1Props = {
  navigation: NestedScreen1NavigationProp
  route: NestedScreen1RouteProp
}

const NestedScreen1: React.FC<NestedScreen1Props> = ({ route }) => {
  const { msg } = route.params // Access the passed parameter

  return (
    <View style={styles.screen}>
      <Text style={styles.text}>I am NestedScreen1</Text>
      <Text>{msg}</Text>
    </View>
  )
}

export default NestedScreen1

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#00000025",
  },
  text: {
    color: "#000",
    fontWeight: "700",
    fontSize: 30,
  },
})
