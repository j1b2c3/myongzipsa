import React, { useState, useEffect, createRef } from "react";
import { StatusBar } from 'expo-status-bar';
import { Text, View, TouchableOpacity, TextInput,Button,Alert } from 'react-native';

//스타일 import
import FindPwdStyle from "../../styles/Auth/FindPwdStyle";

const FindPwdScreen = () => {
  const [name, setName] = useState('');
  const [id, setId] = useState('');

  const handlePasswordRecovery = () => {
    // 비밀번호 찾기 동작 처리하는 로직
    Alert.alert('비밀번호는 XXXX입니다.');
  };

  return (
    <View style={FindPwdStyle.container}>
      <View style={FindPwdStyle.inputContainer}>
        <TextInput
          style={FindPwdStyle.input}
          placeholder="이름을 입력하세요"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={FindPwdStyle.input}
          placeholder="아이디를 입력하세요"
          value={id}
          onChangeText={setId}
        />
      </View>
      <View style={FindPwdStyle.buttonContainer}>
        {/* <Button title="비밀번호 찾기" onPress={handlePasswordRecovery} /> */}
        <TouchableOpacity
          onPress={handlePasswordRecovery}
        >   
            <Text>비밀번호 찾기</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};


export default FindPwdScreen;