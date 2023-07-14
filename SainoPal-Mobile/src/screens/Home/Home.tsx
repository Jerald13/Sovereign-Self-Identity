import { StyleSheet, Text, View, Button, Alert, TextInput } from "react-native";
import { useState, useEffect } from "react";
import AgentService from "../../services/AgentService";
import {Buffer} from 'buffer';
import axios from "axios";

interface AlertBox {
  msg: string;
}

export default function Home() {
  const [text, setText] = useState<string>("");
  const [agent, setAgent] = useState<AgentService | null>(null);

  useEffect(() => {
    if (!agent) {
      const initAgent: AgentService = new AgentService(axios);
      setAgent(initAgent);
    }
  }, [agent]);

  function handleConnection(invitationUrl: string) {
    const url = new URL(invitationUrl);
    const invitationParam = url.searchParams.get("c_i");

    if (!invitationParam) {
      console.error("Invalid Invitation Url");
      return;
    }
    const decoded = Buffer.from(invitationParam,'base64').toString();
    console.log(decoded)
    const payload = JSON.parse(decoded)
    console.log('Payload : ', payload)
    
    agent?.receiveInvitation(payload)
    .then(e => console.log(e))
    .catch(e => console.error(e))
    
  }

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>Sainopal</Text>
      </View>

      <View style={styles.content}>
        <Text>Type Something Below To Test Something</Text>
        <TextInput
          style={styles.textInputStyle}
          multiline={true}
          textAlignVertical="top"
          onChangeText={setText}
          placeholder="Input Text Here"
        />
        <Button
          title="Click me to Alert"
          onPress={() => handleConnection(text)}
          color="#841584"
          accessibilityLabel="Learn more about this purple button"
        />
      </View>
    </View>
  );
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
  textInputStyle: {
    textAlign: "center",
    alignItems: "center",
  },
});
