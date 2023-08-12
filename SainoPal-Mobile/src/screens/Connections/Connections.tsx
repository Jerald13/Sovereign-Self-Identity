import { Button, ScrollView, StyleSheet, View } from "react-native"
import { Text, Card } from "@rneui/themed"
import { useEffect, useState } from "react"
import AgentService from "../../services/AgentService"
import axios from "axios"

type ConnectionResponse = {
  results: Connection[]
}

type Connection = {
  my_did: string
  updated_at: string
  rfc23_state: string
  accept: string
  their_label: string
  their_did: string
  created_at: string
  routing_state: string
  invitation_mode: string
  connection_protocol: string
  invitation_key: string
  their_role: string
  connection_id: string
  state: string
}

export default function Connections() {
  const [agent, setAgent] = useState<AgentService | null>(null)
  const [connectionList, setConnectionList] = useState<Connection[]>([])
  const [connectState, setConnectState] = useState<string>("active")

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
          setConnectionList(e.results as Connection[])
        })
        .catch((error) => console.error(error))
    }

    fetchConnections()
  }, [agent])

  return (
    <>
      <View style={styles.container}>
        <Text>Connections Page</Text>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Button title="active" onPress={() => setConnectState("active")} />
          <Button
            title="pending"
            onPress={() => setConnectState("invitation")}
          />
        </View>
        {connectionList ? (
          connectionList
            .filter((e) => e.state === connectState)
            .map((e) => (
              <Card>
                <Text>
                  Invitation received on{" "}
                  {new Date(e.created_at).toLocaleString()}
                </Text>
                <Text>Connection ID: {e.connection_id}</Text>
                <Text>Counterparty's name : {e.their_label}</Text>
                <Text>Connection's DID: {e.their_did}</Text>
                <Text>Connection State: {e.state}</Text>
                <Text>Invitation Mode: {e.invitation_mode}</Text>
                <Text></Text>
                <Card.Divider />
                <Text>
                  Last updated on {new Date(e.updated_at).toLocaleString()}
                </Text>
              </Card>
            ))
        ) : (
          <Text>Nothing to be displayed</Text>
        )}
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
