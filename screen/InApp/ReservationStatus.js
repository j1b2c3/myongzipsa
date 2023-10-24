import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

//스타일 import
import ReservationStatusStyle from '../../styles/Auth/ReservationStatusStyle';

const ReservationStatus = () => {
    // 가상의 상태를 만들어 예약 중인 세탁기 번호와 예약된 시간을 설정합니다.
    const [machineNumber, setMachineNumber] = useState(null);
    const [reservationTime, setReservationTime] = useState(null);

    // 가상의 데이터를 가져오는 함수
    const fetchReservationStatus = () => {
        // 예약 중인 데이터가 있다면,
        // machineNumber, reservationTime 상태를 업데이트
        const data = {
            machineNumber: 2,
            reservationTime: '15:00',
        };

        setMachineNumber(data.machineNumber);
        setReservationTime(data.reservationTime);
    };

    useEffect(() => {
        fetchReservationStatus(); // 가상의 데이터 가져오기
    }, []);

    const handleCancelReservation = () => {
        // 예약 취소 로직
        setMachineNumber(null);
        setReservationTime(null);
    };

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
                    <Text style={ReservationStatusStyle.sectionTitle}>예약된 시간 : </Text>
                    <Text style={ReservationStatusStyle.infoText}>{reservationTime + '분' || ' '}</Text>
                   <TouchableOpacity style={ReservationStatusStyle.cancelButton}
                        onPress={handleCancelReservation}>
                        <Text>예약 취소하기</Text>
                    </TouchableOpacity>
                </View>

            </View>
        </View>
    );
};

export default ReservationStatus;