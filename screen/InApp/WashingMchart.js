import React, { useState, useEffect } from "react";
import { View, TouchableOpacity, Text, Alert, TextInput } from 'react-native';
import firebase from 'firebase';
import WashingMchartStyle from "../../styles/Auth/WashingMchartStyle";

const WashingMchartScreen = () => {
    const [washingMachines, setWashingMachines] = useState({});
    const [machineNumber, setMachineNumber] = useState(null);
    const [remainingTimeInput, setRemainingTimeInput] = useState(null);

    // Firebase Realtime Database 연결 설정
    useEffect(() => {
        const databaseRef = firebase.database().ref('washingMachines');

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
                        text: "예약",
                        onPress: () => reserveMachine(machineNumber, 'user1'),
                    },
                    {
                        text: "취소",
                        onPress: () => console.log("취소"),
                        style: "cancel",
                    },
                ]
            );
        }
    };

    const reserveMachine = (machineNumber, userId) => {
        const initialRemainingTime = parseInt(remainingTimeInput, 10) || 30; // 입력된 남은 시간 또는 기본 값 (예: 30분)

        firebase.database().ref(`washingMachines/${machineNumber}`).update({
            available: false,
            reservedBy: userId,
            remainingTime: initialRemainingTime,
        });

        if (initialRemainingTime <= 5) {
            Alert.alert(`세탁기 ${machineNumber} 예약이 완료되었습니다. 남은 시간: ${initialRemainingTime}분. (5분 이하)`);
        } else {
            Alert.alert(`세탁기 ${machineNumber} 예약이 완료되었습니다. 남은 시간: ${initialRemainingTime}분.`);
        }

        // 남은 시간을 감소시키는 타이머 시작
        const timer = setInterval(() => {
            if (washingMachines[machineNumber]) {
                const updatedRemainingTime = washingMachines[machineNumber].remainingTime - 1;
                firebase.database().ref(`washingMachines/${machineNumber}`).update({
                    remainingTime: updatedRemainingTime,
                });

                if (updatedRemainingTime <= 5) {
                    Alert.alert(`세탁기 ${machineNumber} 남은 시간: ${updatedRemainingTime}분. (5분 이하)`);
                }

                if (updatedRemainingTime <= 0) {
                    clearInterval(timer);
                }
            } else {
                clearInterval(timer);
            }
        }, 60000); // 1분마다 감소 (60,000 밀리초)

        // 남은 시간 입력 폼 초기화
        setMachineNumber(null);
        setRemainingTimeInput(null);
    };

    const autoReserveMachine = (userId) => {
        const availableMachines = Object.entries(washingMachines)
            .filter(([_, machine]) => machine.available && machine.remainingTime !== null)
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
                reserveMachine(machineNumber, userId);
            } else {
                Alert.alert('예약 가능한 세탁기가 없습니다.');
            }
        }
    };

    return (
        <View>
            {machineNumber !== null ? (
                // 남은 시간 입력 폼 표시
                <View style={WashingMchartStyle.iconContainer}>
                    <TextInput
                        placeholder="남은 시간 (분)"
                        onChangeText={(text) => setRemainingTimeInput(text)}
                        keyboardType="numeric"
                    />
                    <TouchableOpacity style={WashingMchartStyle.rightButton} onPress={() => reserveMachine(machineNumber, 'user1')}>
                        <Text>예약</Text>
                    </TouchableOpacity>
                </View>
            ) : (
                // 세탁기 상태 표시
                <>
                    <View style={WashingMchartStyle.iconContainer}>
                        <TouchableOpacity style={WashingMchartStyle.rightButton} onPress={() => handleMachineClick('1')}>
                            <Text>1번 세탁기</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={WashingMchartStyle.rightButton} onPress={() => handleMachineClick('4')}>
                            <Text>4번 세탁기</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={WashingMchartStyle.iconContainer}>
                        <TouchableOpacity style={WashingMchartStyle.rightButton} onPress={() => handleMachineClick('2', 'user1')}>
                            <Text>2번 세탁기</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={WashingMchartStyle.rightButton} onPress={() => handleMachineClick('5', 'user1')}>
                            <Text>5번 세탁기</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={WashingMchartStyle.iconContainer}>
                        <TouchableOpacity style={WashingMchartStyle.rightButton} onPress={() => handleMachineClick('3', 'user1')}>
                            <Text>3번 세탁기</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={WashingMchartStyle.rightButton} onPress={() => handleMachineClick('6', 'user1')}>
                            <Text>6번 세탁기</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={WashingMchartStyle.iconContainer}>
                        <TouchableOpacity style={WashingMchartStyle.rightButton} onPress={() => handleMachineClick('7', 'user1')}>
                            <Text>7번 세탁기</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={WashingMchartStyle.rightButton}>
                            <Text>1번 건조기</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={WashingMchartStyle.iconContainer}>
                        <TouchableOpacity style={WashingMchartStyle.rightButton} onPress={() => handleMachineClick('8', 'user1')}>
                            <Text>8번 세탁기</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={WashingMchartStyle.rightButton}>
                            <Text>2번 건조기</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={WashingMchartStyle.iconContainer}>
                        <TouchableOpacity style={WashingMchartStyle.rightButton} onPress={() => autoReserveMachine('user1')}>
                            <Text>자동 추천</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={WashingMchartStyle.rightButton}>
                            <Text>3번 건조기</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={WashingMchartStyle.iconContainer}>
                        <TouchableOpacity style={WashingMchartStyle.rightButton}>
                            <Text>4번 건조기</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={WashingMchartStyle.rightButton} onPress={() => Alert.alert('입구입니다.')}>
                            <Text>입구</Text>
                        </TouchableOpacity>
                    </View>
                </>
            )}
        </View>
    );
};

export default WashingMchartScreen;
