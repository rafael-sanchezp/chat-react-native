import React from "react";
import {
  Dimensions,
  Text,
  StyleSheet,
  View,
  KeyboardAvoidingView,
  TouchableOpacity
} from "react-native";
import header from "../assets/images/header.png";
import logo from "../assets/images/logo.png";

import { Button, Image } from 'react-native-elements';
import UselessTextInput from "../components/inputDefault"
import BackgroundImage from "../components/backgroundImage";
const { height, width } = Dimensions.get("window");

import { connect } from "react-redux";
class Login extends React.Component {
  static navigationOptions = {
    headerShown: false,
  };
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
          <BackgroundImage
            source={header}
            imageStyle={{ opacity: 1, resizeMode: 'stretch', width: width }}
            containerStyle={{ flex: 1.5, alignItems: 'center', justifyContent: 'center' }}
          >
            <Image
              style={styles.stretch}
              source={logo}
            />
          </BackgroundImage>
          <View style={styles.form}>
            <Text style={styles.title}>Nickname</Text>
            <UselessTextInput value={(text) => {
              console.log(`email ${text}`)
            }} />
            <Text style={styles.title}>Password</Text>
            <UselessTextInput value={(text) => {
              console.log(`password ${text}`)
            }} />
            <Button
              titleStyle={{ fontFamily: "Lato-Bold" }}
              buttonStyle={styles.button}
              onPress={() => {
                this.props.navigation.navigate("Chat");
              }}
              title="Login"
            />
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate("SignUp");
              }}
            >
              <View style={{ flexDirection: "row", justifyContent: 'center' }}>
                <Text style={styles.forget}>
                  Don’t have an account?
          </Text>

                <Text style={[styles.forget, { color: "#0088FF", paddingHorizontal: 5 }]}>
                  Sign up
          </Text>

              </View>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </View>
    )
  }
}


export default Login;

const styles = StyleSheet.create({
  container: {

    flex: 1,
    backgroundColor: "#fff",
  },
  title: {
    paddingVertical: 6,
    fontSize: width * 0.05,
    fontFamily: "Lato-Regular"
  },
  forget: {

    fontSize: width * 0.04,
    fontFamily: "Lato-Regular"
  },

  button: {
    backgroundColor: "#0088FF",
    borderRadius: 100,
    marginVertical: 25,
    padding: 15
  },
  stretch: {
    width: 200,
    height: 150,
    resizeMode: "contain"
  },
  form: {
    flex: 2,
    padding: 20
  }
});
