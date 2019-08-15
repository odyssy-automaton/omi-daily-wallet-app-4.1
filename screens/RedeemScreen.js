import React, { useEffect, useState, Fragment } from "react";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  Clipboard,
  TextInput,
  Button
} from "react-native";
import { Formik } from "formik";

import CurrencyIndicator from "../components/CurrencyIndicator";
import { globalStyles } from "../constants/styles";

import config from "../config";

export default function RedeemScreen() {
  const [link, setLink] = useState();
  const [cbRedeemLink, setCbRedeemLink] = useState("");

  // get link in clipboad with param id=
  // validate right host
  // hit links/get/ <with id param>
  // will return valid or not and value amount
  // ask if user wants to redeem
  // hit redeem endpoint
  // success or error
  // on success watch balance for update, show loader with cancel button
  // on balance update show you have recieved 'value' confetti

  const getClipBoard = async () => {
    const clipboadData = await Clipboard.getString("redeemLinkHost");
    console.log("clipboadData", clipboadData);
    setCbRedeemLink(clipboadData);
  };

  const fetchLink = async link => {
    if (link) {
      const linkId = clipboadData.split("?id=")[1];
      let response = await fetch(`${config.apiUrl}links/get/${linkId}`);
      response = await response.json();
      console.log("*********************", response);

      setLink(response);
    }
  };

  // useEffect(() => {
  //   fetchLink();
  // }, []);

  return (
    <View style={globalStyles.container}>
      <Text>LINK: {cbRedeemLink}</Text>
      <Fragment>
        <Formik
          enableReinitialize
          initialValues={{ redeemLink: cbRedeemLink }}
          onSubmit={async (values, { setSubmitting }) => {
            console.log("redeem");
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
              <Text style={globalStyles.currencyHeading}>Redeem</Text>
              <View style={globalStyles.inputRow}>
                <TextInput
                  style={{ border: 1, borderColor: "blue" }}
                  value={props.values.redeemLink}
                  onChangeText={props.handleChange("redeemLink")}
                  onBlur={props.handleBlur("redeemLink")}
                  maxLength={100}
                />
                <Text style={globalStyles.inputTextRight}>URL</Text>
              </View>
              {props.errors.redeemLink && (
                <Text>! {props.errors.redeemLink}</Text>
              )}
              <Button onPress={() => getClipBoard()} title="check clipboad" />
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
              {link && (
                <View>
                  <CurrencyIndicator label="You will redeem" amount={` DAI`} />
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
                </View>
              )}
            </View>
          )}
        </Formik>
      </Fragment>
    </View>
  );
}
