import React, { Component, useState } from 'react';
import { TextInput, View, Text, StyleSheet ,Dimensions,TouchableOpacity} from 'react-native';
import { Avatar } from 'react-native-elements';
import avatar from  "../assets/images/avatar.jpg";

const { height, width } = Dimensions.get("window");
import logo from "../assets/images/logo.png";

export default function Card(props) {
    return (
        <View style={styles.container}>
            <View style={styles.containerImage}>
                <Avatar
                    icon={{name: 'user', type: 'font-awesome'}}
                    rounded
                    size="medium"
                    overlayContainerStyle={{backgroundColor:"#fff",borderWidth:1,borderColor:"#cecece"}}
                    source={props.user.id==0 ?logo:props.user.photo==null?avatar :{uri:props.user.photo}}                />
            </View>
            <View style={styles.containerText}>
                <Text style={styles.letterNickname}>{props.user.nickname}</Text>
                <Text style={styles.letterName}>{props.user.names}</Text>
            </View>
            <View style={styles.containerHour}>
                <Text style={styles.letterHour}>5 min</Text>
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    containerImage: {
        flex: 1
    },
    containerText: {
        flex: 2.5,
        justifyContent:'center'
    },
    containerHour: {
        flex: 0.5
    },
    container: {
        flexDirection: "row",
        paddingBottom:height*0.03,
        backgroundColor: "#fff",
    },
    letterNickname:{
        fontSize: width * 0.05,
        fontFamily: "Lato-Bold"
    },
    letterHour:{
        color:"#9DA3B7",
        fontSize: width * 0.035,
        fontFamily: "Lato-Regular"
    },
    letterName:{
        color:"#9DA3B7",
        fontSize: width * 0.04,
        fontFamily: "Lato-Regular"
    }
});
