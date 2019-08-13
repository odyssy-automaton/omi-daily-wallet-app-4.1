import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput } from "react-native";
import { createStackNavigator, createAppContainer } from "react-navigation";
import HomeScreen from "./screens/HomeScreen";
import RedeemScreen from "./screens/RedeemScreen";
import SendScreen from "./screens/SendScreen";
import SettingsScreen from "./screens/SettingsScreen";
import Header from "./components/Header";
import CapturePin from "./components/CapturePin";
import { globalStyles } from "./constants/styles";



const AppNavigator = createStackNavigator(
  {
    Home: {
      screen: HomeScreen
    },
    Redeem: RedeemScreen,
    Send: SendScreen,
    Settings: SettingsScreen
  },
  {
    initialRouteName: "Home",
    headerMode: "float",
    defaultNavigationOptions: {
      header: props => <Header {...props} />
    }
  }
);

const AppContainer = createAppContainer(AppNavigator);

export default function App() {
  const [loggedIn, setLogIn] = useState(false);
  const handleSuccess = () => {
    setLogIn(true);
  };
  return loggedIn ? (
    <AppContainer />
  ) : (
    <CapturePin pin="1234" onSuccess={handleSuccess} />
  );
}
