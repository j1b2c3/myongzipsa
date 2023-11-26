import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import UsageStatusStyle from '../../styles/Auth/UsageStatusStyle';
import ReservationStatusStyle from '../../styles/Auth/ReservationStatusStyle';
import { auth, database } from '../../javascripts/FirebaseConfigFile';

const UsageStatus = () => {
    const [machineNumber, setMachineNumber] = useState(null);
    const [completionTime, setCompletionTime] = useState(null);
    const [remainingTime, setRemainingTime] = useState(null);

    useEffect(() => {
        const fetchLaundryStatus = async () => {
            const user = auth.currentUser;
            const userId = user ? user.email : null;

            if (userId) {
                const snapshot = await database
                    .ref('washingMachines')
                    .orderByChild('userId')
                    .equalTo(userId)
                    .once('value');

                if (snapshot.exists()) {
                    snapshot.forEach((machineSnapshot) => {
                        const machineData = machineSnapshot.val();
                        const machineKey = machineSnapshot.key;

                        if (machineData.userId === userId) {
                            setMachineNumber(machineKey);

                            const currentTime = new Date();
                            const remainingTimeFromDB = machineData.remainingTime;
                            const completionTimeDate = new Date(
                                currentTime.getTime() + remainingTimeFromDB * 60 * 1000
                            );

                            setCompletionTime(
                                `${completionTimeDate.getHours()}시 ${completionTimeDate.getMinutes()}분`
                            );
                            setRemainingTime(`${remainingTimeFromDB}분`);

                            return;
                        }
                    });
                } else {
                    setMachineNumber(null);
                    setCompletionTime(null);
                    setRemainingTime(null);
                }
            }

            const refreshInterval = 10 * 1000;
            const refreshTimeout = setTimeout(() => {
                fetchLaundryStatus();
            }, refreshInterval);

            return () => clearTimeout(refreshTimeout);
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
            const user = auth.currentUser;
            const userId = user ? user.email : null;

            if (userId) {
                const snapshot = await database
                    .ref('washingMachines')
                    .orderByChild('reserveId')
                    .equalTo(userId)
                    .once('value');

                if (snapshot.exists()) {
                    snapshot.forEach((machineSnapshot) => {
                        const machineData = machineSnapshot.val();
                        const machineKey = machineSnapshot.key;

                        if (machineData.reserveId === userId) {
                            setMachineNumber(machineKey);

                            const currentTime = new Date();
                            const remainingTimeFromDB = machineData.remainingTime;
                            const completionTimeDate = new Date(
                                currentTime.getTime() + remainingTimeFromDB * 60 * 1000
                            );

                            setCompletionTime(
                                `${completionTimeDate.getHours()}시 ${completionTimeDate.getMinutes()}분`
                            );

                            return;
                        }
                    });
                } else {
                    setMachineNumber(null);
                    setCompletionTime(null);
                }
            }
        };

        fetchReserveStatus();

        const refreshInterval = setInterval(() => {
            fetchReserveStatus();
        }, 10 * 1000);

        return () => clearInterval(refreshInterval);
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
                // onPress={예약취소}
                >
                    <Text style={ReservationStatusStyle.buttonText}>예약 취소</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export { UsageStatus, ReservationStatus };
