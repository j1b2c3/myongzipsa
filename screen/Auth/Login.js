import React, { useState, useEffect, createRef } from "react";
import { StatusBar } from 'expo-status-bar';
import { Text, View, TouchableOpacity, TextInput } from 'react-native';

// 스타일 import
import LoginStyle from "../../styles/Auth/LoginStyle";

export default function LoginScreen({navigation}) {
    const idInputRef = createRef();
    const pwInputRef = createRef();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    // function gotoHomeScreen() {
    //     navigation.navigate("Home");
    // }

    return (
    <View style={LoginStyle.container}>
        <View style={LoginStyle.titleContainer}>
            <Text style={LoginStyle.title}>
                명집사
            </Text>
        </View>
        <View style={LoginStyle.imageContainer}>

        </View>
        <View style={LoginStyle.inputContainer}>
            <TextInput 
                style={LoginStyle.input}
                ref={idInputRef}
                placeholder="   Username"
                autoCapitalize="none"
                blurOnSubmit={false}
                returnKeyType="next"
                onChangeText={text => setUsername(text)}
            />
            <TextInput 
                style={LoginStyle.input}
                ref={pwInputRef}
                placeholder="   password"
                autoCapitalize="none"
                secureTextEntry={true}
                onChangeText={text => setPassword(text)}
            />
            <TouchableOpacity 
                style={LoginStyle.loginButton}
                // 로그인 체크 필요
                onPress={()=>navigation.navigate("명집사")}
            >
                <Text style={LoginStyle.loginText}>
                    로그인
                </Text>
            </TouchableOpacity>
        </View>
        <View style={LoginStyle.subContainer}>
            <TouchableOpacity style={LoginStyle.registerButton}
                onPress={()=>navigation.navigate("회원가입")}
            >
                <Text style={LoginStyle.registerText}>
                    회원가입
                </Text>
                
            </TouchableOpacity>
            <TouchableOpacity style={LoginStyle.findContainer}>
                <Text style={LoginStyle.registerText}>
                    아이디/비밀번호 찾기
                </Text>
            </TouchableOpacity>
        </View>
    </View>
    );
}