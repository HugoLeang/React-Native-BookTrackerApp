import { React, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableHighlight,
} from "react-native";
import { validate } from "validate.js";
import { signupFormRules } from "../Utils/ValidatorRules";
import { signupUser } from "../Services/AuthServices";

const SignupForm = (props) => {
  const styleSheet = props.styleSheet;
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
    signupBtn: {
      marginTop: 50,
    },
  });

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(" ");
  const [errorMessage, setErrorMessage] = useState("");

  const initiateSignup = () => {
    let validateError = "";
    const formValidation = validate(
      { from: email, password: password, passwordConfirm: confirmPassword },
      signupFormRules
    );

    for (let key in formValidation) {
      validateError += formValidation[key];
    }

    setErrorMessage(validateError);

    if (validateError == "") {
      signupUser(email, password)
        .then((userCredential) => {
          props.goToLogin();
        })
        .catch((error) => {
          setErrorMessage(error.message);
        });
    }
  };

  return (
    <View style={componentStyle.container}>
      <Text style={componentStyle.formName}>Signup</Text>
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
      <TextInput
        style={componentStyle.textField}
        placeholder="Confirm Password"
        secureTextEntry={true}
        onChangeText={setConfirmPassword}
      />
      <TouchableHighlight style={styleSheet.buttonBase} onPress={() => {}}>
        <View>
          <Text
            style={styleSheet.btnTxtBase}
            onPress={() => {
              initiateSignup();
            }}
          >
            Signup
          </Text>
        </View>
      </TouchableHighlight>
      <TouchableHighlight
        style={styleSheet.buttonBase}
        onPress={() => {
          props.goToLogin();
        }}
      >
        <View>
          <Text style={styleSheet.btnTxtBase}>Already got an account ?</Text>
        </View>
      </TouchableHighlight>
    </View>
  );
};

export default SignupForm;
