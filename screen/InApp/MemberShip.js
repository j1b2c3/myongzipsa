import React, { useState, useEffect, createRef } from "react";
import { StatusBar } from 'expo-status-bar';
import { Text, View, TouchableOpacity, TextInput, Button, StyleSheet} from 'react-native';

// 스타일 import
//import MemberShipStyle from "../../styles/Auth/MemberShipStyle";

export default function MemberShipScreen() {
  const [name, setName] = useState('');
  const [studentID, setStudentID] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = () => {
    console.log(`Name: ${name}, 학번: ${studentID}, 아이디: ${username}, 비밀번호: ${password}`);
    // 여기에 회원가입 로직 추가
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>회원가입하기</Text>
      <TextInput
        style={styles.input}
        placeholder="이름"
        value={name}
        onChangeText={text => setName(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="학번"
        value={studentID}
        onChangeText={text => setStudentID(text)}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="아이디"
        value={username}
        onChangeText={text => setUsername(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="비밀번호"
        secureTextEntry
        value={password}
        onChangeText={text => setPassword(text)}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={handleSignUp}
      >
        <Text style={styles.buttonText}>가입하기</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  title: {
    fontSize: 40,
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingLeft: 8,
  },
  button: {
    backgroundColor: 'skyblue',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
});




