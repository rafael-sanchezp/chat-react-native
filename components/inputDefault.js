import React, { Component ,useState } from 'react';
import { TextInput } from 'react-native';

export default function UselessTextInput(props) {
  const [value, onChangeText] =useState('');

  return (
    <TextInput
      style={{ paddingHorizontal: 10,height: 50, borderColor: 'gray',borderRadius:25, borderWidth: 1 }}
      onChangeText={text =>{ 
          onChangeText(text)
          props.value(text)
        }}
      value={value}
    />
  );
}
