import { Linking } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import {
  sdkModules,
  createSdk,
  getSdkEnvironment,
  SdkEnvironmentNames
} from "@archanova/sdk";
import config from "./config";

export const configureContainer = async () => {
  const sdkEnvironment = getSdkEnvironment(SdkEnvironmentNames[config.sdkEnv]);
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
  await sdk.initialize().catch(err => console.log(err));

  return sdk;
};
