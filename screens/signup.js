import React from "react";
import {
    Dimensions,
    Text,
    StyleSheet,
    View,
    KeyboardAvoidingView,
    TouchableOpacity
} from "react-native";
import logo from "../assets/images/logo.png";

import { Button, Header ,Avatar} from 'react-native-elements';
import UselessTextInput from "../components/inputDefault"
import PhotoProfile from "../components/photoProfile";
const { height, width } = Dimensions.get("window");

import { connect } from "react-redux";
class SignUp extends React.Component {
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
                    <Header
                        leftComponent={{
                            icon: "keyboard-arrow-left",
                            color: "black",
                            size: width * 0.10,
                            type: "IconMaterial",
                            onPress: () => this.props.navigation.navigate("Login")
                        }}
                        centerComponent={{
                            text: "Sign Up",
                            style: {
                                color: "black",
                                fontSize: width * 0.05,
                                fontWeight: "bold"
                            }
                        }}
                        containerStyle={{
                            backgroundColor: "transparent",
                            borderBottomWidth: 0
                        }}
                    />
                    <View style={styles.form}>
                        <View style={styles.containPhoto}>
                            <PhotoProfile/>
                        </View>
                        <Text style={styles.title}>Names</Text>
                        <UselessTextInput value={(text) => {
                            console.log(`email ${text}`)
                        }} />
                        <Text style={styles.title}>Nickname</Text>
                        <UselessTextInput value={(text) => {
                            console.log(`password ${text}`)
                        }} />
                        <Text style={styles.title}>Password</Text>
                        <UselessTextInput value={(text) => {
                            console.log(`password ${text}`)
                        }} />
                        <Button
                            titleStyle={{ fontFamily: "Lato-Bold" }}
                            buttonStyle={styles.button}
                            title="Login"
                        />
                    </View>
                </KeyboardAvoidingView>
            </View>
        )
    }
}

export default SignUp;

const styles = StyleSheet.create({
    container: {

        flex: 1,
        backgroundColor: "#fff",
    },
    title: {
        paddingVertical: 6,
        fontSize:width*0.04,
        fontFamily: "Lato-Regular"
    },

    button: {

        borderRadius: 100,
        marginVertical: 25,
        padding: 15
    },
    form: {
        flex: 2,
        padding: 20
    },
    containPhoto:{
        alignItems:'center'
    }
});
