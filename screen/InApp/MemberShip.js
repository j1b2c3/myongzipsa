import React, { useState, useEffect, createRef } from "react";
import { StatusBar } from 'expo-status-bar';
import { Text, View, TouchableOpacity, TextInput, Button, StyleSheet} from 'react-native';

// 스타일 import
import MemberShipStyle from "../../styles/Auth/MemberShipStyle";

export default function MemberShipScreen(navigation) {
  const [name, setName] = useState('');
  const [schoolEMail, setschoolEMail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = () => {
    console.log(`Name: ${name}, 학교 E-Mail: ${schoolEMail}, 아이디: ${username}, 비밀번호: ${password}`);
    // 여기에 회원가입 로직 추가
  };

  return (
    <View style={MemberShipStyle.container}>
        <View style={MemberShipStyle.titleContainer}>
          <Text style={MemberShipStyle.title}>
            회원가입하기
          </Text>
        </View>

        <View style={MemberShipStyle.inputContainer}>
          <TextInput
            style={MemberShipStyle.input}
            placeholder="이름"
            value={name}
            onChangeText={text => setName(text)}
          />
          <TextInput
            style={MemberShipStyle.input}
            placeholder="학교 E-Mail"
            value={schoolEMail}
            onChangeText={text => setschoolEMail(text)}
            keyboardType="numeric"
          />
          <TextInput
            style={MemberShipStyle.input}
            placeholder="아이디"
            value={username}
            onChangeText={text => setUsername(text)}
          />
          <TextInput
            style={MemberShipStyle.input}
            placeholder="비밀번호"
            secureTextEntry
            value={password}
            onChangeText={text => setPassword(text)}
          />
        </View>

        <View style={MemberShipStyle.SignUpContainer}>
          <TouchableOpacity
            style={MemberShipStyle.button}
            onPress={handleSignUp}
          >
            <Text style={MemberShipStyle.buttonText}>
              가입하기
            </Text>
          </TouchableOpacity>
        </View>

    </View>
  );
}
