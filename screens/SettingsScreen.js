import React from "react";
import { Text, View } from "react-native";
import { globalStyles } from "../constants/styles";

export default function SettingsScreen() {
  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.HeadingOne}>Settings</Text>
    </View>
  );
}
