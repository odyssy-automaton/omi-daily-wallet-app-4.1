import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { Button, TextInput, Share } from "react-native";
import { globalStyles } from "../constants/styles";
import { Formik } from "formik";
const SendForm = props => {
  onShare = async () => {
    try {
      const result = await Share.share({
        message:
          "React Native | A framework for building native apps using React"
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };
  return (
    <Formik
      initialValues={{ amount: "0" }}
      onSubmit={values => {
        onShare();
        console.log(values);
      }}
    >
      {props => (
        <View style={globalStyles.container}>
          <Text>You will send</Text>
          <Image source={require("../assets/diamond.png")} />
          <TextInput
            style={{ height: 40 }}
            onChangeText={props.handleChange("amount")}
            onBlur={props.handleBlur("amount")}
            value={props.values.amount}
            keyboardType="numeric"
            maxLength={10}
          />
          <Text style={globalStyles.currencyText}>DAI</Text>

          <Button onPress={props.handleSubmit} title="Create Link" />
        </View>
      )}
    </Formik>
  );
};
export default SendForm;
