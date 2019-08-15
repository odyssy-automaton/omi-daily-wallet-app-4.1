import React, { useEffect, useState, Fragment } from "react";
import { Text, View, Image, TouchableOpacity, Clipboard } from "react-native";
import CurrencyIndicator from "../components/CurrencyIndicator";
import { globalStyles } from "../constants/styles";

import config from "../config";

export default function RedeemScreen() {
  const [link, setLink] = useState();

  // get link in clipboad with param id=
  // validate right host
  // hit links/get/ <with id param>
  // will return valid or not and value amount
  // ask if user wants to redeem
  // hit redeem endpoint
  // success or error
  // on success watch balance for update, show loader with cancel button
  // on balance update show you have recieved 'value' confetti

  const fetchLink = async () => {
    const clipboadData = Clipboard.getString();

    if (clipboadData.indexOf(config.redeemLinkHost)) {
      const linkId = clipboadData.split("?id=")[1];
      let response = await fetch(`${config.apiUrl}links/get/${linkId}`);
      response = await response.json();
      console.log('*********************', response);

      setLink(response);
    }
  };

  // useEffect(() => {
  //   fetchLink();
  // }, []);

  return (
    <View style={globalStyles.container}>
      <Fragment>
        <CurrencyIndicator
          label="You will redeem"
          amount={` DAI`}
        />
        {!link ? (
          <TouchableOpacity onPress={() => fetchLink()}>
            <View style={globalStyles.bigButtonView}>
              <Text>check</Text>

              <Image
                style={globalStyles.Icon}
                source={require("../assets/receive.png")}
                resizeMode="contain"
              />
            </View>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity>
            <View style={globalStyles.bigButtonView}>
              <Text>redeem</Text>
              <Image
                style={globalStyles.Icon}
                source={require("../assets/receive.png")}
                resizeMode="contain"
              />
            </View>
          </TouchableOpacity>
        )}
      </Fragment>
    </View>
  );
}
