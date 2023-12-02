import React, { useState } from "react";
import { Text, View, TouchableOpacity, Alert, Image, TextInput, KeyboardAvoidingView, Platform } from 'react-native';

//스타일 import
import MailBoxStyle from '../../styles/Auth/MailBoxStyle';

const MailBoxScreen = () => {
    const [selectedButton, setSelectedButton] = useState(null);
    const [messageText, setMessageText] = useState('');

    const handleMessageSend = () => {
        //관리자에게 전달
        console.log("보낸 쪽지 내용:", messageText);
        setMessageText(''); // 입력 상자 초기화
    };

    // 받은 쪽지 목록 예시 데이터
    const receivedMessages = [
        { id: 1, content: '첫 번째 받은 쪽지' },
        { id: 2, content: '두 번째 받은 쪽지' },
        { id: 3, content: '세 번째 받은 쪽지' },
        { id: 4, content: '네 번째 받은 쪽지' },

    ];

    // 보낸 쪽지 목록 예시 데이터
    const sentMessages = [
        { id: 1, content: '첫 번째 보낸 쪽지' },
        { id: 2, content: '두 번째 보낸 쪽지' },
    ];

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : null}
            style={MailBoxStyle.MainContainer}
        >
            <View style={MailBoxStyle.SelectContainer}>
                <TouchableOpacity onPress={() => setSelectedButton('받은쪽지')}>
                    <Text>받은쪽지  | </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setSelectedButton('보낸쪽지')}>
                    <Text> 보낸쪽지</Text>
                </TouchableOpacity>
            </View>

            <View style={MailBoxStyle.ListContainer}>
                {/* 여기에 받은 쪽지와 보낸 쪽지 목록 표시 */}
                {(selectedButton === '받은쪽지') && (
                    <View>
                        <Text style={MailBoxStyle.ListTitleText}>받은 쪽지 목록</Text>
                        {/* 받은 쪽지 목록 렌더링 */}
                        {receivedMessages.map(message => (
                            <View key={message.id} style={MailBoxStyle.MessageContainer}>
                                <Text>{message.content}</Text>
                            </View>
                        ))}
                    </View>

                )}
                {(selectedButton === '보낸쪽지') && (

                    <View>
                        <Text style={MailBoxStyle.ListTitleText}>보낸 쪽지 목록</Text>
                        {/* 보낸 쪽지 목록 렌더링 */}
                        {sentMessages.map(message => (
                            <View key={message.id} style={MailBoxStyle.MessageContainer}>
                                <Text>{message.content}</Text>
                            </View>
                        ))}
                    </View>

                )}
            </View>

            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : null}
                style={MailBoxStyle.InputContainer}
            >
                <TextInput
                    style={MailBoxStyle.ComposeTextInput}
                    multiline
                    placeholder="여기에 쪽지를 작성하세요"
                    onChangeText={(text) => setMessageText(text)}
                    value={messageText}
                />
                <TouchableOpacity style={MailBoxStyle.SendButton} onPress={handleMessageSend}>
                    <Text style={MailBoxStyle.SendButtonText}>쪽지 보내기</Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>
        </KeyboardAvoidingView>
    );
};

export default MailBoxScreen;
