import { Linking } from "react-native";
import AsyncStorage from '@react-native-community/async-storage';
import {
  sdkModules,
  createSdk,
  getSdkEnvironment,
  SdkEnvironmentNames
} from "@archanova/sdk";

export const configureContainer = async () => {
  const sdkEnvironment = getSdkEnvironment(SdkEnvironmentNames.Sokol);
  const sdk = createSdk(
    sdkEnvironment
      .extendConfig("actionOptions", {
        autoAccept: true
      })
      .setConfig("urlAdapter", {
        addListener: function(listener) {
          Linking.getInitialURL()
            .then(function(url) {
              listener(url || null);
            })
            ["catch"](function() {
              return null;
            });
          Linking.addEventListener("url", function(_a) {
            var url = _a.url;
            listener(url || null);
          });
        },
        open: function(url) {
          Linking.openURL(url)["catch"](function() {
            return null;
          });
        }
      })
      .setConfig("storageAdapter", AsyncStorage)
  );
  await sdk.initialize().catch((err) => console.log(err));
  console.log("sdk load? ", sdk.state.initialized);
  return(sdk)
  
};
