import React, { useState } from 'react';
import { Text, View, TouchableOpacity, TextInput, Picker } from 'react-native';
import MemberShipStyle from '../../styles/Auth/MemberShipStyle';

const MemberShipScreen = () => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');


  const handleSignUp = () => {
    console.log(`Name: ${name}, 아이디: ${username}, 비밀번호: ${password}, 비밀번호확인: ${passwordCheck}`);
    // 회원가입
  };

  return (
    <View style={MemberShipStyle.container}>
        <View style={MemberShipStyle.titleContainer}>
          <Text style={MemberShipStyle.title}>
            회원가입하기
          </Text>
        </View>

<<<<<<< HEAD
        <View style={MemberShipStyle.InputContainer}>
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
=======
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
>>>>>>> 2815a9529eea8dae80851969134d07b8f9aac159

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
