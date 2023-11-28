import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import UsageStatusStyle from '../../styles/Auth/UsageStatusStyle';
import ReservationStatusStyle from '../../styles/Auth/ReservationStatusStyle';
import { auth, database } from '../../javascripts/FirebaseConfigFile';

const fetchStatus = async (type, userIdSetter, completionTimeSetter) => {
    const user = auth.currentUser;
    const userId = user ? user.email : null;

    if (userId) {
        const field = type === 'usage' ? 'userId' : 'reserveId';
        const snapshot = await database
            .ref('washingMachines')
            .orderByChild(field)
            .equalTo(userId)
            .once('value');

        if (snapshot.exists()) {
            snapshot.forEach((machineSnapshot) => {
                const machineData = machineSnapshot.val();
                const machineKey = machineSnapshot.key;

                if (machineData[field] === userId) {
                    userIdSetter(machineKey);

                    const currentTime = new Date();
                    const remainingTimeFromDB = machineData.remainingTime;
                    const completionTimeDate = new Date(
                        currentTime.getTime() + remainingTimeFromDB * 60 * 1000
                    );

                    completionTimeSetter(
                        `${completionTimeDate.getHours()}시 ${completionTimeDate.getMinutes()}분`
                    );

                    return;
                }
            });
        } else {
            userIdSetter(null);
            completionTimeSetter(null);
        }
    }
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

const StatusW = () => {
    const UsageStatus = () => {
        const [machineNumber, setMachineNumber] = useState(null);
        const [completionTime, setCompletionTime] = useState(null);
        const [remainingTime, setRemainingTime] = useState(null);

        useEffect(() => {
            const fetchLaundryStatus = async () => {
                await fetchStatus('usage', setMachineNumber, setCompletionTime);

                const refreshInterval = setInterval(async () => {
                    await fetchStatus('usage', setMachineNumber, setCompletionTime);
                }, 10 * 1000);

                return () => clearInterval(refreshInterval);
            };

            fetchLaundryStatus();
        }, []);

        return (
            <View style={UsageStatusStyle.container}>
                <View style={UsageStatusStyle.subContainer}>
                    <View style={UsageStatusStyle.section}>
                        <Text style={UsageStatusStyle.statusText}>
                            {machineNumber
                                ? `${machineNumber}번 세탁기 사용중`
                                : '사용중인 세탁기 없음'}
                        </Text>
                    </View>

                    <View style={UsageStatusStyle.section}>
                        <Text style={UsageStatusStyle.sectionTitle}>세탁완료시간 : </Text>
                        <Text style={UsageStatusStyle.infoText}>{completionTime}</Text>
                    </View>

                    <View style={UsageStatusStyle.section}>
                        <Text style={UsageStatusStyle.sectionTitle}>세탁남은시간 : </Text>
                        <Text style={UsageStatusStyle.infoText}>{remainingTime}</Text>
                    </View>
                </View>
            </View>
        );
    };

    const ReservationStatus = () => {
        const [machineNumber, setMachineNumber] = useState(null);
        const [completionTime, setCompletionTime] = useState(null);

        useEffect(() => {
            const fetchReserveStatus = async () => {
                await fetchStatus('reserve', setMachineNumber, setCompletionTime);

                const refreshInterval = setInterval(async () => {
                    await fetchStatus('reserve', setMachineNumber, setCompletionTime);
                }, 10 * 1000);

                return () => clearInterval(refreshInterval);
            };

            fetchReserveStatus();
        }, []);

        return (
            <View style={ReservationStatusStyle.container}>
                <View style={ReservationStatusStyle.subContainer}>
                    <View style={ReservationStatusStyle.section}>
                        <Text style={ReservationStatusStyle.statusText}>
                            {machineNumber
                                ? `${machineNumber}번 세탁기 예약중`
                                : '예약중인 세탁기 없음'}
                        </Text>
                    </View>

                    <View style={ReservationStatusStyle.section}>
                        <Text style={ReservationStatusStyle.sectionTitle}>
                            예약된 시간 :{' '}
                        </Text>
                        <Text style={ReservationStatusStyle.infoText}>{completionTime}</Text>
                    </View>

                    <TouchableOpacity
                        style={ReservationStatusStyle.cancelButton}
                        onPress={Alert.alert(
                            `세탁기 ${machineNumber}번`,
                            `예약 중입니다. 예약을 취소하시겠습니까?`,
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
                        )
                        }>
                        <Text style={ReservationStatusStyle.buttonText}>예약 취소</Text>
                    </TouchableOpacity>
                </View>
            </View >
        );
    };

    return (
        <View style = {UsageStatusStyle.container1}>
            <View style = {UsageStatusStyle.container2}>
                <UsageStatus />
            </View>
            <View style = {UsageStatusStyle.container2}>
                <ReservationStatus />
            </View>
        </View>
    );
};

export default StatusW;
