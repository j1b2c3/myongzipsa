import { auth, database } from '../../javascripts/FirebaseConfigFile'
import React, { useState } from 'react'
import { Text, View, TouchableOpacity, TextInput } from 'react-native'
import MemberShipStyle from '../../styles/Auth/MemberShipStyle'

const MemberShipScreen = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordCheck, setPasswordCheck] = useState('')
  const [phone, setPhone] = useState('')
  const handleSignUp = async () => {
    if (password !== passwordCheck) {
      alert('비밀번호가 일치하지 않습니다.')
      return
    }
    if (password.length < 6) {
      alert('비밀번호는 최소 6자 이상이어야 합니다.')
      return
    }
    if (phone.length < 11 || phone.length > 11) {
      alert('올바른 휴대폰 번호를 입력해주세요.')
      return
    }
    try {
      await auth
        .createUserWithEmailAndPassword(email, password)
        .then(userCredentials => {
          const user = userCredentials.user
          console.log('User registered successfully:', user.email)

          // Add the name to the realtime database
          database.ref('users/' + user.uid).set({
            username: name,
            email: user.email,
            phone: phone
          })
          alert('회원가입 완료', user.email)
        })
    } catch (error) {
      console.error('Error signing up:', error)
      if (error.code === 'auth/email-already-in-use') {
        alert('이미 사용 중인 이메일 주소입니다.')
      } else {
        alert('회원가입 오류 발생')
      }
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
          placeholder='이름'
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
           placeholder='전화번호'
           value={phone}
           onChangeText={text => setPhone(text)}
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
