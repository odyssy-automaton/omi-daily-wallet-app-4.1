import React, {useContext} from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ImageBackground
} from "react-native";
import CurrencyIndicator from "../components/CurrencyIndicator";
import { globalStyles } from "../constants/styles";
import language from "../language";
import { CurrentWalletContext, LanguageContext } from "../contexts/Store";

console.log(language);

export default function HomeScreen(props) {
  const [currentWallet] = useContext(CurrentWalletContext);
  const [currentLanguage] = useContext(LanguageContext);
  
  return (
    <View style={globalStyles.container}>
      <ImageBackground
        source={require("../assets/bubbles.png")}
        style={{ width: "100%", height: "100%" }}
      >
        <View style={globalStyles.container}>
          <CurrencyIndicator label={language[currentLanguage].balance} amount={currentWallet.balance + ' DAI'} />
          <View style={globalStyles.flexRow}>
            <TouchableOpacity
              onPress={() => props.navigation.navigate("Redeem")}
            >
              <View style={globalStyles.bigButtonView}>
                <Image
                  style={globalStyles.Icon}
                  source={require("../assets/receive.png")}
                  style={{ height: 100, width: 100 }}
                  resizeMode="contain"
                />
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => props.navigation.navigate("Send")}>

            <View style={globalStyles.bigButtonView}>
                <Image
                  style={globalStyles.Icon}
                  source={require("../assets/send.png")}
                  style={{ height: 100, width: 100 }}
                  resizeMode="contain"
                />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}
