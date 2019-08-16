import React, { useState, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  TextInput,
  Share,
  Modal,
  TouchableOpacity,
  ActivityIndicator,
  Clipboard
} from "react-native";
import AsyncStorage from "@react-native-community/async-storage";

import { globalStyles } from "../constants/styles";
import { Formik } from "formik";
import QRCode from "react-qr-code";
import { CurrentWalletContext } from "../contexts/Store";

//console.log(globalStyles);
const SendForm = props => {
  const [currentWallet] = useContext(CurrentWalletContext);
  const [modalVisible, setModalVisible] = useState(false);
  const [sendLink, setSendLink] = useState("");
  const [amount, setAmount] = useState(false);
  const [submitToModal, setsubmitToModal] = useState(false);

  console.log("send current balance", currentWallet.balance);

  setClipBoardContent = async content => {
    await Clipboard.setString(content);
  };

  onShare = async () => {
    try {
      const result = await Share.share({
        message: sendLink
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          console.log(result.activityType);
        } else {
          console.log("Shared", result);
        }
      } else if (result.action === Share.dismissedAction) {
        console.log("dismissed");
        // dismissed
      }
    } catch (error) {
      console.log(error);
      setClipBoardContent("https://vimeo.com/331858758");
    }
  };

  getSendLinkPost = async (amount, senderAddress) => {
    const postBody = {
      amount,
      senderAddress
    };
    let response = await fetch(
      `https://rx4y9fk2r8.execute-api.us-east-1.amazonaws.com/dev/links/send`,
      {
        method: "post",
        body: JSON.stringify(postBody)
      }
    );
    return await response.json();
  };

  return (
    <View style={{ alignItems: "center", justifyContent: "center" }}>
      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => {
          setSendLink("");
          setModalVisible(false);
        }}
      >
        <View style={globalStyles.container}>
          {!sendLink ? (
            <ActivityIndicator
              style={{ marginTop: 20 }}
              size="large"
              color="#0000ff"
            />
          ) : (
            <View style={globalStyles.container}>
              {/* <Button
                title="Cancel"
                onPress={() => {
                  setModalVisible(false);
                }}
              /> */}
              <Text style={globalStyles.currencyHeading}>
                Send {amount} DAI
              </Text>
              <Text>Share with QR or press button for link</Text>
              {/* <Text style={globalStyles.textLink}>{sendLink}</Text> */}
              <QRCode value={sendLink} />

              <TouchableOpacity
                onPress={() => {
                  onShare();
                  setModalVisible(false);
                }}
                disabled={props.isSubmitting || submitToModal}
              >
                <View style={globalStyles.bigButtonView}>
                  <Image
                    style={globalStyles.Icon}
                    source={require("../assets/link.png")}
                    resizeMode="contain"
                  />
                </View>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </Modal>
      <Formik
        initialValues={{ amount: "" }}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          setAmount(values.amount);
          setModalVisible(true);

          const accountAddress = await AsyncStorage.getItem("accountAddress");
          const sendObj = await getSendLinkPost(values.amount, accountAddress);
          setSendLink(sendObj.url);
          setSubmitting(false);
          resetForm();
        }}
        validate={values => {
          let errors = {};
          if (!values.amount) {
            errors.amount = "Required";
          }
          if (parseFloat(values.amount) > parseFloat(currentWallet.balance)) {
            errors.amount = "Not enough funds to send that much";
          }
          return errors;
        }}
      >
        {props => (
          <View style={{ alignItems: "center", justifyContent: "center" }}>
            <Text style={globalStyles.currencyHeading}>You will send</Text>
            <Image source={require("../assets/diamond.png")} />
            <View style={globalStyles.inputRow}>
              <TextInput
                style={globalStyles.inputText}
                onChangeText={props.handleChange("amount")}
                onBlur={props.handleBlur("amount")}
                value={props.values.amount}
                keyboardType="numeric"
                maxLength={10}
                placeholder={"0.00"}
              />
              <Text style={globalStyles.inputTextRight}>DAI</Text>
            </View>
            {props.errors.amount && <Text>! {props.errors.amount}</Text>}
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
    </View>
  );
};
export default SendForm;
