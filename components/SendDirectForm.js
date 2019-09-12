import React, { useState, useContext } from "react";

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

import { ethToWei, weiToEth } from "@netgum/utils"; // returns BN
import { Formik } from "formik";
import { CurrentWalletContext, LanguageContext } from "../contexts/Store";
import useInterval from "../util/PollingUtil";

import language from "../language";
import { globalStyles } from "../constants/styles";

const SendDirectForm = () => {
  const [currentWallet] = useContext(CurrentWalletContext);
  const [currentLanguage] = useContext(LanguageContext);
  const [isLoading, setLoading] = useState(false);
  const [currencyInput, setCurrencyInput] = useState();
  const [watchDelay, setWatchDelay] = useState(null);
  const [watchCount, setWatchCount] = useState(0);

  useInterval(async () => {
    setWatchCount(watchCount + 1);
    if (watchCount > 5) {
      setWatchDelay(null);
      setWatchCount(0);
      setLoading(false);
    }
  }, watchDelay);

  setClipBoardContent = async content => {
    await Clipboard.setString(content);
  };

  return (
    <>
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
          const bnAmmount = ethToWei(values.amount);

          setLoading(true);
          try {
            const estimated = await sdk.estimateAccountTransaction(
              values.dest,
              bnAmmount,
              null
            );

            console.log(estimated);
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
        {props => (
          <View style={{ alignItems: "center", justifyContent: "center" }}>
            <View style={globalStyles.inputRow}>
              <TextInput
                style={globalStyles.inputText}
                onChangeText={props.handleChange("dest")}
                onBlur={props.handleBlur("dest")}
                value={props.values.dest}
                maxLength={25}
                placeholder={"Destination Address"}
              />
            </View>
            {props.errors.dest && (
              <Text style={globalStyles.ErrorMessage}>
                ! {props.errors.dest}
              </Text>
            )}

            <Text style={globalStyles.currencyHeading}>
              {language[currentLanguage].send.willSend}
            </Text>
            <Image source={require("../assets/diamond.png")} />
            <View>
              <TouchableOpacity
                onPress={() => currencyInput.focus()}
                disabled={props.isSubmitting}
              >
                <Text style={globalStyles.inputText}>
                  ${(props.values.amount / 100).toFixed(2)}
                </Text>
              </TouchableOpacity>
              <TextInput
                style={globalStyles.inputText}
                style={{ left: -500 }}
                onChangeText={props.handleChange("amount")}
                onBlur={props.handleBlur("amount")}
                value={props.values.amount}
                keyboardType="numeric"
                maxLength={10}
                placeholder={"0.00"}
                autoFocus={true}
                ref={ref => setCurrencyInput(ref)}
              />
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
              <View style={globalStyles.bigButtonView}>
                <Image
                  style={globalStyles.Icon}
                  source={require("../assets/send__black.png")}
                  resizeMode="contain"
                />
              </View>
            </TouchableOpacity>
          </View>
        )}
      </Formik>
    </>
  );
};

export default SendDirectForm;
