import React, { useContext } from "react";
import { Text, View, TouchableOpacity, Clipboard } from "react-native";
import { globalStyles } from "../constants/styles";
import language from "../language";
import { CurrentWalletContext, LanguageContext } from "../contexts/Store";

export default function SettingsScreen(props) {
  const [currentLanguage] = useContext(LanguageContext);
  const [currentWallet] = useContext(CurrentWalletContext);

  setClipBoardContent = async content => {
    await Clipboard.setString(content);
  };

  return (
    <View style={globalStyles.containerSmall}>
      <Text style={globalStyles.HeadingOne}>
        {language[currentLanguage].settings.settings}
      </Text>

      {currentWallet && (
        <View style={globalStyles.padding}>
          <Text style={globalStyles.currencyHeading}>Wallet Address</Text>
          <Text style={globalStyles.paragraph}>
            {currentWallet.sdk.state.account.address}
          </Text>
          <TouchableOpacity
            onPress={() =>
              setClipBoardContent(currentWallet.sdk.state.account.address)
            }
          >
            <Text style={globalStyles.bigButtonText}>Copy Address</Text>
          </TouchableOpacity>
        </View>
      )}

      <Text
        style={globalStyles.bigButtonText}
        onPress={() => props.navigation.navigate("SendDirect")}
      >
        {language[currentLanguage].settings.sendDirect}
      </Text>
    </View>
  );
}
