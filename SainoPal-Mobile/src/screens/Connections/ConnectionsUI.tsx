import React, { useState, useEffect } from "react"
import {
  SafeAreaView,
  Text,
  StyleSheet,
  View,
  FlatList,
  TextInput,
  ScrollView,
} from "react-native"
import AgentService from "../../services/AgentService"
import axios from "axios"
import { MaterialIcons } from "@expo/vector-icons"
type Connection = {
  my_did: string
  updated_at: string
  rfc23_state: string
  accept: string
  their_did: string
  created_at: string
  routing_state: string
  their_label: string
  invitation_mode: string
  connection_protocol: string
  invitation_key: string
  their_role: string
  connection_id: string
  state: string
}

const ConnectionUI = () => {
  const [search, setSearch] = useState("")
  const [filteredConnections, setFilteredConnections] = useState<Connection[]>(
    []
  )
  const [allConnections, setAllConnections] = useState<Connection[]>([])
  const [agent, setAgent] = useState<AgentService | null>(null)

  useEffect(() => {
    if (!agent) {
      const initAgent: AgentService = new AgentService(axios)
      setAgent(initAgent)
    }

    function fetchConnections() {
      agent
        ?.getConnections()
        .then((e) => {
          console.log(e.results)

          // Filter out connections with empty their_label
          const validConnections = e.results.filter(
            (connection: { their_label: any }) => connection.their_label
          )

          // Sort connections by creation date in descending order
          validConnections.sort(
            (
              a: { created_at: string | number | Date },
              b: { created_at: string | number | Date }
            ) =>
              new Date(b.created_at).getTime() -
              new Date(a.created_at).getTime()
          )

          setAllConnections(validConnections)
          setFilteredConnections(validConnections)
        })
        .catch((error) => console.error(error))
    }

    fetchConnections()
  }, [agent])

  const searchFilterFunction = (text: string) => {
    if (text === "") {
      setFilteredConnections(allConnections)
    } else {
      const filteredData = allConnections.filter((connection) => {
        const myDid = connection.their_label || "" // Handle undefined value
        return myDid.toLowerCase().includes(text.toLowerCase())
      })
      setFilteredConnections(filteredData)
    }
    setSearch(text)
  }

  const clearSearch = () => {
    setFilteredConnections(allConnections)
    setSearch("")
  }

  const renderItem = ({ item }: { item: Connection }) => {
    const createdAt = new Date(item.created_at)
    const now = new Date()

    const formattedDate = createdAt.toLocaleDateString()
    const formattedTime = createdAt.toLocaleTimeString()

    let dateDisplay = formattedDate

    if (
      createdAt.getDate() === now.getDate() &&
      createdAt.getMonth() === now.getMonth() &&
      createdAt.getFullYear() === now.getFullYear()
    ) {
      dateDisplay = "Today"
    } else if (
      createdAt.getDate() === now.getDate() - 1 &&
      createdAt.getMonth() === now.getMonth() &&
      createdAt.getFullYear() === now.getFullYear()
    ) {
      dateDisplay = "Yesterday"
    }

    if (createdAt < now) {
      return (
        <View style={styles.itemContainer}>
          <View style={styles.leftContent}>
            <Text style={styles.itemText}>{item.their_label}</Text>
            <Text style={styles.timeText}>{formattedTime}</Text>
          </View>
          <View style={styles.rightContent}>
            <Text style={styles.dateText}>{dateDisplay}</Text>
            <MaterialIcons name="keyboard-arrow-right" size={24} color="#555" />
          </View>
        </View>
      )
    } else {
      return null // Do not render connections with future dates
    }
  }

  const ItemSeparatorView = () => (
    <View style={{ height: 0.5, width: "100%", backgroundColor: "#C8C8C8" }} />
  )

  return (
    <ScrollView>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container}>
          <View style={styles.textInputContainer}>
            <View style={styles.searchIcon}>
              <MaterialIcons name="search" size={20} color="#999" />
            </View>
            <TextInput
              style={styles.textInputStyle}
              onChangeText={searchFilterFunction}
              value={search}
              placeholder="Search ..."
              placeholderTextColor="#999"
              clearButtonMode="while-editing"
            />
            {search.length > 0 && (
              <View style={styles.clearIcon}>
                <MaterialIcons
                  name="clear"
                  size={20}
                  color="#999"
                  onPress={clearSearch}
                />
              </View>
            )}
          </View>

          <Text style={styles.title}>Established contacts</Text>
          <View>
            <FlatList
              data={filteredConnections}
              keyExtractor={(item) => item.my_did}
              renderItem={renderItem}
            />
          </View>
        </View>
      </SafeAreaView>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 80,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: "white",
  },

  itemText: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#333",
  },
  textInputStyle: {
    height: 40,
    margin: 5,
    backgroundColor: "#f8f8f8",
  },

  itemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
  },

  leftContent: {
    flexDirection: "column", // Display vertically
  },

  rightContent: {
    flexDirection: "row", // Display horizontally
    alignItems: "center", // Align items vertically
  },

  arrowAndDateContainer: {
    flexDirection: "row", // Display horizontally
    alignItems: "center", // Align arrow and date vertically
  },

  dateText: {
    fontSize: 14,
    color: "#b0b5bb",
  },
  timeText: {
    fontSize: 14,
    color: "#b0b5bb",
    marginBottom: 5,
  },
  textInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f8f8f8",
    paddingHorizontal: 10,
    margin: 5,
    borderRadius: 20,
    position: "relative",
  },

  searchIcon: {
    marginRight: 10,
    backgroundColor: "#f8f8f8",
  },

  clearIcon: {
    position: "absolute",
    right: 10,
    backgroundColor: "#f8f8f8",
  },
  title: {
    fontSize: 14,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
    color: "#b0b5bb",
  },

  separator: {
    height: 0.5,
    width: "100%",
    backgroundColor: "#C8C8C8",
  },
})
export default ConnectionUI
