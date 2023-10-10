import React, { useState } from 'react';
import { Text, View, TouchableOpacity, TextInput, Picker } from 'react-native';
import MemberShipStyle from '../../styles/Auth/MemberShipStyle';

const MemberShipScreen = () => {
  const [name, setName] = useState('');
  const [schoolName, setSchoolName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [dome, setDome] = useState('dome1');

  const handleSignUp = () => {
    console.log(`Name: ${name}, 소속대학교: ${schoolName}, 기숙사: ${dome}, 아이디: ${username}, 비밀번호: ${password}, 비밀번호확인: ${passwordCheck}`);
    // Add your signup logic here
  };

  return (
    <View style={MemberShipStyle.container}>
      <View style={MemberShipStyle.titleContainer}>
        <Text style={MemberShipStyle.title}>회원가입하기</Text>
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
          placeholder="소속대학교"
          value={schoolName}
          onChangeText={text => setSchoolName(text)}
        />

        /*오류
        <Text style={MemberShipStyle.input}>기숙사 선택</Text>
        <Picker
          style={MemberShipStyle.picker}
          selectedValue={dome}
          onValueChange={(itemValue) => setDome(itemValue)}
        >
          <Picker.Item label="기숙사를 선택해주세요" value="none" />
          <Picker.Item label="기숙사1" value="dome1" />
          <Picker.Item label="기숙사2" value="dome2" />
          <Picker.Item label="기숙사3" value="dome3" />
        </Picker>
        */

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
          <Text style={MemberShipStyle.buttonText}>가입하기</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default MemberShipScreen;
