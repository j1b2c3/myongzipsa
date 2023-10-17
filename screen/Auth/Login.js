import {auth} from '../../javascripts/FirebaseConfigFile';
import React, { useState } from 'react'
import { Text, View, TouchableOpacity, TextInput, Alert } from 'react-native'
import {auth} from '../../javascripts/firebaseconfig';

// 스타일 import
import LoginStyle from '../../styles/Auth/LoginStyle'

export default function LoginScreen({ navigation }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
        await auth.signInWithEmailAndPassword(email, password)
        .then(userCredentials => {
          const user = userCredentials.user
          console.log('Logged in with:', user.email)
          navigation.navigate('명집사')
        })
    } catch (error) {
      console.error('Error login:', error)
      alert('로그인 오류 발생')
    }
  }

  return (
    <View style={LoginStyle.container}>
      <View style={LoginStyle.titleContainer}>
        <Text style={LoginStyle.title}>명집사</Text>
      </View>
      <View style={LoginStyle.imageContainer}></View>
      <View style={LoginStyle.inputContainer}>
        <TextInput
          style={LoginStyle.input}
          placeholder='   이메일'
          value={email}
          autoCapitalize='none'
          blurOnSubmit={false}
          returnKeyType='next'
          onChangeText={text => setEmail(text)}
        />
        <TextInput
          style={LoginStyle.input}
          placeholder='   비밀번호'
          value={password}
          autoCapitalize='none'
          secureTextEntry={true}
          onChangeText={text => setPassword(text)}
        />
        <TouchableOpacity style={LoginStyle.loginButton} onPress={handleLogin}>
          <Text style={LoginStyle.loginText}>로그인</Text>
        </TouchableOpacity>
      </View>
      <View style={LoginStyle.subContainer}>
        <TouchableOpacity
          style={LoginStyle.registerButton}
          onPress={() => navigation.navigate('회원가입')}
        >
          <Text style={LoginStyle.registerText}>회원가입</Text>
        </TouchableOpacity>
        <TouchableOpacity style={LoginStyle.findContainer}>
          <Text style={LoginStyle.registerText}>아이디/비밀번호 찾기</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

