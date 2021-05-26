import "react-native-gesture-handler";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./screens/homeScreen";

export default function App() {
  const Stack = createStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="HomeScreen">
        <Stack.Screen
          name="DICTIONARY"
          component={HomeScreen}
          options={option}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

var option = {
  headerStyle: {
    backgroundColor: "#212121",
  },
  headerTitleStyle: {
    fontWeight: "bold",
    color: "#fff",
  },
  headerTintColor: "#fff",
};
