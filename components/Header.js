import React from "react";
import { Text, View } from "react-native";

import { globalStyles } from "../constants/styles";

export default function Header(props) {
  return (
    <View style={globalStyles.Header}>
      <Text
        style={globalStyles.HeaderText}
        onPress={() => props.navigation.navigate("Home")}
      >
        DW
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
