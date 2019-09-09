import React, { useContext } from "react";
import { Text, View } from "react-native";
import { globalStyles } from "../constants/styles";
import language from "../language";
import { LanguageContext } from "../contexts/Store";

export default function SettingsScreen() {
  const [currentLanguage] = useContext(LanguageContext);

  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.HeadingOne}>
        {language[currentLanguage].settings.settings}
      </Text>
      <Text
        style={globalStyles.HeaderText}
        onPress={() => props.navigation.navigate("SendDirect")}
      >
        Send to Xdai Wallet
      </Text>
    </View>
  );
}
