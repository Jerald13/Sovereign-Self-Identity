import { StyleSheet, Text, View, Button, Alert, TextInput } from "react-native";
import { useState } from "react";

interface AlertBox {
  msg: string;
}

export default function Home() {
  const [text, setText] = useState<string>("");

  function alertMessage(props: AlertBox) {
    Alert.alert(props.msg);
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
          onChangeText={setText}
          placeholder="Input Text Here"
        />
        <Button
          title="Click me to Alert"
          onPress={() => alertMessage({ msg: text })}
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
