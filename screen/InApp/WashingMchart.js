import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, Alert, TextInput } from 'react-native';
import { auth, database } from '../../javascripts/FirebaseConfigFile';
import WashingMchartStyle from '../../styles/Auth/WashingMchartStyle';

const WashingMchartScreen = ({ navigation }) => {
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
            Alert.alert(`${machineNumber}번 세탁기 사용 중입니다.`);
        } else if (washingMachines[machineNumber].userId === userEmail) {
            // 사용자가 이미 예약한 경우 예약 취소 여부를 묻는 알림 표시
            Alert.alert(
                `세탁기 ${machineNumber}`,
                `예약 중입니다. 예약을 취소하시겠습니까?`,
                [
                    {
                        text: '예',
                        onPress: () => cancelReservation(machineNumber),
                    },
                    {
                        text: '아니오',
                        onPress: () => console.log('취소'),
                        style: 'cancel',
                    },
                ]
            );
        } else {
            // 다른 사용자가 이미 예약한 경우 알림 표시
            Alert.alert(
                `${machineNumber}번 세탁기`,
                `다른 사용자가 이미 예약 중입니다. 예약을 하시겠습니까?`,
                [
                    {
                        text: '예',
                        onPress: () => reserveMachine(machineNumber, userEmail),
                    },
                    {
                        text: '아니오',
                        onPress: () => console.log('취소'),
                        style: 'cancel',
                    },
                ]
            );
        }
    };

    const reserveMachine = (machineNumber, userEmail) => {
        const initialRemainingTime = parseInt(remainingTimeInput, 10) || 30;

        if (isNaN(initialRemainingTime)) {
            Alert.alert('올바른 시간을 입력하세요.');
            return;
        }

        database.ref(`washingMachines/${machineNumber}`).transaction((machine) => {
            if (machine && machine.available) {
                machine.available = false;
                machine.userId = userEmail;
                machine.useTime = initialRemainingTime;
                machine.remainingTime = initialRemainingTime;
            }
            return machine;
        }, (error, committed) => {
            if (error) {
                Alert.alert('예약에 실패하였습니다.');
            } else if (committed) {
                const message = washingMachines[machineNumber].remainingTime !== null
                    ? `${machineNumber}번 세탁기 예약이 완료되었습니다. \n남은 시간: ${initialRemainingTime}분.`
                    : `${machineNumber}번 세탁기 사용 시작. 남은 시간: ${initialRemainingTime}분.`;
                Alert.alert(message);
                const timer = setInterval(() => {
                    database.ref(`washingMachines/${machineNumber}`).transaction((machine) => {
                        if (machine && machine.remainingTime > 0) {
                            const updatedRemainingTime = machine.remainingTime - 1;
                            machine.remainingTime = updatedRemainingTime;
                            if (updatedRemainingTime <= 5) {
                                Alert.alert(
                                    `${machineNumber}번 세탁기 남은 시간: ${updatedRemainingTime}분. (5분 이하)`
                                );
                            }
                        } else if (machine && machine.remainingTime === 0) {
                            machine.available = true;
                            machine.remainingTime = 0;
                            machine.useTime = 0;
                            machine.userId = '';
                            clearInterval(timer);
                            Alert.alert(`${machineNumber}번 세탁기 사용이 완료되었습니다.`);
                        }
                        return machine;
                    });
                }, 60000);
            } else {
                Alert.alert('예약에 실패하였습니다.');
            }
        });

        // 남은 시간 입력 폼 초기화
        setMachineNumber(null);
        setRemainingTimeInput('');
    };

    const cancelReservation = (machineNumber) => {
        database.ref(`washingMachines/${machineNumber}`).transaction((machine) => {
            if (machine && machine.userId === userEmail) {
                machine.available = true;
                machine.remainingTime = 0;
                machine.useTime = 0;
                machine.userId = '';
            }
            return machine;
        }, (error, committed) => {
            if (error) {
                Alert.alert('예약 취소에 실패하였습니다.');
            } else if (committed) {
                Alert.alert(`${machineNumber}번 세탁기 예약이 취소되었습니다.`);
            } else {
                Alert.alert('예약 취소에 실패하였습니다.');
            }
        });
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
            Alert.alert(`사용 가능한 세탁기: ${machineNumber}번`);
        } else {
            // 사용 가능한 세탁기가 없을 때
            const shortestTimeMachine = Object.entries(washingMachines)
                .filter(([_, machine]) => machine.remainingTime !== null)
                .sort(([, a], [, b]) => a.remainingTime - b.remainingTime);
            if (shortestTimeMachine.length > 0) {
                const [machineNumber] = shortestTimeMachine[0];
                Alert.alert(
                    `세탁기 ${machineNumber}번 예약하시겠습니까?`,
                    '',
                    [
                        {
                            text: '예',
                            onPress: () => reserveMachine(machineNumber, userEmail),
                        },
                        {
                            text: '아니오',
                            onPress: () => console.log('취소'),
                            style: 'cancel',
                        },
                    ]
                );
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
                    <Text>{machineNumber}번 세탁기 사용 중입니다. 남은 시간: {remainingTimeInput}분.</Text>
                    <TextInput
                        placeholder="사용 시간 입력 (분)"
                        onChangeText={(text) => setRemainingTimeInput(text)}
                        keyboardType="numeric"
                    />
                    <TouchableOpacity
                        style={WashingMchartStyle.rightButton}
                        onPress={() => reserveMachine(machineNumber, userEmail)}
                    >
                        <Text>사용 시작</Text>
                    </TouchableOpacity>
                </View>
            ) : (
                // 세탁기 상태 표시
                //사용 가능 : 세탁시간 입력
                //예약 가능 : 예약하기
                <View>
                    <View style={WashingMchartStyle.iconContainer}>
                        {/*세탁기1*/}
                        <TouchableOpacity
                            style={WashingMchartStyle.leftButton}
                            onPress={() => handleMachineClick('1')}
                        >
                            <Text>1번 세탁기</Text>
                        </TouchableOpacity>

                        {/*세탁기4*/}
                        <TouchableOpacity
                            style={WashingMchartStyle.rightButton}
                            onPress={() => handleMachineClick('4')}
                        >
                            <Text>4번 세탁기</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={WashingMchartStyle.iconContainer}>
                        {/*세탁기2*/}
                        <TouchableOpacity
                            style={WashingMchartStyle.leftButton}
                            onPress={() => handleMachineClick('2')}
                        >
                            <Text>2번 세탁기</Text>
                        </TouchableOpacity>

                        {/*세탁기5*/}
                        <TouchableOpacity
                            style={WashingMchartStyle.rightButton}
                            onPress={() => handleMachineClick('5')}
                        >
                            <Text>5번 세탁기</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={WashingMchartStyle.iconContainer}>
                        {/*세탁기3*/}
                        <TouchableOpacity
                            style={WashingMchartStyle.leftButton}
                            onPress={() => handleMachineClick('3')}
                        >
                            <Text>3번 세탁기</Text>
                        </TouchableOpacity>

                        {/*세탁기6*/}
                        <TouchableOpacity
                            style={WashingMchartStyle.rightButton}
                            onPress={() => handleMachineClick('6')}
                        >
                            <Text>6번 세탁기</Text>
                        </TouchableOpacity>
                    </View>

                    <View
                        style={WashingMchartStyle.iconContainer}>
                        {/*건조기1*/}
                        <TouchableOpacity
                            style={WashingMchartStyle.leftButton}
                        >
                            <Text>1번 건조기</Text>
                        </TouchableOpacity>

                        {/*세탁기7*/}
                        <TouchableOpacity
                            style={WashingMchartStyle.rightButton}
                            onPress={() => handleMachineClick('7')}
                        >
                            <Text>7번 세탁기</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={WashingMchartStyle.iconContainer}>
                        {/*세탁기8*/}
                        <TouchableOpacity
                            style={WashingMchartStyle.leftButton}
                            onPress={() => handleMachineClick('8')}
                        >
                            <Text>8번 세탁기</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={WashingMchartStyle.rightButton}
                        >
                            <Text>2번 건조기</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={WashingMchartStyle.iconContainer}>
                        {/*입구*/}
                        <TouchableOpacity
                            style={WashingMchartStyle.leftButton}
                            onPress={() => autoReserveMachine()}
                        >
                            <Text>자동 추천</Text>
                        </TouchableOpacity>

                        {/*건조기3*/}
                        <TouchableOpacity
                            style={WashingMchartStyle.rightButton}
                        >
                            <Text>3번 건조기</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={WashingMchartStyle.iconContainer}>
                        {/*입구*/}
                        <TouchableOpacity
                            style={WashingMchartStyle.leftButton}
                        >
                            <Text>입구</Text>
                        </TouchableOpacity>

                        {/*건조기4*/}
                        <TouchableOpacity
                            style={WashingMchartStyle.rightButton}
                        >
                            <Text>4번 건조기</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )}
        </View>
    );
};

export default WashingMchartScreen;
