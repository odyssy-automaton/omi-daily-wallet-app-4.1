import { StyleSheet } from "react-native";

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0)",
    alignItems: "center",
    justifyContent: "center"
  },
  currencyText: {
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 20
  },
  currencyHeading: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 20,
    marginTop: 20
  },
  paragraph: {
    fontSize: 18,
    fontWeight: "400",
    marginBottom: 20,
    marginTop: 20
  },
  flexRow: {
    flex: 0,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    alignSelf: "stretch"
  },
  bigButton: {
    borderColor: "transparent",
    borderRadius: 50,
    borderWidth: 0,
    borderStyle: "solid",
    backgroundColor: "#00EB6C",
    width: 100,
    height: 100,
    textAlign: "center",
    fontSize: 21,
    fontWeight: "700",
    color: "white",
    overflow: "hidden",
    marginTop: 50,
    paddingTop: 35,
    marginLeft: 25,
    marginRight: 25
  },
  bigButtonTextOnly: {
    textAlign: "center",
    fontSize: 21,
    fontWeight: "700",
    color: "white"
  },
  bigButtonView: {
    borderColor: "transparent",
    borderRadius: 50,
    borderWidth: 0,
    borderStyle: "solid",
    backgroundColor: "#00EB6C",
    width: 100,
    height: 100,
    textAlign: "center",
    fontSize: 21,
    fontWeight: "700",
    color: "white",
    overflow: "hidden",
    marginTop: 50,
    marginLeft: 25,
    marginRight: 25
  },
  bigButtonText: {
    fontSize: 21,
    fontWeight: "700",
    color: "#00EB6C",
    textAlign: "center",
    marginTop: 10,
  },
  HeadingOne: {
    fontSize: 28,
    fontWeight: "bold"
  },
  PinRow: {
    marginTop: 50,
    alignItems: "center",
    justifyContent: "space-evenly",
    flexDirection: "row",
    alignSelf: "stretch"
  },
  Pin: {
    fontSize: 40,
    fontWeight: "400",
    backgroundColor: "#efefef",
    borderRadius: 30,
    overflow: "hidden",
    height: 60,
    width: 60,
    textAlign: "center",
    paddingTop: 2
  },

  Header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "white",
    paddingLeft: 25,
    paddingRight: 25,
    paddingBottom: 25,
    paddingTop: 25,
    height: "auto"
  },
  Icon: {
    width: 100,
    height: 100
  },

  HeaderText: {
    fontSize: 21,
    fontWeight: "700",
    color: "#00EB6C",
    textAlignVertical: "center"
  },
  inputRow: {
    flex: 0,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  inputText: {
    fontSize: 28,
    fontWeight: "700",
    borderBottomColor: "#00EB6C",
    minWidth: 100,
    textAlign: "center"
  },
  inputTextRight: {
    fontSize: 28,
    fontWeight: "700"
  },
  ErrorMessage: {
    color: "red",
  },
  qrCode: {
    paddingTop: 15,
    paddingRight: 15,
    paddingLeft: 15,
    paddingBottom: 0
  },
  padding: {
    paddingRight: 25,
    paddingLeft: 25
  }
});
