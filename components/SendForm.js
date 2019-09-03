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
import language from "../language";
import config from "../config";
import { CurrentWalletContext, LanguageContext } from "../contexts/Store";

//console.log(globalStyles);
const SendForm = props => {
  const [currentWallet] = useContext(CurrentWalletContext);
  const [currentLanguage] = useContext(LanguageContext);
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
    let response = await fetch(`${config.apiUrl}links/send`, {
      method: "post",
      body: JSON.stringify(postBody)
    });
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
              <Text style={globalStyles.HeadingOne}>Send {amount} DAI</Text>
              <Text style={globalStyles.paragraph}>
                {language[currentLanguage].send.shareSimple}
              </Text>
              {/* <Text style={globalStyles.textLink}>{sendLink}</Text> */}
              <View style={globalStyles.qrCode}>
                <QRCode value={sendLink} size="120" />
              </View>

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
                <Text style={globalStyles.bigButtonText}>
                  {language[currentLanguage].send.copy}
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </Modal>
      <Formik
        initialValues={{ amount: "" }}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          setAmount(values.amount/100);
          setModalVisible(true);

          const accountAddress = await AsyncStorage.getItem("accountAddress");
          const sendObj = await getSendLinkPost(values.amount/100, accountAddress);
          setSendLink(sendObj.url);
          setSubmitting(false);
          resetForm();
        }}
        validate={values => {
          let errors = {};
          if (!values.amount) {
            errors.amount = language[currentLanguage].send.required;
          }
          if (parseFloat(values.amount)/100 > parseFloat(currentWallet.balance)) {
            errors.amount = language[currentLanguage].send.fundsError;
          }
          return errors;
        }}
      >
        {props => (
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
    </View>
  );
};
export default SendForm;
