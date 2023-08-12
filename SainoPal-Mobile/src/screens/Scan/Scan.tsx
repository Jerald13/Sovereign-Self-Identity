import React, { useState, useEffect } from "react"
import { Text, View, StyleSheet, Button, Alert } from "react-native"
import { BarCodeScanner, BarCodeScannerResult } from "expo-barcode-scanner"
import AgentService from "../../services/AgentService"
import { Buffer } from "buffer"
import axios from "axios"

export default function Scan() {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null)
  const [scanned, setScanned] = useState(false)
  const [agent, setAgent] = useState<AgentService | null>(null)

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync()
      if (status === "granted") {
        setHasPermission(true)
        const initAgent: AgentService = new AgentService(axios)
        setAgent(initAgent)
      }
    }

    getBarCodeScannerPermissions()
  }, [])

  const handleBarCodeScanned = ({ type, data }: BarCodeScannerResult) => {
    // setScanned(true)
    Alert.alert(
      "Scanned Data",
      `Bar code with type ${type} and data ${data} has been scanned!`,
      [
        {
          text: "Cancel",
          style: "cancel",
          onPress: () => {
            setScanned(false)
          },
        },
        {
          text: "OK",
          onPress: () => {
            const url = new URL(data)
            const invitationParam = url.searchParams.get("c_i")

            if (!invitationParam) {
              console.error("Invalid Invitation Url")
              return
            }
            const decoded = Buffer.from(invitationParam, "base64").toString()
            console.log(decoded)
            const payload = JSON.parse(decoded)
            console.log("Payload: ", payload)

            agent
              ?.receiveInvitation(payload)
              .then((e) => console.log(e))
              .catch((e) => console.error(e))
          },
        },
      ],
      { cancelable: false }
    )
  }

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>
  }

  return (
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      <View style={styles.borderContainer}></View>

      {scanned && (
        <Button title={"Tap to Scan Again"} onPress={() => setScanned(false)} />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  borderContainer: {
    position: "absolute",
    width: 300, // Set the width of the border container
    height: 300, // Set the height of the border container
    borderWidth: 2,
    borderColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
})
