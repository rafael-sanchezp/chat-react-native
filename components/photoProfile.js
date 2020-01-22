import React, { Component, useState } from 'react';
import { TextInput, View, Text, StyleSheet ,Dimensions,TouchableOpacity} from 'react-native';
import { Avatar } from 'react-native-elements';
const { height, width } = Dimensions.get("window");
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";
import * as ImageManipulator from "expo-image-manipulator";


export default function PhotoProfile(props) {
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
 const  processImage = async (imageUrl) => {
    let processImage = await ImageManipulator.manipulateAsync(
      imageUrl,
      [{ resize: { width: 400, height: 400 } }],
      { format: "png", base64: true, compress: 0.5 }
    );
     updateImage("data:image/png;base64,"+processImage.base64)
     props.value("data:image/png;base64,"+processImage.base64)

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
        processImage(image.uri);

      })
      .catch(error => {
        console.log(`[ pickFromGallery ] ${error}`);
      });
  };
    console.log(props.src)
    const [src, updateImage] = useState(props.src);
    //if(src!=props.src)updateImage(props.src)
    return (
        <TouchableOpacity 
        onPress={() => {
            _pickImageCamera()
        }}>
        <Avatar
            icon={{name: 'user', type: 'font-awesome'}}
            showEditButton
            size="xlarge"
            rounded
            source={{uri:src}}
            />
        </TouchableOpacity>
    );
}

