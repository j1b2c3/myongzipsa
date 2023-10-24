
import React, { useState } from "react";
import { Text, View, TouchableOpacity, TextInput, Alert } from 'react-native';
import firebase from "firebase/app";
import 'firebase/database';
import { auth, database } from '../../javascripts/FirebaseConfigFile';

// 스타일 import
import FindIDStyle from "../../styles/Auth/FindIDStyle";

const FindIDScreen = () => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [name, setName] = useState('');

    const FindID = () => {
        let userRef = database.ref('users');
        userRef
            .orderByChild('phoneNumber')
            .equalTo(phoneNumber)
            .once('value')
            .then((snapshot) => {
                snapshot.forEach((childSnapshot) => {
                    let user = childSnapshot.val();
                    if (user.name === name) {
                        let email = user.email;
                        Alert.alert(`아이디는 ${email}입니다.`);
                    }
                });
            })
            .catch((error) => {
                Alert.alert(`아이디 찾기 오류`);
                console.error('Error finding ID:', error);
            });
    }

    return (
        <View style={FindIDStyle.container}>
            <View style={FindIDStyle.inputContainer}>
                <TextInput
                    style={FindIDStyle.input}
                    placeholder="이름을 입력하세요"
                    value={name}
                    onChangeText={text => setName(text)}
                />
                <TextInput
                    style={FindIDStyle.input}
                    placeholder="휴대폰번호를 입력하세요"
                    value={phoneNumber}
                    onChangeText={text => setPhoneNumber(text)}
                />
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
