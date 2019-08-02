import React, { useState } from "react";
import { Text, View, Button, Image, TextInput } from "react-native";
import CurrencyIndicator from "../components/CurrencyIndicator";
import { globalStyles } from "../constants/styles";

export default function CapturePin(props) {
  const [pin, setPin] = useState("");
  if (pin.length === 4) {
      setPin("");
    if (pin === props.pin) {
      props.onSuccess();
    } else {
      
    }
  }

  return (
    <View style={globalStyles.container}>
      <Text style={{fontSize: 40}}>{pin}</Text>
      <TextInput
        style={{ left: -500 }}
        onChangeText={text => setPin(text)}
        value={pin}
        autoFocus={true}
        keyboardType="number-pad"
      />
    </View>
  );
}
