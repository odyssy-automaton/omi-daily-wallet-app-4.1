import React from "react";

import { Text, View, Image, TouchableOpacity } from "react-native";

import { globalStyles } from "../constants/styles";

export default function Header(props) {
  return (
    <View style={globalStyles.Header}>
      <TouchableOpacity onPress={() => props.navigation.navigate("Home")}>
        <Image
          source={require("../assets/DailyWallet__logo.png")}
          style={{ height: 25, width: 200 }}
          resizeMode="contain"
        />
      </TouchableOpacity>
      <Text
        style={globalStyles.HeaderText}
        onPress={() => props.navigation.navigate("Settings")}
      >
        . . .
      </Text>
    </View>
  );
}
