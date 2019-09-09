import React, { useState, useContext } from "react";

import { StyleSheet, View, ActivityIndicator } from "react-native";

import { ethToWei } from "@netgum/utils"; // returns BN
import { Formik, Form, Field, ErrorMessage } from "formik";
import { CurrentWalletContext } from "../contexts/Store";

const SendDirectForm = () => {
  const [currentWallet] = useContext(CurrentWalletContext);
  const [isLoading, setLoading] = useState(true);

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

      <h2>Send xDai from your wallet to another</h2>
      <h3>Acct: {currentWallet.wallet.state.account}</h3>

      <Formik
        initialValues={{
          amount: "",
          addr: currentWallet.wallet.state.account,
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
                `You need more gas, at least: ${web3Service.fromWei(
                  estimated.totalCost.toString()
                )}`
              );
              setLoading(false);
              setSubmitting(false);
              return false;
            }

            const hash = await sdk.submitAccountTransaction(estimated);
          } catch (err) {
            console.log(err);
            alert(`Something went wrong. please try again`);
          }

          resetForm();
          setLoading(false);
          setSubmitting(false);
        }}
      >
        {(props) => (


          <View style={{ alignItems: "center", justifyContent: "center" }}>
            <Text style={globalStyles.currencyHeading}>
              {language[currentLanguage].send.willSend}
            </Text>
            <Image source={require("../assets/diamond.png")} />
            <View style={globalStyles.inputRow}>
              <Text style={globalStyles.inputText}>{(props.values.amount/100).toFixed(2)}</Text>
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
              />
              <Text style={globalStyles.inputTextRight}>DAI</Text>
            </View>
            {props.errors.amount && (
              <Text style={globalStyles.ErrorMessage}>
                ! {props.errors.amount}
              </Text>
            )}
            <TouchableOpacity
              onPress={props.handleSubmit}
              disabled={props.isSubmitting || submitToModal}
            >
              <View style={globalStyles.bigButtonView}>
                <Image
                  style={globalStyles.Icon}
                  source={require("../assets/send.png")}
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
