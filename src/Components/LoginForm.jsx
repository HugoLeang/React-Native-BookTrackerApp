import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableHighlight,
} from "react-native";
import { validate } from "validate.js";
import { loginRules } from "../Utils/ValidatorRules";
import { loginUser } from "../Services/AuthServices";
import { useNavigate } from "react-router-native";
import { checkUserDb } from "../Services/FirestoreServices";
const LoginForm = (props) => {
  const componentStyle = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
    },
    textField: {
      fontSize: 15,
      margin: 5,
      paddingHorizontal: 5,
      width: 290,
      height: 60,
      borderColor: "#2196F3",
      borderWidth: 3,
      borderRadius: 15,
      textAlign: "center",
    },
    formName: {
      textAlign: "center",
      fontSize: 30,
    },
    loginBtn: {
      marginTop: 50,
    },
    signupBtn: {},
  });
  const styleSheet = props.styleSheet;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigation = useNavigate();
  const initiateLogin = () => {
    let validationError = "";

    const formValidation = validate(
      { from: email, password: password },
      loginRules
    );
    for (let key in formValidation) {
      validationError += formValidation[key];
    }
    if (validationError == "") {
      loginUser(email, password)
        .then((userCredential) => {
          checkUserDb();
          navigation("/home");
        })
        .catch((error) => {
          setErrorMessage(error.message);
        });
    } else {
      setErrorMessage(validationError);
    }
  };

  return (
    <View style={componentStyle.container}>
      <Text style={componentStyle.formName}>Login</Text>
      {errorMessage != "" ? (
        <Text style={styleSheet.errorTxt}>{errorMessage}</Text>
      ) : null}

      <TextInput
        style={componentStyle.textField}
        placeholder="Email"
        onChangeText={setEmail}
      />
      <TextInput
        style={componentStyle.textField}
        placeholder="Password"
        secureTextEntry={true}
        onChangeText={setPassword}
      />
      <TouchableHighlight
        style={styleSheet.buttonBase}
        onPress={() => {
          setErrorMessage(null);
          initiateLogin();
        }}
      >
        <View>
          <Text style={styleSheet.btnTxtBase}>Login</Text>
        </View>
      </TouchableHighlight>
      <TouchableHighlight
        style={styleSheet.buttonBase}
        onPress={() => {
          props.goToSignup();
        }}
      >
        <View>
          <Text style={styleSheet.btnTxtBase}>Create a account</Text>
        </View>
      </TouchableHighlight>
    </View>
  );
};

export default LoginForm;
