import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import ReservationStatusStyle from '../../styles/Auth/ReservationStatusStyle';
import { auth, database } from '../../javascripts/FirebaseConfigFile';

const ReservationStatus = () => {
    const [machineNumber, setMachineNumber] = useState(null);
    const [completionTime, setCompletionTime] = useState(null);

    useEffect(() => {
        const fetchReserveStatus = async () => {
            // 현재 로그인한 유저의 userId 가져오기
            const user = auth.currentUser;
            const userId = user ? user.email : null;

            if (userId) {
                // Firebase에서 해당 userId의 세탁기 정보 가져오기
                const snapshot = await database
                    .ref('washingMachines')
                    .orderByChild('reserveId')
                    .equalTo(userId)
                    .once('value');

                if (snapshot.exists()) {
                    // Iterate through the snapshot to find the correct machine
                    snapshot.forEach((machineSnapshot) => {
                        const machineData = machineSnapshot.val();
                        const machineKey = machineSnapshot.key;

                        // Check if the machine is in use by the current user
                        if (machineData.reserveId === userId) {
                            setMachineNumber(machineKey);

                            // 현재 시간 가져오기
                            const currentTime = new Date();

                            // 세탁기 정보에서 remainingTime 가져오기
                            const remainingTimeFromDB = machineData.remainingTime;

                            // completionTime 계산
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
                    // 사용중인 세탁기가 없는 경우 초기값 설정
                    setMachineNumber(null);
                    setCompletionTime(null);
                }
            }
        };

        // 초기 호출
        fetchReserveStatus();

        // 10초마다 업데이트
        const refreshInterval = setInterval(() => {
            fetchReserveStatus();
        }, 10 * 1000);

        // 언마운트 시 clearInterval로 인터벌 정리
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

export default ReservationStatus;
