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
/*
파이어베이스 realtime database에 MailBox가 있는데
거기 아래 관리자 이메일(admin@gmail.com)이 있어.
관리자 이메일 아래에는 받은 메시지함인 receivedMsg와 보낸 메시지함인
sentMsg가 있어.
각각의 메시지함 아래에는 편지의 순서에 해당하는 순차적인 번호가
부여되어야 해.
만약 사용자가 메시지를 입력하고 "쪽지 보내기" 버튼을 누르면,
관리자 이메일에 있는 receivedMsg 밑에 메시지 순서 번호를
새로 부여하면서 '키 : 값'이
"(보낸 사용자의 이메일)" : "(보낸 메시지 내용)"이 들어가야 해.
만약 사용자가 "받은 쪽지"를 누르면 관리자 이메일 아래에 sentMsg에
들어가서 메시지 순서 번호 밑에 키 값이 "(관리자 이메일)"인
모든 메시지 내용을 화면에 나오도록 해줘.
만약 사용자가 "보낸 쪽지"를 누르면 관리자 이메일에 있는 receivedMsg 밑에
 메시지 순서 번호 밑에 키 값이 사용자의 이메일에 해당하는 내용들만
 화면에 나오도록 해줘.
 모든 메시지 내용은 메시지 순서 번호가 큰 값이 제일 위에 즉 내림차순으로
 나오게 해줘.
 만약 관리자가 "쪽지 보내기"를 누르면 sentMsg에 메시지 순서 번호를
 부여하고 '키 : 값'이 "(관리자 이메일) : (보낸 메시지 내용)" 형태로
 데이터를 저장해줘.

 다시 한 번 말하지만, 로그인 한 이메일이 관리자 이메일이라면 
 받은 쪽지 목록을 보고 싶을 때는 receivedMsg를 열어서 정보를 화면에 띄우고, 
 보낸 쪽지 목록을 보고 싶을 때는 sentMsg를 열어서 정보를 화면에 띄우면 돼.
  관리자가 아닌 일반 사용자의 경우는 그 반대지. 
  일반 사용자가 받은 쪽지 목록을 보고 싶을 때는 관리자 이메일 밑에 
  sentMsg를 열어서 정보를 화면에 띄우면 되고, 
  보낸 쪽지 목록을 보고 싶을 때는 receivedMsg에 들어가서 키 값이 
  자신의 이메일인 정보들만 화면에 띄워주면 돼. 
  로그인한 사람이 관리자이냐, 일반 사용자이냐에 따라 
  다른 처리를 해줘야 해.
*/