import React, { useState } from 'react';
import { View, Text, Button, Alert, TouchableOpacity } from 'react-native';

//스타일 import
import ReservationMachineStyle from '../../styles/Auth/ReservationMachineStyle';

const ReservationMachineScreen = () => {
  const [washingMachineStatus, setWashingMachineStatus] = useState({
    completionTime: 0,
    remainingTime: 0,
    machineNumber: 1
  });

  const handleReserve = () => {
    Alert.alert(
      "예약하시겠습니까?",
      "",
      [
        { text: "취소", style: "cancel" },
        { text: "확인", onPress: () => handleConfirmation() }
      ],
      { cancelable: false }
    );
  };

  const handleConfirmation = () => {
    // 예약 처리 로직 
    // 세탁기 상태 바꾸기(예약가능 -> 예약불가)
    // 사용자의 예약현황에 정보 추가
    // 알림창 띠우기(ex.0번 세탁기가 예약되었습니다. 0시0분에 사용하세요.)

  };

  return (
    <View style={ReservationMachineStyle.container}>
      <View style={ReservationMachineStyle.subContainer}>
        <View style={ReservationMachineStyle.section}>
          <Text style={ReservationMachineStyle.sectionTitle}>세탁완료시간: </Text>
          <Text style={ReservationMachineStyle.infoText}>{washingMachineStatus.completionTime} 분</Text>
        </View>
        <View style={ReservationMachineStyle.section}>
          <Text style={ReservationMachineStyle.sectionTitle}>세탁남은시간: </Text>
          <Text style={ReservationMachineStyle.infoText}>{washingMachineStatus.remainingTime} 분</Text>
        </View>
      </View>
      <View style={ReservationMachineStyle.ButtonContainer}>
        <TouchableOpacity style={ReservationMachineStyle.Button} onPress={handleReserve} >
          <Text style={ReservationMachineStyle.ButtonText}>{washingMachineStatus.machineNumber + '번 세탁기 예약하기'}</Text>
        </TouchableOpacity>
      </View>
    </View >
  );
};

export default ReservationMachineScreen;