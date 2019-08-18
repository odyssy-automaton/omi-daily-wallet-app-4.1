import React, { useEffect, useState, useContext, Fragment } from "react";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  Clipboard,
  TextInput,
  Button,
  Modal,
  ActivityIndicator
} from "react-native";
import { Formik } from "formik";

import CurrencyIndicator from "../components/CurrencyIndicator";
import { globalStyles } from "../constants/styles";
import language from "../language";
import { CurrentWalletContext, LanguageContext } from "../contexts/Store";

import config from "../config";
import useInterval from "../util/PollingUtil";

export default function RedeemScreen(props) {
  const [link, setLink] = useState();
  const [cbRedeemLink, setCbRedeemLink] = useState("");
  const [invalidLinkError, setInvalidLinkError] = useState("");
  const [balanceWatch, setBalanceWatch] = useState();
  const [balanceUpdated, setBalanceUpdated] = useState(false);
  const [watchDelay, setWatchDelay] = useState(null);
  const [watchCount, setWatchCount] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);

  const [currentWallet] = useContext(CurrentWalletContext);
  const [currentLanguage] = useContext(LanguageContext);

  // get link in clipboad with param id=
  // validate right host
  // hit links/get/ <with id param>
  // will return valid or not and value amount
  // ask if user wants to redeem
  // hit redeem endpoint
  // success or error
  // on success watch balance for update, show loader with cancel button
  // on balance update show you have recieved 'value' confetti

  useInterval(async () => {
    // console.log("watching,", balanceWatch, currentWallet.balance, watchCount);
    setWatchCount(watchCount + 1);
    if (+currentWallet.balance > +balanceWatch || watchCount > 15) {
      setBalanceUpdated(true);
      setWatchDelay(null);
      setCbRedeemLink("");
    }
  }, watchDelay);

  const getClipBoard = async () => {
    setInvalidLinkError("");
    const clipboadData = await Clipboard.getString("redeemLinkHost");
    if (clipboadData.indexOf(config.redeemLinkHost) > -1) {
      setCbRedeemLink(clipboadData);
      const res = await fetchLink(clipboadData);
      if (res.error) {
        setInvalidLinkError(res.error);
        setCbRedeemLink("");
        setLink("");
      } else {
        setInvalidLinkError("");
        setLink(res);
      }
    } else {
      setInvalidLinkError('Invalid or No Link');
    }
  };

  const fetchLink = async link => {
    if (link) {
      const linkId = link.split("?id=")[1];
      let response = await fetch(`${config.apiUrl}links/get/${linkId}`);
      response = await response.json();

      return response;
    }
    return { error: "Invalid or No Link" };
  };

  const redeemPut = async (linkId, redeemAddress) => {
    console.log("redeem!", linkId, redeemAddress);

    const putBody = {
      linkId,
      redeemAddress
    };
    let response = await fetch(`${config.apiUrl}links/redeem`, {
      method: "put",
      body: JSON.stringify(putBody)
    });

    return await response.json();
  };

  return (
    <View style={globalStyles.container}>
      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <View style={globalStyles.container}>
          {!balanceUpdated ? (
            <Fragment>
            <Text style={globalStyles.currencyHeading}>Redeeming DAI</Text>
            <ActivityIndicator
              style={{ marginTop: 20 }}
              size="large"
              color="#0000ff"
            />
            </Fragment>
          ) : (
            <View style={globalStyles.container}>
              <Text style={globalStyles.currencyHeading}>{language[currentLanguage].redeem.success}</Text>

              <TouchableOpacity
                onPress={() => {
                  setModalVisible(false);
                  props.navigation.navigate("Home");
                }}
              >
                  <Text>🎉 {link.amount} DAI 🎉</Text>
                  <Text> Return Home</Text>

              </TouchableOpacity>
            </View>
          )}
        </View>
      </Modal>

      <Fragment>
        <Formik
          enableReinitialize
          initialValues={{ redeemLink: cbRedeemLink }}
          onSubmit={async (values, { setSubmitting, setStatus }) => {
            setStatus(null);
            setBalanceWatch(currentWallet.balance);
            setModalVisible(true);
            const redeemResponse = await redeemPut(
              link.linkId,
              currentWallet.sdk.state.account.address
            );
            console.log("redeemResponse", redeemResponse);
            if (!redeemResponse.error) {
              setWatchDelay(1000);
            } else {
              setModalVisible(false);
              setStatus(redeemResponse.error);
            }
            setSubmitting(false);
          }}
          validate={values => {
            let errors = {};
            if (!values.redeemLink) {
              errors.redeemLink = language[currentLanguage].send.required;
            }
            return errors;
          }}
        >
          {props => (
            <View style={{ alignItems: "center", justifyContent: "center" }}>
              {link ? (
                <View style={globalStyles.container}>
                  <CurrencyIndicator
                    label={language[currentLanguage].redeem.willRedeem}
                    amount={`${link.amount} DAI`}
                  />

                  <TouchableOpacity
                    onPress={props.handleSubmit}
                    disabled={props.isSubmitting}
                  >
                    <View style={globalStyles.bigButtonView}>
                      <Image
                        style={globalStyles.Icon}
                        source={require("../assets/receive.png")}
                        resizeMode="contain"
                      />
                    </View>
                  </TouchableOpacity>
                  {props.status && (
                    <Text style={{ paddingTop: 10 }}>{props.status}</Text>
                  )}
                </View>
              ) : (
                <View style={globalStyles.container}>
                  <Text style={globalStyles.currencyHeading}>
                    {language[currentLanguage].redeem.import}
                  </Text>
                  {cbRedeemLink ? (
                    <Text>{language[currentLanguage].redeem.imported}</Text>
                  ) : (
                    <Button
                      onPress={() => getClipBoard()}
                      title="Check Clipboard"
                    />
                  )}

                  <TextInput
                    style={{ left: -500 }}
                    value={props.values.redeemLink}
                    onChangeText={props.handleChange("redeemLink")}
                    onBlur={props.handleBlur("redeemLink")}
                    maxLength={100}
                  />
                  {props.errors.redeemLink ? (
                    <Text style={{ paddingTop: 10 }}>
                      {props.errors.redeemLink}
                    </Text>
                  ): null}
                  {invalidLinkError ? (
                    <Text style={{ paddingTop: 10 }}>{invalidLinkError}</Text>
                  ): null}
                </View>
              )}
            </View>
          )}
        </Formik>
      </Fragment>
    </View>
  );
}
