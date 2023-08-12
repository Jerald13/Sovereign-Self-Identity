import React from "react"
import { createStackNavigator } from "@react-navigation/stack"
import {
  FirstScreenNavigatorProps,
  SecondScreenNavigatorProps,
  ThirdScreenNavigatorProps,
} from "./types" // Import your types

// import NestedScreen from "./screens/NestedScreen";
// import Screen1 from "./screens/Screen1";
// import Screen2 from "./screens/Screen2";
import Settings from "./src/screens/Settings/Settings"
import Connection from "./src/screens/Connections/ConnectionsUI"
import Screen1 from "./src/screens/Settings/Screen1"

export type RootStackParamList = {
    Settings: undefined;
    BackUpWallet: { msg: string };
    Connections: undefined;
    NestedScreen3: undefined;
  };

  const Stack = createStackNavigator<RootStackParamList>();

const FirstScreenNavigator: React.FC<FirstScreenNavigatorProps> = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Settings" component={Settings} />
      <Stack.Screen name="BackUpWallet" component={Screen1} />
    </Stack.Navigator>
  )
}

export { FirstScreenNavigator }

const SecondScreenNavigator: React.FC<SecondScreenNavigatorProps> = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Connections" component={Connection} />
      {/* <Stack.Screen name="NestedScreen2" component={NestedScreen} /> */}
    </Stack.Navigator>
  )
}

export { SecondScreenNavigator }

const ThirdScreenNavigator: React.FC<ThirdScreenNavigatorProps> = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Settings" component={Settings} />
      <Stack.Screen name="BackUpWallet" component={Screen1} />

    </Stack.Navigator>
  )
}

export { ThirdScreenNavigator }
