import { Button, StyleSheet, Text, View } from "react-native";
import { useEffect, useState} from "react";
import AgentService from "../../services/AgentService";
import axios from "axios"

export default function Connect() {

  const [agent,setAgent] = useState<AgentService | null>(null);
  const [text,setText] = useState<string>("");

  useEffect(() => {

    if(!agent){
      const initAgent : AgentService = new AgentService(axios);
      setAgent(initAgent);
    }


  }, []);

  async function handlePress(){

    const response = await agent?.getConnections()
    console.log(response)
    setText(JSON.stringify(response));
  }
  
  return (
    <View style={styles.container}>
      <Text>Test Screen</Text>
      <Button
        title="Click me"
        onPress={handlePress}
      />
      <Text>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
