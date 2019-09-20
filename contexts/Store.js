import React, { useState, useEffect, createContext } from "react";
import { Linking, Clipboard } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";

import { ethToWei, weiToEth } from "@netgum/utils";

import useInterval from "../util/PollingUtil";
import { configureContainer } from "../configSdk";
import config from "../config";

import { NativeModules } from "react-native";
const deviceLanguage =
  Platform.OS === "ios"
    ? NativeModules.SettingsManager.settings.AppleLocale
    : NativeModules.I18nManager.localeIdentifier;

export const LanguageContext = createContext(
  deviceLanguage.split("_")[0] === "es" ? "es" : "en"
);

export const InitialLinkContext = createContext("");

export const CurrentWalletContext = createContext({
  balance: 0,
  sdk: null
});

const Store = ({ children }) => {
  const [currentWallet, setCurrentWallet] = useState();
  const [currentLanguage] = useState(
    deviceLanguage.split("_")[0] === "es" ? "es" : "en"
  );
  const [initialLink, setInitialLink] = useState('')
  const [sdk, setSdk] = useState();

  useEffect(() => {
    const getWalletIdPost = async id => {
      const postBody = {
        userDeviceAddress: id
      };
      let response = await fetch(`${config.apiUrl}links/signup`, {
        method: "post",
        body: JSON.stringify(postBody)
      });
      return await response.json();
    };

    const setUp = async () => {
      const url = await Linking.getInitialURL();
      if (url) {
        if (url.indexOf("?id=") > -1) {
          const linkId = url.split("?id=")[1];
          const redeemLink = `${config.redeemLinkHost}/?id=${linkId}`;
          setInitialLink(redeemLink);
        }
      }

      const wallet = await configureContainer();
      setSdk(wallet);
      const deviceAdress = await AsyncStorage.getItem("deviceAddress");
      console.log('deviceAdress', deviceAdress, !deviceAdress);
      console.log('deviceAdress bool', !deviceAdress);
      
      if (!deviceAdress) {
        console.log('setting up inner');
        
        await AsyncStorage.setItem(
          "deviceAddress",
          wallet.state.device.address
        );
        const walletId = await getWalletIdPost(wallet.state.device.address);
        await AsyncStorage.setItem("accountAddress", walletId.accountAddress);
      }

      const accountAddress = await AsyncStorage.getItem("accountAddress");
      const connectWallet = await wallet.connectAccount(accountAddress);
      
      setCurrentWallet({
        balance: (Math.floor(weiToEth(wallet.state.account.balance.real) * 100) / 100).toFixed(2),
        sdk: wallet
      });
    };
    setUp();
  }, []);

  useInterval(async () => {
    if (sdk.state.account) {

      console.log('balance', weiToEth(sdk.state.account.balance.real));
      console.log('balance floor', Math.floor(weiToEth(sdk.state.account.balance.real) * 100) / 100);
      console.log('balance floor fixed', (Math.floor(weiToEth(sdk.state.account.balance.real) * 100) / 100).toFixed(2));
      
      setCurrentWallet({
        balance: (Math.floor(weiToEth(sdk.state.account.balance.real) * 100) / 100).toFixed(2),
        sdk
      });
    }
  }, 10000);

  return (
    <LanguageContext.Provider value={[currentLanguage]}>
      <InitialLinkContext.Provider value={[initialLink, setInitialLink]}>
        <CurrentWalletContext.Provider
          value={[currentWallet, setCurrentWallet]}
        >
          {children}
        </CurrentWalletContext.Provider>
      </InitialLinkContext.Provider>
    </LanguageContext.Provider>
  );
};

export default Store;
