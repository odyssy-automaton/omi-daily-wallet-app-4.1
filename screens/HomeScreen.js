import React from "react";
import { StyleSheet, Text, View, Button, Image } from "react-native";
import CurrencyIndicator from "../components/CurrencyIndicator";
import { globalStyles } from "../constants/styles";

export default function HomeScreen(props) {
  return (
    <View style={globalStyles.container}>
      <CurrencyIndicator label="Balance" amount="5.00 DAI" />
      <Button
        title="Redeem"
        onPress={() => props.navigation.navigate("Redeem")}
      />
      <Button title="Send" onPress={() => props.navigation.navigate("Send")} />
    </View>
  );
}
