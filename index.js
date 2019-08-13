/**
 * @format
 */
import "./shim.js";
import { AppRegistry } from "react-native";
import App from "./App";
import { name as appName } from "./app.json";
import { configureContainer } from "./configSdk";

configureContainer();

AppRegistry.registerComponent(appName, () => App);
