import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ActivityIndicator,
  AsyncStorage
} from "react-native";
import { createStackNavigator, createAppContainer } from "react-navigation";
import HomeScreen from "./screens/HomeScreen";
import RedeemScreen from "./screens/RedeemScreen";
import SendScreen from "./screens/SendScreen";
import SettingsScreen from "./screens/SettingsScreen";
import Header from "./components/Header";
import CapturePin from "./components/CapturePin";
import { globalStyles } from "./constants/styles";
import { configureContainer } from "./configSdk";
import * as Keychain from "react-native-keychain";

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
    const getWalletIdPost = async () => {
      const postBody = {
        userDeviceAddress: "0xcfA2e1D49F4b51d29116d37ED2e9BF000ef0d6af"
      };
      let response = await fetch(
        `https://rx4y9fk2r8.execute-api.us-east-1.amazonaws.com/dev/links/signup-test`,
        {
          method: "post",
          body: JSON.stringify(postBody)
        }
      );
      return await response.json();
    };

    const fetchAllStoreItems = async () => {
      try {
        const keys = await AsyncStorage.getAllKeys();
        const items = await AsyncStorage.multiGet(keys);
        return items;
      } catch (error) {
        console.log(error, "problemo");
      }
    };

    const checkPin = async () => {
      const wallet = await configureContainer();
      const asyncStore = await fetchAllStoreItems();
      const walletId = await getWalletIdPost();
      const connectWallet = await wallet.connectAccount(
        walletId.accountAddress
      );
      //logWallet(connectWallet);
      console.log("wallet address response>>: ", walletId.accountAddress);
      console.log("async store>>: ", JSON.stringify(asyncStore));
      console.log("wallet >>: ", wallet.state);
      console.log("wallet connect>>: ", connectWallet);
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
  });

  return (
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
  );
}
