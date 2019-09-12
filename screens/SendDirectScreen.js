import React, {useState, useEffect} from "react";
import { StyleSheet, View, ActivityIndicator } from "react-native";
import * as Keychain from "react-native-keychain";

import SendDirectForm from "../components/SendDirectForm";
import CapturePin from "../components/CapturePin";
import { globalStyles } from "../constants/styles";

export default function SendScreen() {
  const [loggedIn, setLogIn] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [isFirstTimePin, setFirstTimePin] = useState(true);
  const [pin, setPin] = useState(null);

  const handleSuccess = () => {
    setLogIn(true);
  };

  const handleNewPin = async pin => {
    await Keychain.setGenericPassword("userPin", pin);
  };

  useEffect(() => {
    const checkPin = async () => {
      try {
        // Retreive the credentials

        const credentials = await Keychain.getGenericPassword();
        if (credentials) {
          setFirstTimePin(false);
          setPin(credentials.password);
        } else {
          setFirstTimePin(true);
        }
      } catch (error) {
        console.log("Keychain couldn't be accessed!", error);
      }

      setLoading(false);
    };

    checkPin();
  }, []);

  return (
    <View style={globalStyles.container}>
      {loggedIn ? (
        <SendDirectForm />
      ) : (
        <CapturePin
          pin={pin}
          onSuccess={handleSuccess}
          isFirstTimePin={isFirstTimePin}
          handleNewPin={handleNewPin}
        />
      )}
      {isLoading && (
        <View
          style={{
            ...StyleSheet.absoluteFillObject,
            backgroundColor: "rgba(255,255,255,.85)",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <ActivityIndicator size="large" />
        </View>
      )}
    </View>
  );
}
