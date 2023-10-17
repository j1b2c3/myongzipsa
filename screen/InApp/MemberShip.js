import firebase from '../javascripts/firebaseConfig';
import React, { useState } from 'react';
import { Text, View, TouchableOpacity, TextInput } from 'react-native';
import MemberShipStyle from '../../styles/Auth/MemberShipStyle';

const MemberShipScreen = () => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');


  const handleSignUp = async () => {
    try {
      // 사용자 생성
      const userCredential = await firebase.auth().createUserWithEmailAndPassword(username, password);
      const user = userCredential.user;

      // 사용자 데이터 저장
      await firebase.database().ref('users/' + user.uid).set({
        name,
        username,
        password
      });
      
      console.log('User registered successfully:', user);
    } catch (error) {
      console.error('Error signing up:', error);
      alert("회원가입 오류 발생")
    }
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
          placeholder="아이디"
          value={username}
          onChangeText={text => setUsername(text)}
        />
        <TextInput
          style={MemberShipStyle.input}
          placeholder="비밀번호"
          secureTextEntry={true}
          value={password}
          onChangeText={text => setPassword(text)}
        />
        <TextInput
          style={MemberShipStyle.input}
          placeholder="비밀번호 확인"
          secureTextEntry={true}
          value={passwordCheck}
          onChangeText={text => setPasswordCheck(text)}
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
};

export default MemberShipScreen;
