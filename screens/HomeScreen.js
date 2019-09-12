import React, { useContext, useEffect } from "react";
import { View, Image, TouchableOpacity, ImageBackground } from "react-native";
import CurrencyIndicator from "../components/CurrencyIndicator";
import { globalStyles } from "../constants/styles";
import language from "../language";
import { CurrentWalletContext, LanguageContext, InitialLinkContext } from "../contexts/Store";

export default function HomeScreen(props) {
  const [currentWallet] = useContext(CurrentWalletContext);
  const [currentLanguage] = useContext(LanguageContext);
  const [initialLink] = useContext(InitialLinkContext);

  useEffect(() => {
    initialLinkCheck = async () => {
      if (initialLink !== '') {
        props.navigation.navigate("Redeem");
      }
    };
    initialLinkCheck();
  }, []);

  return (
    <View style={globalStyles.container}>
      <ImageBackground
        source={require("../assets/bubbles.png")}
        style={{ width: "100%", height: "100%" }}
      >
        <View style={globalStyles.container}>
          {currentWallet ? (
            <CurrencyIndicator
              label={language[currentLanguage].home.balance}
              amount={"$" + currentWallet.balance}
            />
          ) : (
            <CurrencyIndicator
              label={language[currentLanguage].global.loading}
              amount={"..."}
            />
          )}
          <View style={globalStyles.flexRow}>
            <TouchableOpacity
              onPress={() => props.navigation.navigate("Redeem")}
            >
              <View style={globalStyles.bigButtonView}>
                <Image
                  style={globalStyles.Icon}
                  source={require("../assets/receive__black.png")}
                  style={{ height: 100, width: 100 }}
                  resizeMode="contain"
                />
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => props.navigation.navigate("Send")}>
              <View style={globalStyles.bigButtonView}>
                <Image
                  style={globalStyles.Icon}
                  source={require("../assets/send__black.png")}
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
