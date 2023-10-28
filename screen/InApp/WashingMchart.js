import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, Alert, TextInput } from 'react-native';
import { auth, database } from '../../javascripts/FirebaseConfigFile';
import WashingMchartStyle from '../../styles/Auth/WashingMchartStyle';

const WashingMchartScreen = () => {
    const [washingMachines, setWashingMachines] = useState({});
    const [machineNumber, setMachineNumber] = useState(null);
    const [remainingTimeInput, setRemainingTimeInput] = useState('');
    const [userEmail, setUserEmail] = useState('');

    // Firebase Realtime Database 연결 설정
    useEffect(() => {
        const databaseRef = database.ref('washingMachines');

        // 데이터베이스에서 초기 데이터를 가져옵니다.
        databaseRef.on('value', (snapshot) => {
            const data = snapshot.val();
            if (data) {
                setWashingMachines(data);
            }
        });

        // Firebase Realtime Database와의 연결 해제
        return () => {
            databaseRef.off();
        };
    }, []);

    useEffect(() => {
        const authObserver = auth.onAuthStateChanged((user) => {
            setUserEmail(user ? user.email : '');
        });
        return authObserver;
    }, []);

    const handleMachineClick = (machineNumber) => {
        if (!washingMachines[machineNumber]) {
            // 세탁기가 없는 경우
            Alert.alert(`세탁기 ${machineNumber}는 존재하지 않습니다.`);
        } else if (washingMachines[machineNumber].available) {
            // 세탁기가 사용 가능한 경우 남은 시간 입력 폼을 표시
            setMachineNumber(machineNumber);
        } else {
            // 세탁기가 사용 중인 경우 예약 여부를 묻는 알림 표시
            Alert.alert(
                `세탁기 ${machineNumber}`,
                `남은 시간: ${washingMachines[machineNumber].remainingTime}분\n예약하시겠습니까?`,
                [
                    {
                        text: '예약',
                        onPress: () => reserveMachine(machineNumber, userEmail),
                    },
                    {
                        text: '취소',
                        onPress: () => console.log('취소'),
                        style: 'cancel',
                    },
                ]
            );
        }
    };

    const reserveMachine = (machineNumber, userE) => {
        const initialRemainingTime = parseInt(remainingTimeInput, 10) || 30;

        if (isNaN(initialRemainingTime)) {
            Alert.alert('올바른 시간을 입력하세요.');
            return;
        }

        database.ref(`washingMachines/${machineNumber}`).update({
            available: true,
            userId: userE,
            useTime: initialRemainingTime,
            remainingTime: initialRemainingTime,
        });

        if (initialRemainingTime <= 5) {
            Alert.alert(
                `세탁기 ${machineNumber} 예약이 완료되었습니다. 남은 시간: ${initialRemainingTime}분. (5분 이하)`
            );
        }

        // 남은 시간을 감소시키는 타이머 시작
        const timer = setInterval(() => {
            const machineRef = database.ref(`washingMachines/${machineNumber}`);

            machineRef.once('value').then((snapshot) => {
                const machine = snapshot.val();

                if (machine && machine.remainingTime > 0) {
                    const updatedRemainingTime = machine.remainingTime - 1;

                    machineRef.update({
                        remainingTime: updatedRemainingTime,
                    });

                    if (updatedRemainingTime <= 5) {
                        Alert.alert(
                            `세탁기 ${machineNumber} 남은 시간: ${updatedRemainingTime}분. (5분 이하)`
                        );
                    }
                } else if (machine && machine.remainingTime === 0) {
                    machineRef.update({
                        available: true,
                        remainingTime: 0,
                        useTime: 0,
                        userId: '', // 나중에 reservedUserId update
                    });

                    clearInterval(timer);
                }
            });
        }, 60000); // 1분마다 감소 (60,000 밀리초)

        // 남은 시간 입력 폼 초기화
        setMachineNumber(null);
        setRemainingTimeInput('');
    };

    const autoReserveMachine = () => {
        const availableMachines = Object.entries(washingMachines)
            .filter(
                ([_, machine]) => machine.available && machine.remainingTime !== null
            )
            .sort(([, a], [, b]) => a.remainingTime - b.remainingTime);
        if (availableMachines.length > 0) {
            // 사용 가능한 세탁기가 있을 때
            const [machineNumber] = availableMachines[0];
            Alert.alert(`사용 가능한 세탁기: ${machineNumber}`);
        } else {
            // 사용 가능한 세탁기가 없을 때
            const shortestTimeMachine = Object.entries(washingMachines)
                .filter(([_, machine]) => machine.remainingTime !== null)
                .sort(([, a], [, b]) => a.remainingTime - b.remainingTime);
            if (shortestTimeMachine.length > 0) {
                const [machineNumber] = shortestTimeMachine[0];
                reserveMachine(machineNumber, userEmail);
            } else {
                Alert.alert('예약 가능한 세탁기가 없습니다.');
            }
        }
    };

    import React, { useState, useEffect, createRef } from "react";
    import { StatusBar } from 'expo-status-bar';
    import { Text, View, TouchableOpacity, TextInput, Button, Alert, StyleSheet } from 'react-native';

    //스타일 import
    import WashingMchartStyle from "../../styles/Auth/WashingMchartStyle";

    export default function WashingMchartScreen({ navigation }) {
        const [machineState, setMachineState] = useState("default");

        return (
            <View>
                {machineNumber !== null ? (
                    // 남은 시간 입력 폼 표시
                    <View style={WashingMchartStyle.iconContainer}>
                        <TextInput
                            placeholder="사용 시간 입력 (분)"
                            onChangeText={(text) => setRemainingTimeInput(text)}
                            keyboardType="numeric"
                        />
                        <TouchableOpacity
                            style={WashingMchartStyle.rightButton}
                            onPress={() => reserveMachine(machineNumber, userEmail)}
                        >
                            <Text>예약</Text>
                        </TouchableOpacity>
                    </View>
                ) : (
                    // 세탁기 상태 표시
                    <>
                        <View style={WashingMchartStyle.iconContainer}>
                            <TouchableOpacity
                                style={WashingMchartStyle.rightButton}
                                onPress={() => handleMachineClick('1')}
                            >
                                <Text>1번 세탁기</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={WashingMchartStyle.rightButton}
                                onPress={() => handleMachineClick('4')}
                            >
                                <Text>4번 세탁기</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={WashingMchartStyle.iconContainer}>
                            {/*세탁기1*/}
                            <TouchableOpacity style={WashingMchartStyle.leftButton}
                                onPress={() => navigation.navigate("세탁시간입력")}>
                                <Text>1번 세탁기</Text>
                            </TouchableOpacity>

                            {/*세탁기4*/}
                            <TouchableOpacity style={WashingMchartStyle.rightButton}
                                //'예약가능'이라고 가정하고 예약페이지로 이동코드 임시로 추가
                                onPress={() => navigation.navigate("예약하기")}>
                                {/* onPress={() => navigation.navigate("배치도")}> */}
                                <Text>4번 세탁기</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={WashingMchartStyle.iconContainer}>
                            <TouchableOpacity
                                style={WashingMchartStyle.rightButton}
                                onPress={() => handleMachineClick('2')}
                            >
                                <Text>2번 세탁기</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={WashingMchartStyle.rightButton}
                                onPress={() => handleMachineClick('5')}
                            >
                                <Text>5번 세탁기</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={WashingMchartStyle.iconContainer}>
                            {/*세탁기2*/}
                            <TouchableOpacity style={WashingMchartStyle.leftButton}>
                                {/* onPress={() => navigation.navigate("배치도")}> */}
                                <Text>2번 세탁기</Text>
                            </TouchableOpacity>

                            {/*세탁기5*/}
                            <TouchableOpacity style={WashingMchartStyle.rightButton}>
                                {/* onPress={() => navigation.navigate("배치도")}> */}
                                <Text>5번 세탁기</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={WashingMchartStyle.iconContainer}>
                            <TouchableOpacity
                                style={WashingMchartStyle.rightButton}
                                onPress={() => handleMachineClick('3')}
                            >
                                <Text>3번 세탁기</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={WashingMchartStyle.rightButton}
                                onPress={() => handleMachineClick('6')}
                            >
                                <Text>6번 세탁기</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={WashingMchartStyle.iconContainer}>
                            {/*건조기1*/}
                            <TouchableOpacity style={WashingMchartStyle.leftButton}>
                                {/* onPress={() => navigation.navigate("배치도")}> */}
                                <Text>1번 건조기</Text>
                            </TouchableOpacity>

                            {/*세탁기7*/}
                            <TouchableOpacity style={WashingMchartStyle.rightButton}>
                                {/* onPress={() => navigation.navigate("배치도")}> */}
                                <Text>7번 세탁기</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={WashingMchartStyle.iconContainer}>
                            <TouchableOpacity
                                style={WashingMchartStyle.rightButton}
                                onPress={() => handleMachineClick('8')}
                            >
                                <Text>8번 세탁기</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={WashingMchartStyle.rightButton}>
                                <Text>2번 건조기</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={WashingMchartStyle.iconContainer}>
                            {/*입구*/}
                            <TouchableOpacity style={WashingMchartStyle.leftButton}>
                                {/* onPress={() => navigation.navigate("배치도")}> */}
                                <Text>자동 추천</Text>
                            </TouchableOpacity>

                            {/*건조기3*/}
                            <TouchableOpacity style={WashingMchartStyle.rightButton}>
                                {/* onPress={() => navigation.navigate("배치도")}> */}
                                <Text>3번 건조기</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={WashingMchartStyle.iconContainer}>
                            {/*입구*/}
                            <TouchableOpacity style={WashingMchartStyle.leftButton}>
                                {/* onPress={() => navigation.navigate("배치도")}> */}
                                <Text>입구</Text>
                            </TouchableOpacity>

                            {/*건조기4*/}
                            <TouchableOpacity style={WashingMchartStyle.rightButton}>
                                {/* onPress={() => navigation.navigate("배치도")}> */}
                                <Text>4번 건조기</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                );
};

                export default WashingMchartScreen;
