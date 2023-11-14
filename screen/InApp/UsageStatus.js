import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import UsageStatusStyle from '../../styles/Auth/UsageStatusStyle';
import { auth, database } from '../../javascripts/FirebaseConfigFile';

const UsageStatus = () => {
  const [machineNumber, setMachineNumber] = useState(null);
  const [completionTime, setCompletionTime] = useState(null);
  const [remainingTime, setRemainingTime] = useState(null);

  useEffect(() => {
    const fetchLaundryStatus = async () => {
      // 현재 로그인한 유저의 userId 가져오기
      const user = auth.currentUser;
      const userId = user ? user.email : null;

      if (userId) {
        // Firebase에서 해당 userId의 세탁기 정보 가져오기
        const snapshot = await database.ref('washingMachines').orderByChild('userId').equalTo(userId).once('value');

        if (snapshot.exists()) {
          // Iterate through the snapshot to find the correct machine
          snapshot.forEach((machineSnapshot) => {
            const machineData = machineSnapshot.val();
            const machineKey = machineSnapshot.key;

            // Check if the machine is in use by the current user
            if (machineData.userId === userId) {
              setMachineNumber(machineKey);

              // 현재 시간 가져오기
              const currentTime = new Date();

              // 세탁기 정보에서 remainingTime 가져오기
              const remainingTimeFromDB = machineData.remainingTime;

              // completionTime 계산
              const completionTimeDate = new Date(currentTime.getTime() + remainingTimeFromDB * 60 * 1000);

              setCompletionTime(
                `${completionTimeDate.getHours()}시 ${completionTimeDate.getMinutes()}분`
              );
              setRemainingTime(`${remainingTimeFromDB}분`);

              return;
            }
          });
        } else {
          // 사용중인 세탁기가 없는 경우 초기값 설정
          setMachineNumber(null);
          setCompletionTime(null);
          setRemainingTime(null);
        }
      }
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

export default UsageStatus;
