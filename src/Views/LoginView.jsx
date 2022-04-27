import { React, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import LoginForm from "../Components/LoginForm";
import SignupForm from "../Components/SignupForm";
const LoginView = (props) => {
  const mode = {
    LOGIN: "login",
    SIGNUP: "signup",
  };
  const [formMode, setFormMode] = useState(mode.LOGIN);
  const styleSheet = props.styleSheet;
  const viewStyle = StyleSheet.create({
    appTitle: {
      color: "#fff",
      backgroundColor: "#2196F3",
      paddingVertical: "5%",
      marginBottom: "10%",
      fontSize: 25,
      width: "100%",
      textAlign: "center",
      fontWeight: "bold",
    },
    viewContainer: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },
  });

  let formDisplayed;
  switch (formMode) {
    case mode.LOGIN:
      formDisplayed = (
        <LoginForm
          styleSheet={styleSheet}
          goToSignup={() => setFormMode(mode.SIGNUP)}
        />
      );
      break;
    case mode.SIGNUP:
      formDisplayed = (
        <SignupForm
          styleSheet={styleSheet}
          goToLogin={() => setFormMode(mode.LOGIN)}
        />
      );
      break;
  }

  return (
    <View style={viewStyle.viewContainer}>
      <Text style={viewStyle.appTitle}>BOOK TRACKER</Text>
      {formDisplayed}
    </View>
  );
};

export default LoginView;
