import React, { useState } from "react";
import { View, Text, TouchableOpacity, TextInput, Alert } from 'react-native';
import { auth } from '../../javascripts/FirebaseConfigFile';

const FindPwdScreen = () => {
  const [email, setEmail] = useState('');

  const handlePasswordRecovery = () => {
    auth.sendPasswordResetEmail(email)
      .then(() => {
        Alert.alert('비밀번호 재설정 이메일이 전송되었습니다.');
      })
      .catch((error) => {
        Alert.alert('비밀번호 재설정 오류');
        console.error('Error finding ID:', error);

      });
  };

  return (
    <View>
      <TextInput
        placeholder="이메일을 입력하세요"
        value={email}
        onChangeText={setEmail}
      />
      <TouchableOpacity onPress={handlePasswordRecovery}>
        <Text>비밀번호 찾기</Text>
      </TouchableOpacity>
    </View>
  );
};

export default FindPwdScreen;
