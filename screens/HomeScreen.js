import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity, ImageBackground } from "react-native";
import CurrencyIndicator from "../components/CurrencyIndicator";
import { globalStyles } from "../constants/styles";
import language from "../language";

console.log(language);

export default function HomeScreen(props) {
  return (
    <View style={globalStyles.container}>
    <ImageBackground source={require("../assets/bubbles.png")} style={{width: '100%', height: '100%'}}>
    <View style={globalStyles.container}>
      <CurrencyIndicator label={language.balance} amount="5.00 DAI" />
      <View style={globalStyles.flexRow}>
        <TouchableOpacity onPress={() => props.navigation.navigate("Redeem")}>
          <Text style={globalStyles.bigButton}>
            <Image 
              style={globalStyles.Icon}
              source={require("../assets/receive.png")}
              style={{height: 100, width: 100}}
              resizeMode="contain"
            />
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => props.navigation.navigate("Send")}>
          <Text style={globalStyles.bigButton}>
            <Image 
              style={globalStyles.Icon}
              source={require("../assets/send.png")}
              style={{height: 100, width: 100}}
              resizeMode="contain"
            />
        </Text>
        </TouchableOpacity>
      </View>
    </View>
    </ImageBackground>
    </View>
  );
}
