import React from "react";
import {
  View,

} from "react-native";
import { createStackNavigator, createAppContainer } from "react-navigation";
import HomeScreen from "./screens/HomeScreen";
import RedeemScreen from "./screens/RedeemScreen";
import SendScreen from "./screens/SendScreen";
import SettingsScreen from "./screens/SettingsScreen";
import Header from "./components/Header";


import Store from "./contexts/Store";

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

  return (
    <Store>
      <View style={{ flex: 1 }}>
          <AppContainer />
      </View>
    </Store>
  );
}
