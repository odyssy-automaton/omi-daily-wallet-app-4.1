import React from "react";
import { Text, View, Image } from "react-native";

import { globalStyles } from "../constants/styles";

export default function Header(props) {
  return (
    <View style={globalStyles.Header}>
      <Text onPress={() => props.navigation.navigate("Home")}>
        <Image 
          source={require("../assets/DailyWallet__logo.png")}
          style={{height: 25, width: 200}}
          resizeMode="contain"
        />
      </Text>
      <Text
        style={globalStyles.HeaderText}
        onPress={() => props.navigation.navigate("Settings")}
      >
        . . .
      </Text>
    </View>
  );
}
