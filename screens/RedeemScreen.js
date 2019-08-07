import React, { useEffect, useState, Fragment } from "react";
import { Text, View, Image, TouchableOpacity } from "react-native";
import CurrencyIndicator from "../components/CurrencyIndicator";
import { globalStyles } from "../constants/styles";

import config from "../config";

export default function RedeemScreen() {
  const [link, setLink] = useState({});

  const fetchLink = async () => {
    let response = await fetch(
      `${config.apiUrl}links/get/5e04532a1bbc8d364ec509023e369899`
    );
    response = await response.json();
    setLink(response);
  };

  useEffect(() => {
    fetchLink();
  }, []);

  return (
    <View style={globalStyles.container}>
      {link.amount ? (
        <Fragment>
          <CurrencyIndicator
            label="You will redeem"
            amount={`${link.amount} DAI`}
          />
          <TouchableOpacity>
            <Text style={globalStyles.bigButton}>
              <Image 
                style={globalStyles.Icon}
                source={require("../assets/receive.png")}
                resizeMode="contain"
              />
            </Text>
          </TouchableOpacity>
        </Fragment>
      ) : (
        <Text>Looking for link in your clipboard...</Text>
      )}
    </View>
  );
}
