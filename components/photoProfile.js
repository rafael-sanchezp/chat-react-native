import React, { Component, useState } from 'react';
import { TextInput, View, Text, StyleSheet ,Dimensions,TouchableOpacity} from 'react-native';
import { Avatar } from 'react-native-elements';
const { height, width } = Dimensions.get("window");
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";


const _hasPermissions = async () => {
    const { CAMERA, CAMERA_ROLL } = Permissions;
    const permissions = {
      [CAMERA]: await Permissions.askAsync(CAMERA)
    };
    if (permissions[CAMERA].status !== "granted") {
      if (Platform.OS === "ios") Linking.openURL("app-settings:");

      return Promise.reject(
        new Error("Camera & Camera Roll Permissions Required")
      );
    }
    return Promise.resolve(true);
  };
const _pickImageCamera = async () => {
    let result = _hasPermissions()
      .then(
        async () =>
          await ImagePicker.launchCameraAsync({
            waitUntilSaved: true,
            cameraRoll: true,
            skipBackup: true
          })
      )
      .then(image => {
       
        console.log(image)
        this.processImage(image.uri);

      })
      .catch(error => {
        console.log(`[ pickFromGallery ] ${error}`);
      });
  };
export default function PhotoProfile(props) {
    return (
        <TouchableOpacity 
        onPress={() => {
            _pickImageCamera()
        }}>
        <Avatar
            size="xlarge"
            rounded
            source={{
                uri:
                'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
            }}
            />
        </TouchableOpacity>
    );
}

