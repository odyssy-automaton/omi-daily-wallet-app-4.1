import React, { useState } from "react";
import { Text, View, Button, Image, TextInput } from "react-native";
import CurrencyIndicator from "../components/CurrencyIndicator";
import { globalStyles } from "../constants/styles";

export default function CapturePin(props) {
  const [pin, setPin] = useState("");
  if (pin.length === 4) {
      setPin("");
      if(props.isFirstTimePin) {
        props.handleNewPin(pin);
        //TODO: notify user of succcess
        props.onSuccess();
      }
    if (pin === props.pin) {
      props.onSuccess();
    } else {
      
    }
  }
  
  const label = props.isFirstTimePin ? "Enter a new 4 digit PIN" : "Enter your 4 digit PIN";

  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.HeadingOne}>{label}</Text>
      <View style={globalStyles.PinRow}>
        <Text style={globalStyles.Pin}>{pin.charAt(0)}</Text>
        <Text style={globalStyles.Pin}>{pin.charAt(1)}</Text>
        <Text style={globalStyles.Pin}>{pin.charAt(2)}</Text>
        <Text style={globalStyles.Pin}>{pin.charAt(3)}</Text>
      </View>
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
