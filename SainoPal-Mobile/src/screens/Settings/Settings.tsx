import React, { useState, useEffect } from "react"
import {
  SafeAreaView,
  Text,
  StyleSheet,
  View,
  FlatList,
  TextInput,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native"
import AgentService from "../../services/AgentService"
import axios from "axios"
import { MaterialIcons } from "@expo/vector-icons"
import { useNavigation } from "@react-navigation/native"
import { StackNavigationProp } from "@react-navigation/stack"
import { RootStackParamList } from "../../../CustomNavigation"
type homeScreenProp = StackNavigationProp<RootStackParamList, "BackUpWallet">

const Settings = () => {
  const navigation = useNavigation<homeScreenProp>()
  const settingsData = [
    {
      id: 1,
      title: "Change Pin",
      icon: require("../../../assets/change_pin.png"), // Replace with actual image path
    },
    {
      id: 2,
      title: "Wallet Backup",
      icon: require("../../../assets/backup.png"), // Replace with actual image path
    },
  ]

  const handleSettingPress = (title: string) => {
    if (title === "Change Pin") {
      // navigation.navigate("Wallet Backup", { msg: "Your message here" })
    } else if (title === "Wallet Backup") {
      // navigation.navigate("WalletBackupScreen")
      navigation.navigate("BackUpWallet", { msg: "Your message 22here" })
    }
    // Add more cases for other setting titles
  }

  const renderItem = ({
    item,
  }: {
    item: { id: number; title: string; icon: any }
  }) => (
    <TouchableOpacity
      onPress={() => handleSettingPress(item.title)} // Call the handleSettingPress function
      style={styles.settingItem}
    >
      <View style={styles.settingItem}>
        <View style={styles.settingIconContainer}>
          <View style={styles.iconBorder}>
            <Image source={item.icon} style={styles.settingIcon} />
          </View>
        </View>
        <View style={styles.settingTextContainer}>
          <Text style={styles.settingTitle}>{item.title}</Text>
        </View>
        <View style={styles.rightArrowContainer}>
          <MaterialIcons name="keyboard-arrow-right" size={24} color="#555" />
        </View>
      </View>
    </TouchableOpacity>
  )

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.subtitle}>Security</Text>
      <FlatList
        data={settingsData}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "white",
  },
  title: {
    fontSize: 20,
    color: "black",
    marginBottom: 10,
  },
  subtitle: {
    marginBottom: 10,
    fontSize: 14,
    color: "#b0b5bb",
  },
  settingItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
  },

  settingTextContainer: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    color: "#333",
  },
  settingIconContainer: {
    marginRight: 15,
  },
  iconBorder: {
    borderWidth: 1,
    borderColor: "#ececec",
    borderRadius: 50,
    padding: 5,
  },
  settingIcon: {
    width: 30,
    height: 30,
    resizeMode: "contain",
  },
  rightArrowContainer: {},
})

export default Settings
function handleSettingPress(title: string) {
  throw new Error("Function not implemented.")
}
