import { auth } from '../../javascripts/firebaseconfig'
import React, { useState } from 'react'
import { Text, View, TouchableOpacity, TextInput } from 'react-native'
import MemberShipStyle from '../../styles/Auth/MemberShipStyle'

const MemberShipScreen = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordCheck, setPasswordCheck] = useState('')

  const handleSignUp = async () => {
    if (password !== passwordCheck) {
      alert('비밀번호가 일치하지 않습니다.')
      return
    }
    if (password.length < 6) {
      alert('비밀번호는 최소 6자 이상이어야 합니다.')
      return
    }
    try {
      await auth
        .createUserWithEmailAndPassword(email, password)
        .then(userCredentials => {
          const user = userCredentials.user
          console.log('User registered successfully:', user.email)
          alert('회원가입 완료', user.email)
        })
    } catch (error) {
      console.error('Error signing up:', error)
      alert('회원가입 오류 발생')
    }
  }

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
          placeholder='이메일'
          value={email}
          onChangeText={text => setEmail(text)}
        />
        <TextInput
          style={MemberShipStyle.input}
          placeholder='비밀번호'
          secureTextEntry={true}
          value={password}
          onChangeText={text => setPassword(text)}
        />
        <TextInput
          style={MemberShipStyle.input}
          placeholder='비밀번호 확인'
          secureTextEntry={true}
          value={passwordCheck}
          onChangeText={text => setPasswordCheck(text)}
        />
      </View>

      <View style={MemberShipStyle.SignUpContainer}>
        <TouchableOpacity style={MemberShipStyle.button} onPress={handleSignUp}>
          <Text style={MemberShipStyle.buttonText}>가입하기</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default MemberShipScreen
