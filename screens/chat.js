import React from "react";
import {
    Dimensions,
    Text,
    StyleSheet,
    View,
    ScrollView,
    KeyboardAvoidingView,
    TouchableOpacity
} from "react-native";

import headerhome from "../assets/images/headerhome.png";
import { Button, Header ,SearchBar} from 'react-native-elements';
import Card from "../components/cardUser"
import BackgroundImage from "../components/backgroundImage";
const { height, width } = Dimensions.get("window");

import { connect } from "react-redux";
class Chat extends React.Component {
    static navigationOptions = {
        headerShown: false,
    };
    constructor(props) {
        super(props);
        this.state = {
            search: '',
          };
    }
    updateSearch = search => {
        this.setState({ search });
      };
    
    render() {
        return (
            <View style={styles.container}>
                <Header
                    leftComponent={{
                        icon: "keyboard-arrow-left",
                        color: "white",
                        size: width * 0.10,
                        type: "IconMaterial",
                        onPress: () => this.props.navigation.navigate("Home")
                    }}
                    centerComponent={{ text: 'Rafael sanchez', style: { color: '#fff' ,fontSize: width * 0.05,} }}
                    containerStyle={{
                        backgroundColor: "#5479F1",
                        borderBottomWidth: 0
                    }}
                />
                 <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
                <View style={styles.contentList}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={styles.containChatMe}>
                        <Text style={styles.textChatMe}>hola esta es un prueba viejo</Text>
                    </View>
                    <View style={styles.containChatYou}>
                        <Text style={styles.textChatYou}>hola esta es un prueba viejo</Text>
                    </View>
                    
                </ScrollView>
                </View>
                <View style={styles.containInput}>
               
                <SearchBar
                    inputContainerStyle={{borderRadius:height*0.025,backgroundColor:"#F0F4FF"}}
                    containerStyle={styles.containerSearch}
                    inputStyle={{height:height*0.05}} 
                    placeholder="Typing"
                    onChangeText={this.updateSearch}
                    value={this.state.search}
                />
                 
                </View>
                </KeyboardAvoidingView>
            </View>
        )
    }
}


export default Chat;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    contentList:{
        paddingTop:height*0.04,
        flex: 10,
       
    },
    containInput:{
        backgroundColor:"#fff",
        flex: 1.5,
        paddingVertical:height*0.01,
        paddingHorizontal:width*0.05
    },
    containerSearch:{
        backgroundColor:"transparent",
        borderWidth:0,
        borderColor:"transparent",
        borderTopColor:"transparent",
        borderBottomColor:"transparent"
    },
    containChatMe:{
        marginBottom:height*0.015,
        marginLeft:width*0.15,
        marginRight:width*0.02,
        borderRadius:10,
        paddingHorizontal:width*0.03,
        paddingVertical:height*0.02,
        backgroundColor:"#5479F1"
    },
    textChatMe:{
        color: "#fff",
        fontSize: width * 0.04,
        fontFamily: "Lato-Regular"
    },
    containChatYou:{
        marginBottom:height*0.015,
        marginRight:width*0.15,
        marginLeft:width*0.02,
        borderRadius:10,
        paddingHorizontal:width*0.03,
        paddingVertical:height*0.02,
        backgroundColor:"#F4F6FF"
    },
    textChatYou:{
        color: "#4D5A80",
        fontSize: width * 0.04,
        fontFamily: "Lato-Regular"
    }
});
