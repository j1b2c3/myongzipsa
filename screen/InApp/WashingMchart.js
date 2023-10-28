//WashingMchart.js
import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, Alert, TextInput } from 'react-native';
import { auth, database } from '../../javascripts/FirebaseConfigFile';
import WashingMchartStyle from '../../styles/Auth/WashingMchartStyle';

const WashingMchartScreen = ({ navigation }) => {
  const [washingMachines, setWashingMachines] = useState({});
  const [userEmail, setUserEmail] = useState('');

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


  const autoReserveMachine = () => {
    const availableMachines = Object.entries(washingMachines)
      .filter(
        ([_, machine]) => machine.available && machine.remainingTime !== null
      )
      .sort(([, a], [, b]) => a.remainingTime - b.remainingTime);
    if (availableMachines.length > 0) {
      // 사용 가능한 세탁기가 있을 때
      const [machineNumber] = availableMachines[0];
      Alert.alert(`사용 가능한 세탁기: ${machineNumber}`);
    } else {
      // 사용 가능한 세탁기가 없을 때
      const shortestTimeMachine = Object.entries(washingMachines)
        .filter(([_, machine]) => machine.remainingTime !== null)
        .sort(([, a], [, b]) => a.remainingTime - b.remainingTime);
      if (shortestTimeMachine.length > 0) {
        const [machineNumber] = shortestTimeMachine[0];
        reserveMachine(machineNumber, userEmail);
      } else {
        Alert.alert('예약 가능한 세탁기가 없습니다.');
      }
    }
  };

  return (
    <View>
      <View>
        <View style={WashingMchartStyle.iconContainer}>
          {/*세탁기1*/}
          <TouchableOpacity
            style={WashingMchartStyle.leftButton}
            onPress={() => {
              navigation.navigate('세탁시간입력', {
                machineNumber: '1',
                userEmail: userEmail,
              });
            }}
          >
            <Text>1번 세탁기</Text>
          </TouchableOpacity>

          {/*세탁기4*/}
          <TouchableOpacity
            style={WashingMchartStyle.rightButton}
            //'예약가능'이라고 가정하고 예약페이지로 이동코드 임시로 추가
            onPress={() => {
              navigation.navigate('세탁시간입력', {
                machineNumber: '4',
                userEmail: userEmail,
              });
            }}
          >
            <Text>4번 세탁기</Text>
          </TouchableOpacity>
        </View>

        <View style={WashingMchartStyle.iconContainer}>
          {/*세탁기2*/}
          <TouchableOpacity
            style={WashingMchartStyle.leftButton}
            onPress={() => {
              navigation.navigate('세탁시간입력', {
                machineNumber: '2',
                userEmail: userEmail,
              });
            }}
          >
            <Text>2번 세탁기</Text>
          </TouchableOpacity>

          {/*세탁기5*/}
          <TouchableOpacity
            style={WashingMchartStyle.rightButton}
            onPress={() => {
              navigation.navigate('세탁시간입력', {
                machineNumber: '5',
                userEmail: userEmail,
              });
            }}
          >
            <Text>5번 세탁기</Text>
          </TouchableOpacity>
        </View>

        <View style={WashingMchartStyle.iconContainer}>
          {/*세탁기3*/}
          <TouchableOpacity
            style={WashingMchartStyle.leftButton}
            onPress={() => {
              navigation.navigate('세탁시간입력', {
                machineNumber: '3',
                userEmail: userEmail,
              });
            }}
          >
            <Text>3번 세탁기</Text>
          </TouchableOpacity>

          {/*세탁기6*/}
          <TouchableOpacity
            style={WashingMchartStyle.rightButton}
            onPress={() => {
              navigation.navigate('세탁시간입력', {
                machineNumber: '6',
                userEmail: userEmail,
              });
            }}
          >
            <Text>6번 세탁기</Text>
          </TouchableOpacity>
        </View>

        <View style={WashingMchartStyle.iconContainer}>
          {/*건조기1*/}
          <TouchableOpacity
            style={WashingMchartStyle.leftButton}
            //onPress={() => navigation.navigate("건조시간입력")}
          >
            <Text>1번 건조기</Text>
          </TouchableOpacity>

          {/*세탁기7*/}
          <TouchableOpacity
            style={WashingMchartStyle.rightButton}
            onPress={() => {
              navigation.navigate('세탁시간입력', {
                machineNumber: '7',
                userEmail: userEmail,
              });
            }}
          >
            <Text>7번 세탁기</Text>
          </TouchableOpacity>
        </View>

        <View style={WashingMchartStyle.iconContainer}>
          {/*세탁기8*/}
          <TouchableOpacity
            style={WashingMchartStyle.leftButton}
            onPress={() => {
              navigation.navigate('세탁시간입력', {
                machineNumber: '8',
                userEmail: userEmail,
              });
            }}
          >
            <Text>8번 세탁기</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={WashingMchartStyle.rightButton}
            //onPress={() => navigation.navigate("건조시간입력")}
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
            //onPress={() => navigation.navigate("건조시간입력")}
          >
            <Text>3번 건조기</Text>
          </TouchableOpacity>
        </View>

        <View style={WashingMchartStyle.iconContainer}>
          {/*입구*/}
          <TouchableOpacity
            style={WashingMchartStyle.leftButton}
            onPress={() => navigation.navigate('입구')}
          >
            <Text>입구</Text>
          </TouchableOpacity>

          {/*건조기4*/}
          <TouchableOpacity
            style={WashingMchartStyle.rightButton}
            //onPress={() => navigation.navigate("건조시간입력")}
          >
            <Text>4번 건조기</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default WashingMchartScreen;
