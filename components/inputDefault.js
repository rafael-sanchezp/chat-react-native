import React, { Component ,useState } from 'react';
import { TextInput } from 'react-native';

export default function UselessTextInput(props) {
  let valueInitial=props.valueInitial?props.valueInitial:""
  const [value, onChangeText] =useState(valueInitial);
  let secureTextEntry=props.secureTextEntry?props.secureTextEntry:false
  let disable=props.disable?props.disable:false
  
  return (
    <TextInput
    secureTextEntry={secureTextEntry} editable={!disable} 
      style={{ backgroundColor:disable?"#cecece":"white",paddingHorizontal: 10,height: 50, borderColor: 'gray',borderRadius:25, borderWidth: 1 }}
      onChangeText={text =>{ 

          onChangeText(text)
          props.value(text)
        }}
      value={value}
    />
  );
}
