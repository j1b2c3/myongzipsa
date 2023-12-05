import React, { useState, useEffect, createRef } from "react";
import { StatusBar } from 'expo-status-bar';
import {
    Text, View, TouchableOpacity, TextInput, Button, Alert, StyleSheet, Image, ActivityIndicator
} from 'react-native';
import { auth, database } from '../../javascripts/FirebaseConfigFile';

// Text 적용
Text.defaultProps = Text.defaultProps || {};
Text.defaultProps.allowFontScaling = false;

//스타일 import
import DryingMchartStyle from "../../styles/Auth/DryingMchartStyle";
import DryingMchart2Style from "../../styles/Auth/DryingMchart2Style";
import InputTimeStyle from '../../styles/Auth/InputTimeStyle';

const DryingMchart2Screen = ({ navigation }) => {
    const [DryingMachines, setDryingMachines] = useState({});
    const [machineNumber, setMachineNumber] = useState(null);
    const [remainingTimeInput, setRemainingTimeInput] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    // Firebase Realtime Database 연결 설정
    useEffect(() => {
        const databaseRef = database.ref('DryingMachines');

        // 데이터베이스에서 초기 데이터를 가져옵니다.
        databaseRef.on('value', (snapshot) => {
            const data = snapshot.val();
            if (data) {
                setDryingMachines(data);
            }
        });

        setTimeout(() => {
            setIsLoading(false); // 화면 로딩 지연 후 끝남을 표시
        }, 1000); // 1초 동안의 지연

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
        if (!DryingMachines[machineNumber]) {
            // 건조기가 없는 경우
            Alert.alert(`건조기 ${machineNumber}는 존재하지 않습니다.`);
        } else if (
            (DryingMachines[machineNumber].available &&
                DryingMachines[machineNumber].reserve) ||
            (DryingMachines[machineNumber].available &&
                DryingMachines[machineNumber].reserveId === userEmail)
        ) {
            Alert.alert(
                `건조기 ${machineNumber}번`,
                `사용하시겠습니까?`,
                [
                    {
                        text: '예',
                        onPress: () => {
                            setMachineNumber(machineNumber),
                                setRemainingTimeInput('')
                        } // remainingTimeInput 초기화
                    },
                    {
                        text: '아니오',
                        onPress: () => console.log('취소'),
                        style: 'cancel',
                    },
                ]
            );
        } else if (DryingMachines[machineNumber].userId === userEmail) {
            // 사용자가 이미 사용중인 경우 사용 취소 여부를 묻는 알림 표시
            Alert.alert(
                `건조기 ${machineNumber}번`,
                `사용 중입니다. 사용을 취소하시겠습니까? \n남은 시간: ${DryingMachines[machineNumber].remainingTime}분`,
                [
                    {
                        text: '예',
                        onPress: () => cancelUsing(machineNumber),
                    },
                    {
                        text: '아니오',
                        onPress: () => console.log('취소'),
                        style: 'cancel',
                    },
                ]
            );
        } else if (
            DryingMachines[machineNumber].reserve === false &&
            DryingMachines[machineNumber].reserveId !== userEmail
        ) {
            // 이미 다른 사람이 예약중인 경우 알림 표시
            Alert.alert(
                `이미 다른 사용자가 예약중입니다. \n남은 시간: ${dryingMachines[machineNumber].remainingTime}분`
            );
        } else if (
            DryingMachines[machineNumber].reserveId === userEmail &&
            DryingMachines[machineNumber].available === false
        ) {
            // 사용자가 이미 예약중인 경우 예약 취소 여부를 묻는 알림 표시
            Alert.alert(
                `건조기 ${machineNumber}번`,
                `예약 중입니다. 취소하시겠습니까? \n남은 시간: ${DryingMachines[machineNumber].remainingTime}분`,
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
            const now = new Date();
            now.setHours(
                now.getHours() +
                9 +
                Math.floor(DryingMachines[machineNumber].remainingTime / 60)
            ); // 한국 시간으로 변환
            now.setMinutes(
                now.getMinutes() + (DryingMachines[machineNumber].remainingTime % 60)
            );

            Alert.alert(
                `${machineNumber}번 건조기`,
                `예약하시겠습니까? 
                건조완료시간: ${now.getHours()}시 ${now.getMinutes()}분.
                남은 시간: ${DryingMachines[machineNumber].remainingTime}분`,
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

    const useMachine = (machineNumber, userEmail, remainingTimeInput) => {
        const initialRemainingTime = parseInt(remainingTimeInput, 10);

        if (isNaN(initialRemainingTime)) {
            return;
        }

        database.ref(`DryingMachines/${machineNumber}`).transaction(
            (machine) => {
                if (machine && machine.available) {
                    machine.available = false;
                    machine.reserve = true;
                    machine.userId = userEmail;
                    machine.useTime = initialRemainingTime;
                    machine.remainingTime = initialRemainingTime;
                    machine.reserveId = '';
                    machine.reservationTime = null;
                }
                return machine;
            },
            (error, committed) => {
                if (error) {
                    Alert.alert('사용 시작에 실패하였습니다.');
                } else if (committed) {
                    const now = new Date();
                    now.setHours(
                        now.getHours() + Math.floor(initialRemainingTime / 60)
                    ); // 한국 시간으로 변환
                    now.setMinutes(now.getMinutes() + (initialRemainingTime % 60));
                    const message = `${machineNumber}번 건조기 사용 시작. ${now.getHours()}시 ${now.getMinutes()}분에 찾아가세요.`;
                    Alert.alert(message);
                    const timer = setInterval(() => {
                        database
                            .ref(`DryingMachines/${machineNumber}`)
                            .transaction((machine) => {
                                if (machine && machine.remainingTime > 0) {
                                    if (
                                        machine.remainingTime == 5 &&
                                        machine.userId === userEmail
                                    ) {
                                        Alert.alert(
                                            `${machineNumber}번 건조기 5분 남았습니다.`
                                        );
                                    }
                                    machine.remainingTime--;
                                } else if (machine && machine.remainingTime === 0) {
                                    if (
                                        machine.userId === userEmail ||
                                        machine.reserveId === userEmail
                                    ) {
                                        Alert.alert(
                                            `${machineNumber}번 건조기 사용이 완료되었습니다.`
                                        );
                                    }
                                    machine.available = true;
                                    machine.remainingTime = 0;
                                    machine.useTime = 0;
                                    machine.userId = '';
                                    machine.reservationTime = null;
                                    clearInterval(timer);
                                }
                                return machine;
                            });
                    }, 60000);
                } else {
                    Alert.alert('사용 시작에 실패하였습니다.');
                }
            }
        );
    };

    const reserveMachine = (machineNumber, userEmail) => {
        database.ref(`DryingMachines/${machineNumber}`).transaction(
            (machine) => {
                if (machine) {
                    if (machine.reserve) {
                        machine.reserve = false;
                        machine.reservationTime = new Date().getTime();
                        machine.reserveId = userEmail;
                        machine.remainingTime = DryingMachines[machineNumber].remainingTime;
                    }
                }
                return machine;
            },
            (error, committed, snapshot) => {
                if (error) {
                    Alert.alert('예약에 실패하였습니다.');
                } else if (committed) {
                    const machine = snapshot.val();
                    const reserveId = machine.reserveId;

                    const now = new Date();
                    now.setHours(
                        now.getHours() + Math.floor(machine.remainingTime / 60)
                    ); // 한국 시간으로 변환
                    now.setMinutes(now.getMinutes() + (machine.remainingTime % 60));

                    Alert.alert(
                        `${machineNumber}번 건조기 예약이 완료되었습니다. 
                    ${now.getHours()}시 ${now.getMinutes()}분에 사용하세요.`
                    );
                    const timer = setInterval(() => {
                        database
                            .ref(`DryingMachines/${machineNumber}`)
                            .transaction((machine) => {
                                if (machine && machine.remainingTime > 0) {
                                    machine.remainingTime--;
                                    if (
                                        machine.remainingTime == 5 &&
                                        machine.reserveId === reserveId
                                    ) {
                                        Alert.alert(
                                            `${machineNumber}번 건조기 5분 남았습니다.`
                                        );
                                    }
                                } else if (machine && machine.remainingTime === 0) {
                                    machine.available = true;
                                    machine.remainingTime = 0;
                                    machine.useTime = 0;
                                    machine.userId = '';
                                    clearInterval(timer);
                                    Alert.alert(
                                        `${machineNumber}번 건조기 사용이 완료되었습니다.`
                                    );
                                }
                                return machine;
                            });
                    }, 60000);
                } else {
                    Alert.alert('예약에 실패하였습니다.');
                }
            }
        );

        // 남은 시간 입력 폼 초기화
        setMachineNumber(null);
        setRemainingTimeInput('');
    };

    const cancelUsing = (machineNumber) => {
        database.ref(`DryingMachines/${machineNumber}`).transaction(
            (machine) => {
                if (machine && machine.userId === userEmail) {
                    machine.available = true;
                    machine.remainingTime = 0;
                    machine.useTime = 0;
                    if (machine.reserveId !== '') {
                        machine.userId = machine.reserveId;
                    } else if (machine.reserveId === '') {
                        machine.userId === '';
                    }
                    machine.reservationTime = null;
                }
                return machine;
            },
            (error, committed) => {
                if (error) {
                    Alert.alert('사용 취소에 실패하였습니다.');
                } else if (committed) {
                    Alert.alert(`${machineNumber}번 건조기 사용이 취소되었습니다.`);
                } else {
                    Alert.alert('사용 취소에 실패하였습니다.');
                }
            }
        );
    };

    const cancelReservation = (machineNumber) => {
        database.ref(`DryingMachines/${machineNumber}`).transaction(
            (machine) => {
                if (machine && machine.reserveId === userEmail) {
                    machine.reserve = true;
                    machine.reserveId = '';
                    machine.reservationTime = null;
                }
                return machine;
            },
            (error, committed) => {
                if (error) {
                    Alert.alert('예약 취소에 실패하였습니다.');
                } else if (committed) {
                    Alert.alert(`${machineNumber}번 건조기 예약이 취소되었습니다.`);
                } else {
                    Alert.alert('예약 취소에 실패하였습니다.');
                }
            }
        );
    };

    const handleColor = (machine, userEmail) => {
        const { reserveId, userId, available, reserve } = DryingMachines[machine];
        if (reserveId === userEmail && available) {
            return 'blue';
        } else if (userId === userEmail) {
            return 'orange';
        } else if (reserveId !== userEmail && reserveId !== '' && available) {
            return 'red';
        } else if (reserveId === userEmail) {
            return 'orange';
        } else if (available) {
            return '#004CFF';
        } else if (reserve) {
            return 'yellow';
        } else {
            return 'red';
        }
    };

    return (
        <View style={DryingMchartStyle.container}>
            {isLoading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : (
                <View style={DryingMchartStyle.container}>
                    {machineNumber !== null ? (
                        // 남은 시간 입력 폼 표시
                        <View style={InputTimeStyle.InputContainer}>
                            <TextInput
                                style={InputTimeStyle.input}
                                placeholder="건조 시간 (분단위로 입력)"
                                onChangeText={(text) => setRemainingTimeInput(text)}
                                keyboardType="numeric"
                            />
                            <TouchableOpacity
                                style={InputTimeStyle.button}
                                onPress={() =>
                                    useMachine(
                                        machineNumber,
                                        userEmail,
                                        parseInt(remainingTimeInput, 10)
                                    )
                                }
                            >
                                <Text>사용 시작</Text>
                            </TouchableOpacity>
                        </View>
                    ) : (
                        <View style={DryingMchart2Style.container}>
                            <View style={DryingMchart2Style.row}>
                                {/* 1행 */}
                                <TouchableOpacity
                                    style={DryingMchart2Style.machine}
                                >
                                    <Image style={DryingMchart2Style.machineImage}
                                        source={require("../../img/non_washing_machine.jpg")} />
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={DryingMchart2Style.machine2}
                                    onPress={() => handleMachineClick('5')}
                                >
                                    <Image style={DryingMchart2Style.machineImage}
                                        source={require("../../img/drying_machine.jpg")} />
                                    <View style={[DryingMchartStyle.overlay,
                                    { backgroundColor: handleColor('5', userEmail) },
                                    ]}
                                    >
                                        <Text style={DryingMchart2Style.overlayText}>5</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                            {/* 2행 */}
                            <View style={DryingMchart2Style.row}>
                                <TouchableOpacity
                                    style={DryingMchart2Style.machine}
                                >
                                    <Image style={DryingMchart2Style.machineImage}
                                        source={require("../../img/non_washing_machine.jpg")} />
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={DryingMchart2Style.machine2}
                                    onPress={() => handleMachineClick('6')}
                                >
                                    <Image style={DryingMchart2Style.machineImage}
                                        source={require("../../img/drying_machine.jpg")} />
                                    <View style={[DryingMchartStyle.overlay,
                                    { backgroundColor: handleColor('6', userEmail) },
                                    ]}
                                    >
                                        <Text style={DryingMchart2Style.overlayText}>6</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                            {/* 3행 */}
                            <View style={DryingMchart2Style.row}>
                                <TouchableOpacity
                                    style={DryingMchart2Style.machine}
                                >
                                    <Image style={DryingMchart2Style.machineImage}
                                        source={require("../../img/non_washing_machine.jpg")} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    )}
                </View>
            )}
        </View>
    );
}

export default DryingMchart2Screen;
