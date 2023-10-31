import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, Alert, TextInput, Image, ActivityIndicator } from 'react-native';
import { auth, database } from '../../javascripts/FirebaseConfigFile';
import WashingMchartStyle from '../../styles/Auth/WashingMchartStyle';
import InputTimeStyle from '../../styles/Auth/InputTimeStyle';

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
            washingMachines[machineNumber].available && washingMachines[machineNumber].reserve ||
            washingMachines[machineNumber].available && washingMachines[machineNumber].reserveId === userEmail

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
            Alert.alert(
                `${machineNumber}번 세탁기`,
                `예약하시겠습니까? \n남은 시간: ${washingMachines[machineNumber].remainingTime}분`,
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
                    const message = `${machineNumber}번 세탁기 사용 시작. 남은 시간: ${initialRemainingTime}분.`;
                    Alert.alert(message);
                    const timer = setInterval(() => {
                        database
                            .ref(`washingMachines/${machineNumber}`)
                            .transaction((machine) => {
                                if (machine && machine.remainingTime > 0) {
                                    if (
                                        machine.remainingTime <= 5 &&
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
                                    machine.userId = ''
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

                    Alert.alert(
                        `${machineNumber}번 세탁기 예약이 완료되었습니다. \n남은 시간: ${machine.remainingTime}분.`
                    );
                    const timer = setInterval(() => {
                        database
                            .ref(`washingMachines/${machineNumber}`)
                            .transaction((machine) => {
                                if (machine && machine.remainingTime > 0) {
                                    machine.remainingTime--;
                                    if (
                                        machine.remainingTime <= 5 &&
                                        machine.reserveId === reserveId
                                    ) {
                                        Alert.alert(
                                            `${machineNumber}번 세탁기 남은 시간: ${machine.remainingTime}분. (5분 이하)`
                                        );
                                    }
                                } else if (machine && machine.remainingTime === 0) {
                                    machine.available = true;
                                    machine.remainingTime = 0;
                                    machine.useTime = 0;
                                    machine.userId = ''
                                    clearInterval(timer);
                                    Alert.alert(
                                        `${machineNumber}번 세탁기 사용이 완료되었습니다.`
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
                ([_, machine]) => machine.available && machine.remainingTime !== null && machine.reserve === true
            )
            .sort(([, a], [, b]) => a.remainingTime - b.remainingTime);
        if (availableMachines.length > 0) {
            // 사용 가능한 세탁기가 있을 때
            const [machineNumber] = availableMachines[0];
            Alert.alert(`사용 가능한 세탁기: ${machineNumber}번`);
        } else {
            // 사용 가능한 세탁기가 없을 때
            const shortestTimeMachine = Object.entries(washingMachines)
                .filter(([_, machine]) => machine.remainingTime !== null && machine.reserve === true && machine.userId !== userEmail)
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
                    Alert.alert(`세탁기 ${machineNumber}번 예약하시겠습니까?\n 남은시간: ${washingMachines[machineNumber].remainingTime}`, '', [
                        {
                            text: '예',
                            onPress: () => reserveMachine(machineNumber, userEmail),
                        },
                        {
                            text: '아니오',
                            onPress: () => console.log('취소'),
                            style: 'cancel',
                        },
                    ]);
                }
            } else {
                Alert.alert('예약 가능한 세탁기가 없습니다.');
            }
        }
    };

    return (
        <View>
            {isLoading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : (
                <View>
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
                                onPress={() => useMachine(machineNumber, userEmail, parseInt(remainingTimeInput, 10))}
                            >
                                <Text>사용 시작</Text>
                            </TouchableOpacity>
                        </View>
                    ) : (
                        <View>
                            <View style={WashingMchartStyle.iconContainer}>
                                {/*세탁기1*/}
                                <TouchableOpacity
                                    style={[
                                        WashingMchartStyle.leftButton,
                                        {
                                            borderColor:
                                                washingMachines['1'].reserveId === userEmail && washingMachines['1'].available
                                                    ? 'orange'
                                                    : washingMachines['1'].userId === userEmail
                                                        ? 'lightblue'
                                                        : washingMachines['1'].reserveId !== userEmail && washingMachines['1'].reserveId !== '' && washingMachines['1'].available
                                                            ? 'red'
                                                            : washingMachines['1'].reserveId === userEmail
                                                                ? 'green'
                                                                : washingMachines['1'].available
                                                                    ? 'blue'
                                                                    : washingMachines['1'].reserve
                                                                        ? 'yellow'
                                                                        : 'red',
                                        },
                                    ]}
                                    onPress={() => handleMachineClick('1')}
                                >
                                    <Text>1번 세탁기</Text>
                                </TouchableOpacity>

                                {/*세탁기4*/}
                                <TouchableOpacity
                                    style={[
                                        WashingMchartStyle.rightButton,
                                        {
                                            borderColor:
                                                washingMachines['4'].reserveId === userEmail && washingMachines['4'].available
                                                    ? 'orange'
                                                    : washingMachines['4'].userId === userEmail
                                                        ? 'lightblue'
                                                        : washingMachines['4'].reserveId !== userEmail && washingMachines['4'].reserveId !== '' && washingMachines['4'].available
                                                            ? 'red'
                                                            : washingMachines['4'].reserveId === userEmail
                                                                ? 'green'
                                                                : washingMachines['4'].available
                                                                    ? 'blue'
                                                                    : washingMachines['4'].reserve
                                                                        ? 'yellow'
                                                                        : 'red',
                                        },
                                    ]}
                                    onPress={() => handleMachineClick('4')}
                                >
                                    <Text>4번 세탁기</Text>
                                </TouchableOpacity>
                            </View>

                            <View style={WashingMchartStyle.iconContainer}>
                                {/*세탁기2*/}
                                <TouchableOpacity
                                    style={[
                                        WashingMchartStyle.leftButton,
                                        {
                                            borderColor:
                                                washingMachines['2'].reserveId === userEmail && washingMachines['2'].available
                                                    ? 'orange'
                                                    : washingMachines['2'].userId === userEmail
                                                        ? 'lightblue'
                                                        : washingMachines['2'].reserveId !== userEmail && washingMachines['2'].reserveId !== '' && washingMachines['2'].available
                                                            ? 'red'
                                                            : washingMachines['2'].reserveId === userEmail
                                                                ? 'green'
                                                                : washingMachines['2'].available
                                                                    ? 'blue'
                                                                    : washingMachines['2'].reserve
                                                                        ? 'yellow'
                                                                        : 'red',
                                        },
                                    ]}
                                    onPress={() => handleMachineClick('2')}
                                >
                                    <Text>2번 세탁기</Text>
                                </TouchableOpacity>

                                {/*세탁기5*/}
                                <TouchableOpacity
                                    style={[
                                        WashingMchartStyle.rightButton,
                                        {
                                            borderColor:
                                                washingMachines['5'].reserveId === userEmail && washingMachines['5'].available
                                                    ? 'orange'
                                                    : washingMachines['5'].userId === userEmail
                                                        ? 'lightblue'
                                                        : washingMachines['5'].reserveId !== userEmail && washingMachines['5'].reserveId !== '' && washingMachines['5'].available
                                                            ? 'red'
                                                            : washingMachines['5'].reserveId === userEmail
                                                                ? 'green'
                                                                : washingMachines['5'].available
                                                                    ? 'blue'
                                                                    : washingMachines['5'].reserve
                                                                        ? 'yellow'
                                                                        : 'red',
                                        },
                                    ]}
                                    onPress={() => handleMachineClick('5')}
                                >
                                    <Text>5번 세탁기</Text>
                                </TouchableOpacity>
                            </View>

                            <View style={WashingMchartStyle.iconContainer}>
                                {/*세탁기3*/}
                                <TouchableOpacity
                                    style={[
                                        WashingMchartStyle.leftButton,
                                        {
                                            borderColor:
                                                washingMachines['3'].reserveId === userEmail && washingMachines['3'].available
                                                    ? 'orange'
                                                    : washingMachines['3'].userId === userEmail
                                                        ? 'lightblue'
                                                        : washingMachines['3'].reserveId !== userEmail && washingMachines['3'].reserveId !== '' && washingMachines['3'].available
                                                            ? 'red'
                                                            : washingMachines['3'].reserveId === userEmail
                                                                ? 'green'
                                                                : washingMachines['3'].available
                                                                    ? 'blue'
                                                                    : washingMachines['3'].reserve
                                                                        ? 'yellow'
                                                                        : 'red',
                                        },
                                    ]}
                                    onPress={() => handleMachineClick('3')}
                                >
                                    <Text>3번 세탁기</Text>
                                </TouchableOpacity>

                                {/*세탁기6*/}
                                <TouchableOpacity
                                    style={[
                                        WashingMchartStyle.rightButton,
                                        {
                                            borderColor:
                                                washingMachines['6'].reserveId === userEmail && washingMachines['6'].available
                                                    ? 'orange'
                                                    : washingMachines['6'].userId === userEmail
                                                        ? 'lightblue'
                                                        : washingMachines['6'].reserveId !== userEmail && washingMachines['6'].reserveId !== '' && washingMachines['6'].available
                                                            ? 'red'
                                                            : washingMachines['6'].reserveId === userEmail
                                                                ? 'green'
                                                                : washingMachines['6'].available
                                                                    ? 'blue'
                                                                    : washingMachines['6'].reserve
                                                                        ? 'yellow'
                                                                        : 'red',
                                        },
                                    ]}
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
                                    style={[
                                        WashingMchartStyle.rightButton,
                                        {
                                            borderColor:
                                                washingMachines['7'].reserveId === userEmail && washingMachines['7'].available
                                                    ? 'orange'
                                                    : washingMachines['7'].userId === userEmail
                                                        ? 'lightblue'
                                                        : washingMachines['7'].reserveId !== userEmail && washingMachines['7'].reserveId !== '' && washingMachines['7'].available
                                                            ? 'red'
                                                            : washingMachines['7'].reserveId === userEmail
                                                                ? 'green'
                                                                : washingMachines['7'].available
                                                                    ? 'blue'
                                                                    : washingMachines['7'].reserve
                                                                        ? 'yellow'
                                                                        : 'red',
                                        },
                                    ]}
                                    onPress={() => handleMachineClick('7')}
                                >
                                    <Text>7번 세탁기</Text>
                                </TouchableOpacity>
                            </View>

                            <View style={WashingMchartStyle.iconContainer}>
                                {/*세탁기8*/}
                                <TouchableOpacity
                                    style={[
                                        WashingMchartStyle.leftButton,
                                        {
                                            borderColor:
                                                washingMachines['8'].reserveId === userEmail && washingMachines['8'].available
                                                    ? 'orange'
                                                    : washingMachines['8'].userId === userEmail
                                                        ? 'lightblue'
                                                        : washingMachines['8'].reserveId !== userEmail && washingMachines['8'].reserveId !== '' && washingMachines['8'].available
                                                            ? 'red'
                                                            : washingMachines['8'].reserveId === userEmail
                                                                ? 'green'
                                                                : washingMachines['8'].available
                                                                    ? 'blue'
                                                                    : washingMachines['8'].reserve
                                                                        ? 'yellow'
                                                                        : 'red',
                                        },
                                    ]}
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
                                    style={WashingMchartStyle.leftButton1}
                                >
                                    {/* <Text>입구</Text> */}
                                    <Image style={WashingMchartStyle.icon}
                                        source={require("../../img/reserve_possible_color2.jpg")} />
                                </TouchableOpacity>

                                {/*건조기4*/}
                                <TouchableOpacity
                                    style={WashingMchartStyle.rightButton}
                                >
                                    <Text>4번 건조기</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )
                    }
                </View>
            )
            }
        </View >
    );
};

export default WashingMchartScreen;
