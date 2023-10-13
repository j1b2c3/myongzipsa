import React, { useState, useEffect, createRef } from "react";
import { StatusBar } from 'expo-status-bar';
import { Text, View, TouchableOpacity, TextInput, Button, Alert, StyleSheet } from 'react-native';

//스타일 import
import FindIDStyle from "../../styles/Auth/FindIDStyle";

const FindIDScreen = () => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [verificationCode, setVerificationCode] = useState('');

    const sendVerificationCode = () => {
        Alert.alert('인증번호가 전송되었습니다.');
    }

    const FindID = () => {
        // 아이디 찾기 동작 처리하는 로직
        Alert.alert('아이디는 XXXX입니다.');
    }

    return (
        <View style={FindIDStyle.container}>
            <View style={FindIDStyle.inputContainer}>
                <TextInput
                    style={FindIDStyle.input}
                    placeholder="휴대폰번호를 입력하세요"
                    value={phoneNumber}
                    onChangeText={text => setPhoneNumber(text)}
                />
                <TouchableOpacity
                    style={FindIDStyle.button} 
                    onPress={sendVerificationCode}
                >
                    <Text>인증번호 전송</Text>
                </TouchableOpacity>
            </View>
            <View style={FindIDStyle.inputContainer}>
                <TextInput
                    style={FindIDStyle.input}
                    placeholder="인증번호를 입력하세요"
                    value={verificationCode}
                    onChangeText={text => setVerificationCode(text)}
                />
                <TouchableOpacity
                    style={FindIDStyle.button} 
                    //onPress={FindID}
                >
                    <Text>확인</Text>
                </TouchableOpacity>
            </View>
            <View style={FindIDStyle.FindIDContainer}>
                <TouchableOpacity
                    onPress={FindID}
                >   
                    <Text>아이디 찾기</Text>
                </TouchableOpacity>
            </View>
            
        </View>
    );
}

export default FindIDScreen;





