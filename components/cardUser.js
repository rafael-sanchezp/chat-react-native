import React, { Component, useState } from 'react';
import { TextInput, View, Text, StyleSheet ,Dimensions,TouchableOpacity} from 'react-native';
import { Avatar } from 'react-native-elements';
const { height, width } = Dimensions.get("window");

export default function Card(props) {
    return (
        <View style={styles.container}>
            <View style={styles.containerImage}>
                <Avatar
                    rounded
                    size="medium"
                    source={{
                        uri:
                            'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
                    }}
                />
            </View>
            <View style={styles.containerText}>
                <Text style={styles.letterNickname}>Eduardoxlau</Text>
                <Text style={styles.letterName}>Rafael sanchez</Text>
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
