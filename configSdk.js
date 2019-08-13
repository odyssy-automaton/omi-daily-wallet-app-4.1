import { AsyncStorage, Linking } from "react-native";
import {
  sdkModules,
  createSdk,
  getSdkEnvironment,
  SdkEnvironmentNames
} from "@archanova/sdk";

const sdkEnv = getSdkEnvironment(SdkEnvironmentNames.Main);

export const configureContainer = async()=> {
  const sdkEnvironment = getSdkEnvironment(SdkEnvironmentNames.Kovan);
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
  await sdk.initialize().catch(() => null);
  console.log("sdk load? ", sdk.state)
}


