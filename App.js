import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ActivityIndicator
} from "react-native";
import { createStackNavigator, createAppContainer } from "react-navigation";
import HomeScreen from "./screens/HomeScreen";
import RedeemScreen from "./screens/RedeemScreen";
import SendScreen from "./screens/SendScreen";
import SettingsScreen from "./screens/SettingsScreen";
import Header from "./components/Header";
import CapturePin from "./components/CapturePin";
import { globalStyles } from "./constants/styles";

import * as Keychain from "react-native-keychain";

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
  const [loggedIn, setLogIn] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [isFirstTimePin, setFirstTimePin] = useState(true);
  const [pin, setPin] = useState(null);
  const handleSuccess = () => {
    setLogIn(true);
  };

  const handleNewPin = async pin => {
    await Keychain.setGenericPassword("userPin", pin);
  };

  useEffect(() => {
    const checkPin = async () => {
      try {
        // Retreive the credentials

        const credentials = await Keychain.getGenericPassword();
        if (credentials) {
          setFirstTimePin(false);
          setPin(credentials.password);
        } else {
          setFirstTimePin(true);
        }
      } catch (error) {
        console.log("Keychain couldn't be accessed!", error);
      }

      setLoading(false);
    };

    checkPin();
  }, []);

  return (
    <Store>
      <View style={{ flex: 1 }}>
        {loggedIn ? (
          <AppContainer />
        ) : (
          <CapturePin
            pin={pin}
            onSuccess={handleSuccess}
            isFirstTimePin={isFirstTimePin}
            handleNewPin={handleNewPin}
          />
        )}
        {isLoading && (
          <View
            style={{
              ...StyleSheet.absoluteFillObject,
              backgroundColor: "rgba(255,255,255,.85)",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <ActivityIndicator size="large" />
          </View>
        )}
      </View>
    </Store>
  );
}
