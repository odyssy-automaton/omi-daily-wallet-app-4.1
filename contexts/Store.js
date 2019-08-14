import React, { useState, useEffect, createContext } from "react";
import AsyncStorage from "@react-native-community/async-storage";

import { ethToWei, weiToEth } from '@netgum/utils';

import useInterval from "../util/PollingUtil";
import { configureContainer } from "../configSdk";

export const CurrentWalletContext = createContext({
  balance: 0,
  sdk: null
});

const Store = ({ children }) => {
  const [currentWallet, setCurrentWallet] = useState();
  const [sdk, setSdk] = useState();

  useEffect(() => {
    const getWalletIdPost = async id => {
      const postBody = {
        userDeviceAddress: id
      };
      let response = await fetch(
        `https://rx4y9fk2r8.execute-api.us-east-1.amazonaws.com/dev/links/signup`,
        {
          method: "post",
          body: JSON.stringify(postBody)
        }
      );
      return await response.json();
    };

    const setUp = async () => {
      const wallet = await configureContainer();
      setSdk(wallet);
      const deviceAdress = await AsyncStorage.getItem('deviceAddress');
      console.log('deviceAdress', deviceAdress);
      
      if(!deviceAdress){
        await AsyncStorage.setItem('deviceAddress', wallet.state.device.address);
        const walletId = await getWalletIdPost(wallet.state.device.address);
        await AsyncStorage.setItem('accountAddress', walletId.accountAddress);
      }

      const accountAddress = await AsyncStorage.getItem('accountAddress')

      const connectWallet = await wallet.connectAccount(
        accountAddress
      );

      console.log('connectWallet', connectWallet);

      setCurrentWallet({
        balance: weiToEth(wallet.state.account.balance.real).toString(),
        sdk: wallet
      });
    };
    setUp();
  }, []);

  useInterval(async () => {
    console.log("interval");
    console.log(sdk.state.initialized);
    console.log("account sdk?", sdk.state.account);
    console.log(
      "wallet account balance >>: ",
      weiToEth(sdk.state.account.balance.real).toString()
    );
    setCurrentWallet({
        balance: weiToEth(sdk.state.account.balance.real).toString(),
        sdk
      });
  }, 10000);

  return (
    <CurrentWalletContext.Provider value={[currentWallet, setCurrentWallet]}>
      {children}
    </CurrentWalletContext.Provider>
  );
};

export default Store;
