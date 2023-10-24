import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
//스타일 import
import UsageStatusStyle from '../../styles/Auth/UsageStatusStyle';

const UsageStatus = () => {
  // 사용중인 세탁기 번호와 세탁완료시간, 세탁 남은 시간을 설정
  const [machineNumber, setMachineNumber] = useState(null);
  const [completionTime, setCompletionTime] = useState(null);
  const [remainingTime, setRemainingTime] = useState(null);

  useEffect(() => {
    // 가상의 데이터를 가져오는 함수
    const fetchLaundryStatus = () => {
      // 만약 사용중인 세탁기가 있다면,
      // machineNumber, completionTime, remainingTime 상태를 업데이트
      const data = {
        machineNumber: 1,
        completionTime: '14:30',
        remainingTime: '01:15',
      };

      setMachineNumber(data.machineNumber);
      setCompletionTime(data.completionTime);
      setRemainingTime(data.remainingTime);
    };

    fetchLaundryStatus(); // 가상의 데이터 가져오기
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
          <Text style={UsageStatusStyle.infoText}>{completionTime + '분'}</Text>
        </View>

        <View style={UsageStatusStyle.section}>
          <Text style={UsageStatusStyle.sectionTitle}>세탁남은시간 : </Text>
          <Text style={UsageStatusStyle.infoText}>{remainingTime + '분'}</Text>
        </View>
      </View>
    </View>
  );
};

export default UsageStatus;