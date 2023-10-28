//InputTime.js
import React, { useState } from 'react';
import { database } from '../../javascripts/FirebaseConfigFile';
import { View, TextInput, Alert, TouchableOpacity, Text } from 'react-native';
import InputTimeStyle from '../../styles/Auth/InputTimeStyle';

const InputTimeScreen = ({ route }) => {
  const { machineNumber: machineNumberFromParams, userEmail } = route.params;
  const [remainingTimeInput, setRemainingTimeInput] = useState('');

  const reserveMachine = () => {
    const initialRemainingTime = parseInt(remainingTimeInput, 10) || 30;
  
    if (isNaN(initialRemainingTime)) {
      Alert.alert('올바른 시간을 입력하세요.');
      return;
    }
  
    database.ref(`washingMachines/${machineNumberFromParams}`).update({
      available: true,
      userId: userEmail,
      useTime: initialRemainingTime,
      remainingTime: initialRemainingTime,
    });
  
    if (initialRemainingTime <= 5) {
      Alert.alert(
        `세탁기 ${machineNumberFromParams} 예약이 완료되었습니다. 남은 시간: ${initialRemainingTime}분. (5분 이하)`
      );
    }
  
    const timer = setInterval(() => {
      const machineRef = database.ref(`washingMachines/${machineNumberFromParams}`);
  
      machineRef.once('value').then((snapshot) => {
        const machine = snapshot.val();
  
        if (machine && machine.remainingTime > 0) {
          const updatedRemainingTime = machine.remainingTime - 1;
  
          machineRef.update({
            remainingTime: updatedRemainingTime,
          });
  
          if (updatedRemainingTime <= 5) {
            Alert.alert(
              `세탁기 ${machineNumberFromParams}의 완료까지 ${updatedRemainingTime}분 남았습니다.`
            );
          }
        } else if (machine && machine.remainingTime === 0) {
          machineRef.update({
            available: true,
            remainingTime: 0,
            useTime: 0,
            userId: '',
          });
  
          clearInterval(timer);
        }
      });
    }, 10000); // 1분마다 감소 (60,000 밀리초)
  
    setRemainingTimeInput('');
  };
  return (
    <View style={InputTimeStyle.container}>
      <View style={InputTimeStyle.InputContainer}>
        <TextInput
          style={InputTimeStyle.input}
          placeholder="세탁시간 (분단위로 입력)"
          onChangeText={(text) => setRemainingTimeInput(text)}
        />
        <TouchableOpacity
          style={InputTimeStyle.button}
          onPress={reserveMachine}
        >
          <Text>사용시작</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default InputTimeScreen;


