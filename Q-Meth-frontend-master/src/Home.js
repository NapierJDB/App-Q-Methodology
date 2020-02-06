import React from "react";
import {
  StyleSheet,
  View,
  TextInput,
  Button,
  KeyboardAvoidingView,
  Text,
  Image
} from "react-native";
import EdinburghNapierLogo from "./EdinburghNapierLogo.png"

export default class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      Email: "",
      Password: ""
    };

    this.handleChangeEmail = this.handleChangeEmail.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
  }

  //takes text value being passed in
  emailValidation = textValue => {
    //variable used for regex
    const expression = /(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([\t]*\r\n)?[\t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([\t]*\r\n)?[\t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;

    //tests "expression" against the test value being passed in
    if (!expression.test(textValue)) {
      //alerts user of incorrect input format
      alert("incorrect email format");
      //sets email to blank
      this.setState({ Email: "" });
    }
  };

  passwordValidation = textValue => {
    if (textValue == "" || textValue == " ") {
      alert("Password cannot be blank");
    }
  };

  handleChangeEmail = textValue => {
    this.setState({ Email: textValue });
  };

  handleChangePassword = textValue => {
    this.setState({ Password: textValue });
  };

  render() {
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.MainContainer}>
        <View style={styles.logoContainer}>
          <Text style={styles.title}> Q-Methodology </Text>
        </View>

        <View style={styles.logoContainer} >
          <Image source={EdinburghNapierLogo} />
        </View>

        <View style={styles.container}>
          <TextInput
            name="Email"
            placeholder="Email"
            placeholderTextColor="white"
            keyboardType="email-address"
            Email={this.state.Email}
            onChangeText={this.handleChangeEmail}
            style={styles.input}
          />
          <TextInput
            name="Password"
            placeholder="password"
            placeholderTextColor="white"
            secureTextEntry
            Password={this.state.password}
            onChangeText={this.handleChangePassword}
            style={styles.input}
          />

          <View style={styles.buttonContainer}>
            <Button
              onPress={() => {
                //calls email validation function
                //passes in the current value in the email box
                this.emailValidation(this.state.Email);
                this.passwordValidation(this.state.Password);
              }}
              title="Login"
            ></Button>
          </View>

          <View style={styles.buttonContainer}>
            <Button
              onPress={() => {
                this.props.navigation.navigate("Register");
              }}
              title="Register"
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    paddingLeft: 90,
    paddingRight: 90,
  },

  input: {
    height: 60,
    backgroundColor: "#df2020",
    marginBottom: 20,
    color: "white",
    paddingHorizontal: 15,
    fontSize: 15
  },

  buttonContainer: {
    backgroundColor: "#0595f2",
    width: 100,
    textAlign: "center",
    marginBottom: 15,
    alignSelf: "center"
  },

  buttonText: {
    textAlign: "center",
    color: "white",
    fontWeight: "900",
    fontSize: 15
  },

  MainContainer: {
    flex: 1
  },

  logo: {
    display: "flex",
    height: 119,
    width: 300,
    alignSelf: "center",
    justifyContent: "center",
    marginTop: 50
  },


  logoContainer: {
    alignItems: "center",
    justifyContent: "center",
    flex: 0.7
  },

  title: {
    fontSize: 40,
    textAlign: "center"
  },

  formContainer: {}
});
