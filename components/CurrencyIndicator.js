import React from "react";
import { StyleSheet, Text, View, Button, Image } from "react-native";
import { globalStyles } from "../constants/styles";
export default function CurrencyIndicator(props) {
  return (
    <View style={{ alignItems: "center", justifyContent: "center" }}>
      <Text>{props.label}</Text>
      <Image source={require("../assets/diamond.png")} />
      <Text style={globalStyles.currencyText}>{props.amount}</Text>
    </View>
  );
}
