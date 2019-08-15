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

import { CurrentWalletContext } from "../contexts/Store";

import config from "../config";
import useInterval from "../util/PollingUtil";

export default function RedeemScreen(props) {
  const [link, setLink] = useState();
  const [cbRedeemLink, setCbRedeemLink] = useState("");
  const [balanceWatch, setBalanceWatch] = useState();
  const [balanceUpdated, setBalanceUpdated] = useState(false);
  const [watchDelay, setWatchDelay] = useState(null);
  const [watchCount, setWatchCount] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);

  const [currentWallet] = useContext(CurrentWalletContext);

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
    console.log("watching,", balanceWatch, currentWallet.balance, watchCount);
    setWatchCount(watchCount + 1);
    if (+currentWallet.balance > +balanceWatch  || watchCount > 15) {
      setBalanceUpdated(true);
      setWatchDelay(null);
      setCbRedeemLink("");
    }
  }, watchDelay);

  const getClipBoard = async () => {
    const clipboadData = await Clipboard.getString("redeemLinkHost");
    console.log("clipboadData", clipboadData);
    //if(clipboadData.indexOf(config.redeemLinkHost)){
      setCbRedeemLink(clipboadData);
    //}
  };

  const fetchLink = async link => {
    if (link) {
      const linkId = link.split("?id=")[1];
      let response = await fetch(`${config.apiUrl}links/get/${linkId}`);
      response = await response.json();
      console.log("*********************", response);

      setLink(response);
    }
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
            <ActivityIndicator
              style={{ marginTop: 20 }}
              size="large"
              color="#0000ff"
            />
          ) : (
            <View style={globalStyles.container}>
              <Text style={globalStyles.currencyHeading}>Redeemed DAI</Text>

              <TouchableOpacity
                onPress={() => {
                  setModalVisible(false);
                  props.navigation.navigate("Home");
                }}
              >
                <View style={globalStyles.bigButtonView}>
                <Image
                  style={globalStyles.Icon}
                  source={require("../assets/diamond.png")}
                  resizeMode="contain"
                />
                </View>
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
            console.log(
              "redeem",
              link.linkId,
              currentWallet.sdk.state.account.address
            );
            setBalanceWatch(currentWallet.balance);
            setModalVisible(true);
            const redeemResponse = await redeemPut(
              link.linkId,
              currentWallet.sdk.state.account.address
            );
            //const redeemResponse = { success: true };
            console.log("redeemResponse", redeemResponse);
            if (!redeemResponse.error) {
              setLink("");
              setWatchDelay(1000);
              
            } else {
              //errors.redeemLink = redeemResponse.error;
              setModalVisible(false);
              setStatus(redeemResponse.error)
            }
            //setSubmitting
          }}
          validate={values => {
            let errors = {};
            if (!values.redeemLink) {
              errors.redeemLink = "Required";
            }
            return errors;
          }}
        >
          {props => (
            <View style={{ alignItems: "center", justifyContent: "center" }}>
              {link ? (
                <View style={globalStyles.container}>
                  <CurrencyIndicator
                    label="You will redeem"
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
                {props.errors.redeemLink && <Text>{props.errors.redeemLink}</Text>}

                </View>
              ) : (
                <View style={globalStyles.container}>
                  <Text style={globalStyles.currencyHeading}>Redeem</Text>
                  {cbRedeemLink ? (<Text>Link Imported</Text>) :
                  (<Text>Import Link</Text>)}

                  <TextInput
                    style={{ left: -500 }}
                    value={props.values.redeemLink}
                    onChangeText={props.handleChange("redeemLink")}
                    onBlur={props.handleBlur("redeemLink")}
                    maxLength={100}
                  />
                  {props.errors.redeemLink && (
                    <Text>{props.errors.redeemLink}</Text>
                  )}
                  <Button
                    onPress={() => getClipBoard()}
                    title="check clipboad"
                  />
                  <TouchableOpacity
                    onPress={() => fetchLink(props.values.redeemLink)}
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
                </View>
              )}
            </View>
          )}
        </Formik>
      </Fragment>
    </View>
  );
}
