import { StyleSheet } from "react-native";

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0)",
    alignItems: "center",
    justifyContent: "center"
  },
  containerSmall: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0)",
    alignItems: "center",
    justifyContent: "flex-start"
  },
  HeadingOne: {
    fontSize: 28,
    fontWeight: "bold"
  },
  HeadingTwo: {
    fontSize: 21,
    fontWeight: "bold"
  },
  currencyText: {
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 10
  },
  currencyHeading: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 10
  },
  paragraph: {
    fontSize: 18,
    fontWeight: "400",
    marginBottom: 10,
    marginTop: 10
  },
  HeaderText: {
    fontSize: 21,
    fontWeight: "700",
    color: "#00EB6C",
    textAlignVertical: "center"
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
    borderRadius: 40,
    borderWidth: 0,
    borderStyle: "solid",
    backgroundColor: "#00EB6C",
    width: 80,
    height: 80,
    textAlign: "center",
    fontSize: 21,
    fontWeight: "700",
    color: "white",
    overflow: "hidden",
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
    borderRadius: 40,
    borderWidth: 0,
    borderStyle: "solid",
    backgroundColor: "#00EB6C",
    width: 80,
    height: 80,
    textAlign: "center",
    fontSize: 21,
    fontWeight: "700",
    color: "white",
    overflow: "hidden",
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
  smallButtonView: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 15,
    paddingRight: 15,
    textAlign: "center",
    backgroundColor: "#00EB6C",
    color: "black",
    fontSize: 16,
    borderRadius: 30
  },
  Icon: {
    width: 80,
    height: 80
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
    color: "#00EB6C",
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
    textAlign: "center",
    marginBottom: -45
  },
  inputTextRight: {
    fontSize: 28,
    fontWeight: "700"
  },
  ErrorMessageSmall: {
    color: "red",
    marginBottom: 10,
  },
  ErrorMessage: {
    color: "red",
    marginTop: 0,
    marginBottom: 0
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
