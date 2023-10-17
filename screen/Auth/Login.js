import React, { useState, useRef } from "react";
import { Text, View, TouchableOpacity, TextInput, Alert } from "react-native";

// 스타일 import
import LoginStyle from "../../styles/Auth/LoginStyle";

export default function LoginScreen({ navigation }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const idInputRef = useRef(null);
    const pwInputRef = useRef(null);

    const handleLogin = async () => {
        try {
            await firebase.auth().signInWithEmailAndPassword(username, password);
            // 로그인 성공 시 처리
            navigation.navigate("명집사");
        } 
        catch (error) {
        // 로그인 실패 시 에러 메시지를 보여줌
        Alert.alert("로그인 실패", "아이디 또는 비밀번호가 올바르지 않습니다.");
    }
};

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
        onChangeText={(text) => setUsername(text)}
        />
        <TextInput
        style={LoginStyle.input}
        ref={pwInputRef}
        placeholder="   Password"
        autoCapitalize="none"
        secureTextEntry={true}
        onChangeText={(text) => setPassword(text)}
        />
        <TouchableOpacity style={LoginStyle.loginButton} onPress={handleLogin}>
        <Text style={LoginStyle.loginText}>로그인</Text>
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
