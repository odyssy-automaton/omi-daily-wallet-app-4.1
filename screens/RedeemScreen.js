import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import CurrencyIndicator from "../components/CurrencyIndicator";
import { globalStyles } from "../constants/styles";

export default function RedeemScreen() {
  return (
    <View>
      <Text>Redeem Screen</Text>
      <CurrencyIndicator label="You will redeem" amount="5.00 DAI" />
    </View>
  );
}
