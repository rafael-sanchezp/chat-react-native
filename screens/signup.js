import React from "react";
import {
    Dimensions,
    Text,
    StyleSheet,
    View,
    KeyboardAvoidingView
} from "react-native";
import { Button, Header, Avatar } from 'react-native-elements';
import TextInput from "../components/inputDefault"
import PhotoProfile from "../components/photoProfile";
const { height, width } = Dimensions.get("window");
import { connect } from "react-redux";
const url_img = "http://127.0.0.1:3000/";
class SignUp extends React.Component {
    static navigationOptions = {
        headerShown: false,
    };
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.isLogin ? this.props.user.id : null,
            nickname: this.props.isLogin ? this.props.user.nickname : null,
            names: this.props.isLogin ? this.props.user.names : null,
            password: this.props.isLogin ? this.props.user.password : null,
            photo: "",
        }
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
                            onPress: () => {
                                if (this.props.isLogin) this.props.navigation.navigate("Home")
                                else this.props.navigation.navigate("Login")
                            }
                        }}
                        centerComponent={{ text: this.props.isLogin ? "Profile" : "Sign Up", style: { color: "black", fontSize: width * 0.05, fontWeight: "bold" } }}
                        containerStyle={{ backgroundColor: "transparent", borderBottomWidth: 0 }}
                    />
                    <View style={styles.form}>
                        <View style={styles.containPhoto}>
                            <PhotoProfile value={(photo) => { this.setState({ photo }) }} src={this.props.isLogin ? url_img + this.props.user.photo : ""} />
                        </View>
                        <Text style={styles.title}>Nickname</Text>
                        <TextInput disable={this.props.isLogin ? true : false} valueInitial={this.state.nickname} value={(text) => {
                            this.setState({ nickname: text })
                        }} />
                        <Text style={styles.title}>Names</Text>
                        <TextInput valueInitial={this.state.names} value={(text) => {
                            this.setState({ names: text })
                        }} />
                        <Text style={styles.title}>Password</Text>
                        <TextInput valueInitial={this.state.password} secureTextEntry={true} value={(text) => {
                            this.setState({ password: text })
                        }} />
                        <Button
                            titleStyle={{ fontFamily: "Lato-Bold" }}
                            buttonStyle={styles.button}
                            onPress={() => {
                                if (this.props.isLogin) this.props.UpdateUser(this.state)//if user is registers, request update
                                else this.props.SignUp(this.state)
                            }}
                            title="Save"
                        />
                        {this.props.isLogin?
                        <Button
                            titleStyle={{ fontFamily: "Lato-Bold" }}
                            buttonStyle={styles.button}
                            type="outline"
                            onPress={() => {
                                this.props.Logout()
                            }}
                            title="Logout"
                        />:null}
                    </View>
                </KeyboardAvoidingView>
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.session.user,
        isLogin: state.session.isLogin
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        Logout: () => dispatch({
            type: 'LOGOUT'
        }),
        SignUp: (user) => dispatch({
            type: 'SIGNUP',
            user
        }),
        UpdateUser: (user) => dispatch({
            type: 'UPDATE_USER',
            user
        }),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(SignUp);

const styles = StyleSheet.create({
    container: {

        flex: 1,
        backgroundColor: "#fff",
    },
    title: {
        paddingVertical: 6,
        fontSize: width * 0.04,
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
    containPhoto: {
        alignItems: 'center'
    }
});
