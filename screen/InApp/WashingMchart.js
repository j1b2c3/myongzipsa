import React, { useState, useEffect, createRef } from 'react';
import { StyleSheet } from 'react-native';
import {
    View,
    TouchableOpacity,
    Text,
    Alert,
    TextInput,
    Image,
    ActivityIndicator,
    Button,
} from 'react-native';

import { auth, database } from '../../javascripts/FirebaseConfigFile';
import InputTimeStyle from '../../styles/Auth/InputTimeStyle';
import WashingMchartStyle from '../../styles/Auth/WashingMchartStyle';

const WashingMchartScreen = ({ navigation }) => {
    const [washingMachines, setWashingMachines] = useState({});
    const [machineNumber, setMachineNumber] = useState(null);
    const [remainingTimeInput, setRemainingTimeInput] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [isLoading, setIsLoading] = useState(true);

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
        if (!washingMachines[machineNumber]) {
            // 세탁기가 없는 경우
            Alert.alert(`세탁기 ${machineNumber}는 존재하지 않습니다.`);
        } else if (
            (washingMachines[machineNumber].available &&
                washingMachines[machineNumber].reserve) ||
            (washingMachines[machineNumber].available &&
                washingMachines[machineNumber].reserveId === userEmail)
        ) {
            // 세탁기가 사용 가능한 경우 남은 시간 입력 폼을 표시
            setMachineNumber(machineNumber);
            setRemainingTimeInput(''); // remainingTimeInput 초기화
        } else if (washingMachines[machineNumber].userId === userEmail) {
            // 사용자가 이미 사용중인 경우 사용 취소 여부를 묻는 알림 표시
            Alert.alert(
                `세탁기 ${machineNumber}번`,
                `사용 중입니다. 사용을 취소하시겠습니까? \n남은 시간: ${washingMachines[machineNumber].remainingTime}분`,
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
            washingMachines[machineNumber].reserve === false &&
            washingMachines[machineNumber].reserveId !== userEmail
        ) {
            // 이미 다른 사람이 예약중인 경우 알림 표시
            Alert.alert(
                `이미 다른 사용자가 예약중입니다. \n남은 시간: ${washingMachines[machineNumber].remainingTime} 분`
            );
        } else if (
            washingMachines[machineNumber].reserveId === userEmail &&
            washingMachines[machineNumber].available === false
        ) {
            // 사용자가 이미 예약중인 경우 예약 취소 여부를 묻는 알림 표시
            Alert.alert(
                `세탁기 ${machineNumber}번`,
                `예약 중입니다. 취소하시겠습니까? \n남은 시간: ${washingMachines[machineNumber].remainingTime}분`,
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
                Math.floor(washingMachines[machineNumber].remainingTime / 60)
            ); // 한국 시간으로 변환
            now.setMinutes(
                now.getMinutes() + (washingMachines[machineNumber].remainingTime % 60)
            );

            Alert.alert(
                `${machineNumber}번 세탁기`,
                `예약하시겠습니까? 
                세탁완료시간: ${now.getHours()}시 ${now.getMinutes()}분.
                남은 시간: ${washingMachines[machineNumber].remainingTime}분`,
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

        database.ref(`washingMachines/${machineNumber}`).transaction(
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
                    now.setHours(now.getHours() + Math.floor(initialRemainingTime / 60));
                    now.setMinutes(now.getMinutes() + (initialRemainingTime % 60));
                    const message = `${machineNumber}번 세탁기 사용 시작. ${now.getHours()}시 ${now.getMinutes()}분에 찾아가세요.`;
                    Alert.alert(message);
                    const timer = setInterval(() => {
                        database
                            .ref(`washingMachines/${machineNumber}`)
                            .transaction((machine) => {
                                if (machine && machine.remainingTime > 0) {
                                    if (
                                        machine.remainingTime == 5 &&
                                        machine.userId === userEmail
                                    ) {
                                        Alert.alert(
                                            `${machineNumber}번 세탁기 남은 시간: ${machine.remainingTime}분. (5분 이하)`
                                        );
                                    }
                                    machine.remainingTime--;
                                } else if (machine && machine.remainingTime === 0) {
                                    if (
                                        machine.userId === userEmail ||
                                        machine.reserveId === userEmail
                                    ) {
                                        Alert.alert(
                                            `${machineNumber}번 세탁기 사용이 완료되었습니다.`
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
                    }, 10000);
                } else {
                    Alert.alert('사용 시작에 실패하였습니다.');
                }
            }
        );
    };

    const reserveMachine = (machineNumber, userEmail) => {
        database.ref(`washingMachines/${machineNumber}`).transaction(
            (machine) => {
                if (machine) {
                    if (machine.reserve) {
                        machine.reserve = false;
                        machine.reservationTime = new Date().getTime();
                        machine.reserveId = userEmail;
                        machine.remainingTime =
                            washingMachines[machineNumber].remainingTime;
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
                    now.setHours(now.getHours() + Math.floor(machine.remainingTime / 60));
                    now.setMinutes(now.getMinutes() + (machine.remainingTime % 60));

                    Alert.alert(
                        `${machineNumber}번 세탁기 예약이 완료되었습니다. 
                        ${now.getHours()}시 ${now.getMinutes()}분에 사용하세요.`
                    );
                    const timer = setInterval(() => {
                        database
                            .ref(`washingMachines/${machineNumber}`)
                            .transaction((machine) => {
                                if (machine && machine.remainingTime > 0) {
                                    machine.remainingTime--;
                                    if (
                                        machine.remainingTime == 5 &&
                                        machine.reserveId === reserveId
                                    ) {
                                        Alert.alert(`${machineNumber}번 세탁기 5분 남았습니다.`);
                                    }
                                } else if (machine && machine.remainingTime === 0) {
                                    machine.available = true;
                                    machine.remainingTime = 0;
                                    machine.useTime = 0;
                                    machine.userId = '';
                                    clearInterval(timer);
                                    Alert.alert(
                                        `${machineNumber}번 세탁기 사용이 완료되었습니다.`
                                    );
                                }
                                return machine;
                            });
                    }, 10000);
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
        database.ref(`washingMachines/${machineNumber}`).transaction(
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
                    Alert.alert(`${machineNumber}번 세탁기 사용이 취소되었습니다.`);
                } else {
                    Alert.alert('사용 취소에 실패하였습니다.');
                }
            }
        );
    };

    const cancelReservation = (machineNumber) => {
        database.ref(`washingMachines/${machineNumber}`).transaction(
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
                    Alert.alert(`${machineNumber}번 세탁기 예약이 취소되었습니다.`);
                } else {
                    Alert.alert('예약 취소에 실패하였습니다.');
                }
            }
        );
    };

    const autoReserveMachine = () => {
        const availableMachines = Object.entries(washingMachines)
            .filter(
                ([_, machine]) =>
                    machine.available &&
                    machine.remainingTime !== null &&
                    machine.reserve === true
            )
            .sort(([, a], [, b]) => a.remainingTime - b.remainingTime);
        if (availableMachines.length > 0) {
            // 사용 가능한 세탁기가 있을 때
            const [machineNumber] = availableMachines[0];
            Alert.alert(`사용 가능한 세탁기: ${machineNumber}번`);
        } else {
            // 사용 가능한 세탁기가 없을 때
            const shortestTimeMachine = Object.entries(washingMachines)
                .filter(
                    ([_, machine]) =>
                        machine.remainingTime !== null &&
                        machine.reserve === true &&
                        machine.userId !== userEmail
                )
                .sort(([, a], [, b]) => a.remainingTime - b.remainingTime);
            if (shortestTimeMachine.length > 0) {
                const [machineNumber] = shortestTimeMachine[0];
                const reservationTime = washingMachines[machineNumber].reservationTime;
                const useTime = washingMachines[machineNumber].useTime;
                const currentTime = new Date().getTime();
                if (reservationTime && currentTime - reservationTime >= 5 * 60 * 1000) {
                    // 예약한 사용자가 5분 이내에 사용하지 않은 경우
                    database.ref(`washingMachines/${machineNumber}`).transaction(
                        (machine) => {
                            if (machine && machine.available) {
                                machine.available = false;
                                machine.reserve = true;
                                machine.userId = '';
                                machine.useTime = '';
                                machine.reservationTime = null;
                                machine.reserveId = '';
                            }
                            return machine;
                        },
                        (error, committed) => {
                            if (error) {
                                Alert.alert('예약에 실패하였습니다.');
                            } else if (committed) {
                                Alert.alert(`${machineNumber}번 세탁기 초기화되었습니다.`);
                            } else {
                                Alert.alert('예약에 실패하였습니다.');
                            }
                        }
                    );
                } else {
                    Alert.alert(
                        `세탁기 ${machineNumber}번 예약하시겠습니까?\n 남은시간: ${washingMachines[machineNumber].remainingTime}`,
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
                }
            } else {
                Alert.alert('예약 가능한 세탁기가 없습니다.');
            }
        }
    };

    return (
        <View style={WashingMchartStyle.container}>
            {isLoading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : (
                <View style={WashingMchartStyle.container}>
                    {machineNumber !== null ? (
                        // 남은 시간 입력 폼 표시
                        <View style={InputTimeStyle.InputContainer}>
                            <TextInput
                                style={InputTimeStyle.input}
                                placeholder="세탁시간 (분단위로 입력)"
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
                        <View style={WashingMchartStyle.container}>
                            <View style={WashingMchartStyle.blank}>
                            </View>
                            {/* 1행 */}
                            <View style={WashingMchartStyle.row}>
                                <TouchableOpacity
                                    style={WashingMchartStyle.machine}
                                    onPress={() => handleMachineClick('1')}
                                >
                                    <Image style={WashingMchartStyle.machineImage}
                                        source={require("../../img/washing_machine.jpg")} />
                                    <View style={WashingMchartStyle.overlay}>
                                        <Text style={WashingMchartStyle.overlayText}>1</Text>
                                    </View>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={WashingMchartStyle.machine1}
                                    onPress={() => handleMachineClick('4')}
                                >
                                    <Image style={WashingMchartStyle.machineImage}
                                        source={require("../../img/washing_machine.jpg")} />
                                    <View style={WashingMchartStyle.overlay}>
                                        <Text style={WashingMchartStyle.overlayText}>4</Text>
                                    </View>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={WashingMchartStyle.machine2}
                                >
                                    <Image style={WashingMchartStyle.machineImage}
                                        source={require("../../img/Possible_status.jpg")} />
                                </TouchableOpacity>

                            </View>
                            {/* 2행 */}
                            <View style={WashingMchartStyle.row}>

                                <TouchableOpacity
                                    style={WashingMchartStyle.machine}
                                    onPress={() => handleMachineClick('2')}
                                >
                                    <Image style={WashingMchartStyle.machineImage}
                                        source={require("../../img/washing_machine.jpg")} />
                                    <View style={WashingMchartStyle.overlay}>
                                        <Text style={WashingMchartStyle.overlayText}>2</Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={WashingMchartStyle.machine1}
                                    onPress={() => handleMachineClick('5')}
                                >
                                    <Image style={WashingMchartStyle.machineImage}
                                        source={require("../../img/washing_machine.jpg")} />
                                    <View style={WashingMchartStyle.overlay}>
                                        <Text style={WashingMchartStyle.overlayText}>5</Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={WashingMchartStyle.machine2}
                                >
                                    <Image style={WashingMchartStyle.machineImage}
                                        source={require("../../img/automatic_recommendation_button.jpg")} />
                                </TouchableOpacity>
                            </View>
                            {/* 3행 */}
                            <View style={WashingMchartStyle.row}>
                                <TouchableOpacity
                                    style={WashingMchartStyle.machine}
                                    onPress={() => handleMachineClick('3')}
                                >
                                    <Image style={WashingMchartStyle.machineImage}
                                        source={require("../../img/washing_machine.jpg")} />
                                    <View style={WashingMchartStyle.overlay}>
                                        <Text style={WashingMchartStyle.overlayText}>3</Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={WashingMchartStyle.machine1}
                                    onPress={() => handleMachineClick('6')}
                                >
                                    <Image style={WashingMchartStyle.machineImage}
                                        source={require("../../img/washing_machine.jpg")} />
                                    <View style={WashingMchartStyle.overlay}>
                                        <Text style={WashingMchartStyle.overlayText}>6</Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={WashingMchartStyle.machine2}
                                >
                                    <Image style={WashingMchartStyle.machineImage}
                                        source={require("../../img/report_button.jpg")} />
                                </TouchableOpacity>
                            </View>
                            {/* 4행 */}
                            <View style={WashingMchartStyle.row}>
                                <TouchableOpacity
                                    style={WashingMchartStyle.machine}
                                >
                                    <Image style={WashingMchartStyle.machineImage}
                                        source={require("../../img/non_drying_machine.jpg")} />
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={WashingMchartStyle.machine1}
                                    onPress={() => handleMachineClick('7')}
                                >
                                    <Image style={WashingMchartStyle.machineImage}
                                        source={require("../../img/washing_machine.jpg")} />

                                    <View style={WashingMchartStyle.overlay}>
                                        <Text style={WashingMchartStyle.overlayText}>7</Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={WashingMchartStyle.machine2}
                                >
                                    <Image style={WashingMchartStyle.machineImage}
                                        source={require("../../img/non_drying_machine.jpg")} />
                                </TouchableOpacity>
                            </View>
                            {/* 5행 */}
                            <View style={WashingMchartStyle.row}>
                                <TouchableOpacity
                                    style={WashingMchartStyle.machine}
                                >
                                    <Image style={WashingMchartStyle.machineImage}
                                        source={require("../../img/non_drying_machine.jpg")} />
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={WashingMchartStyle.machine1}
                                    onPress={() => handleMachineClick('8')}

                                >
                                    <Image style={WashingMchartStyle.machineImage}
                                        source={require("../../img/washing_machine.jpg")} />
                                    <View style={WashingMchartStyle.overlay}>
                                        <Text style={WashingMchartStyle.overlayText}>8</Text>
                                    </View>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={WashingMchartStyle.machine2}
                                >
                                    <Image style={WashingMchartStyle.machineImage}
                                        source={require("../../img/non_drying_machine.jpg")} />
                                </TouchableOpacity>
                            </View>
                            <View style={WashingMchartStyle.blank}>
                            </View>
                        </View>
                    )}
                </View>
            )}
        </View>
    );
};

export default WashingMchartScreen;
