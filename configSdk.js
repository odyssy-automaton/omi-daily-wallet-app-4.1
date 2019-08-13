import { AsyncStorage, Linking } from "react-native";
import {
  sdkModules,
  createSdk,
  getSdkEnvironment,
  SdkEnvironmentNames
} from "@archanova/sdk";

export function configureContainer() {
  const sdkEnvironment = getSdkEnvironment(SdkEnvironmentNames.Kovan);
  const sdk = createSdk.createSdk(
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
  sdk.initialize().catch(() => null);
}


