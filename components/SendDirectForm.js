import React, { useState, useEffect, useContext } from "react";

import {
  Text,
  StyleSheet,
  View,
  ActivityIndicator,
  TouchableOpacity,
  Clipboard,
  TextInput,
  Image
} from "react-native";
import { withNavigation } from 'react-navigation';

import { ethToWei, weiToEth } from "@netgum/utils"; // returns BN
import { Formik } from "formik";
import { CurrentWalletContext, LanguageContext } from "../contexts/Store";
import useInterval from "../util/PollingUtil";

import language from "../language";
import { globalStyles } from "../constants/styles";

const SendDirectForm = props => {
  const [currentWallet] = useContext(CurrentWalletContext);
  const [currentLanguage] = useContext(LanguageContext);
  const [isLoading, setLoading] = useState(false);
  const [currencyInput, setCurrencyInput] = useState();
  const [watchDelay, setWatchDelay] = useState(null);
  const [watchCount, setWatchCount] = useState(0);
  const [destAddr, setDestAddr] = useState("");

  useInterval(async () => {
    setWatchCount(watchCount + 1);
    if (watchCount > 5) {
      setWatchDelay(null);
      setWatchCount(0);
      setLoading(false);
      
      props.navigation.navigate("Home");
    }
  }, watchDelay);

  getClipBoardContent = async () => {
    return await Clipboard.getString();
  };

  return (
    <>
      {isLoading ? (
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
      ) : (
        <>
          <Text style={globalStyles.currencyHeading}>
            {language[currentLanguage].sendDirect.willSend}
          </Text>

          <Formik
            initialValues={{
              amount: "",
              addr: currentWallet.sdk.state.account.address,
              dest: ""

            }}
            validate={values => {
              let errors = {};
              if (!values.amount) {
                errors.amount = "Required";
              }
              if (!values.dest) {
                errors.dest = "Required";
              }

              return errors;
            }}
            onSubmit={async (values, { setSubmitting, resetForm }) => {
              const sdk = currentWallet.sdk;
              const bnAmount = ethToWei(+values.amount / 100);


              setLoading(true);
              try {
                const estimated = await sdk.estimateAccountTransaction(
                  values.dest,
                  bnAmount,
                  null
                );

                if (ethToWei(currentWallet.balance).lt(estimated.totalCost)) {
                  alert(
                    `You need more gas, at least: ${weiToEth(
                      estimated.totalCost.toString()
                    )}`
                  );
                  setLoading(false);
                  setWatchDelay(null);
                  setSubmitting(false);
                  return false;
                }

                const hash = await sdk.submitAccountTransaction(estimated);
              } catch (err) {
                console.log(err);
                console.log(
                  "account state account",
                  currentWallet.sdk.state.account
                );

                setWatchDelay(null);
                setLoading(false);
                alert(`Something went wrong. please try again`);
              }

              resetForm();

              setWatchDelay(1000);
              setSubmitting(false);
            }}
          >
            {props => {
              return (
                <View
                  style={{
                    alignItems: "center",
                    justifyContent: "center"
                  }}
                >
                  <TouchableOpacity
                    onPress={async () => {
                      //returns promise
                      props.values.dest = await getClipBoardContent();
                      currencyInput.focus();
                    }}
                    disabled={props.isSubmitting}
                  >
                    <Text style={globalStyles.inputTextSmall}>
                      {!props.values.dest
                        ? language[currentLanguage].sendDirect.pasteAddr
                        : props.values.dest}
                    </Text>
                  </TouchableOpacity>
                  {props.errors.dest && (
                    <Text style={globalStyles.ErrorMessage}>
                      ! {props.errors.dest}
                    </Text>
                  )}

                  <Text style={globalStyles.currencyHeading}>
                    {language[currentLanguage].send.willSend}
                  </Text>
                  <View>
                    <TouchableOpacity
                      onPress={() => currencyInput.focus()}
                      disabled={props.isSubmitting}
                    >
                      <Text style={globalStyles.currencyHeading}>
                        ${(props.values.amount / 100).toFixed(2)}
                      </Text>

                    </TouchableOpacity>
                  </View>
                  {props.errors.amount && (
                    <Text style={globalStyles.ErrorMessage}>
                      ! {props.errors.amount}
                    </Text>
                  )}
                  <TouchableOpacity
                    onPress={props.handleSubmit}
                    disabled={props.isSubmitting}
                  >
                    <View style={globalStyles.smallButtonView}>
                      <Text>{language[currentLanguage].sendDirect.continue}</Text>
                    </View>
                  </TouchableOpacity>
                  <View style={globalStyles.inputRowSmall}>
                    <TextInput
                      style={{ left: -500 }}
                      onChangeText={props.handleChange("dest")}
                      value={props.values.dest}
                      maxLength={50}
                    />
                    <TextInput
                      style={{ left: -500 }}
                      onChangeText={props.handleChange("amount")}
                      value={props.values.amount}
                      keyboardType="number-pad"
                      maxLength={10}
                      placeholder={"0.00"}
                      ref={ref => setCurrencyInput(ref)}
                    />
                  </View>
                </View>
              );
            }}

          </Formik>
        </>
      )}
    </>
  );
};

export default withNavigation(SendDirectForm);
