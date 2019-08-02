import { StyleSheet } from "react-native";

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },

  currencyText: {
    fontSize: 20,
    fontWeight: "bold"
  },

  Header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 30
  },

  HeaderText: {
    fontSize: 25,
    fontWeight: "700"
  }
});
