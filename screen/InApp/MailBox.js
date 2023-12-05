import React, { useState, useEffect } from "react";
import { Text, View, TouchableOpacity, Alert, ScrollView, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { auth, database } from '../../javascripts/FirebaseConfigFile';

//스타일 import
import MailBoxStyle from '../../styles/Auth/MailBoxStyle';

const MailBoxScreen = () => {
    const [selectedButton, setSelectedButton] = useState(null);
    const [messageText, setMessageText] = useState('');
    const [receivedMessages, setReceivedMessages] = useState([]);
    const [sentMessages, setSentMessages] = useState([]);

    useEffect(() => {
        getReceivedMessages();
        getSentMessages();
    }, []);

    const userKey = auth.currentUser.email.replace(/[.$#[\]/]/g, "_");
    const adminKey = "admin@gmail_com";

    // 파이어베이스 DB에 메시지 저장
    const handleMessageSend = () => {
        const ref = database.ref(`MailBox/${adminKey}/${userKey === adminKey ? 'sentMsg' : 'receivedMsg'}`);
        ref.once("value", function(snapshot) {
            const messageNumber = snapshot.numChildren() + 1; // 새로운 메시지 순서 번호
            ref.child(messageNumber).set({
                [userKey]: messageText
            });
        });

        setMessageText(''); // 입력 상자 초기화
    };
    // 받은 메시지 확인하기
    const getReceivedMessages = () => {
        const ref = database.ref(`MailBox/${adminKey}/${userKey === adminKey ? 'receivedMsg' : 'sentMsg'}`);
        ref.once("value", snapshot => {
            const data = snapshot.val();
            if (data) {
                const messages = Object.keys(data).map(key => ({
                    id: key,
                    content: Object.values(data[key])[0]
                })).reverse(); //내림차순.
                setReceivedMessages(messages);
            } else {
                setReceivedMessages([{ id: '1', content: '쪽지함이 비어있습니다!' }]);
            }
        });
    };
    // 보낸 메시지 확인하기
    const getSentMessages = () => {
        const ref = database.ref(`MailBox/${adminKey}/${userKey === adminKey ? 'sentMsg' : 'receivedMsg'}`);
        ref.once("value", snapshot => {
            const data = snapshot.val();
            if (data) {
                const messages = Object.keys(data)
                    .filter(key => Object.keys(data[key])[0] === (userKey === adminKey ? adminKey : userKey))
                    .map(key => ({
                        id: key,
                        content: Object.values(data[key])[0]
                    })).reverse(); // 내림차순
                setSentMessages(messages);
            } else {
                setSentMessages([{ id: '1', content: '쪽지함이 비어있습니다!' }]);
            }
        });
    };


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

            <ScrollView style={MailBoxStyle.ListContainer}>
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
            </ScrollView>

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