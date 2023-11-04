import React, { useState, useEffect } from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  Alert,
  TextInput,
  Image,
  ActivityIndicator,
} from 'react-native';
import { auth, database } from '../../javascripts/FirebaseConfigFile';
import InputTimeStyle from '../../styles/Auth/InputTimeStyle';
//스타일 import
import DryingMchartStyle from '../../styles/Auth/DryingMchartStyle';

const DryingMchartScreen = ({ navigation }) => {
  const [DryingMachines, setDryingMachines] = useState({});
  const [machineNumber, setMachineNumber] = useState(null);
  const [remainingTimeInput, setRemainingTimeInput] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  // Firebase Realtime Database 연결 설정
  useEffect(() => {
    const databaseRef = database.ref('DryingMachines');

    // 데이터베이스에서 초기 데이터를 가져옵니다.
    databaseRef.on('value', (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setDryingMachines(data);
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
    if (!DryingMachines[machineNumber]) {
      // 건조기가 없는 경우
      Alert.alert(`건조기 ${machineNumber}는 존재하지 않습니다.`);
    } else if (
      (DryingMachines[machineNumber].available &&
        DryingMachines[machineNumber].reserve) ||
      (DryingMachines[machineNumber].available &&
        DryingMachines[machineNumber].reserveId === userEmail)
    ) {
      // 건조기 사용 가능한 경우 남은 시간 입력 폼을 표시
      setMachineNumber(machineNumber);
      setRemainingTimeInput(''); // remainingTimeInput 초기화
    } else if (DryingMachines[machineNumber].userId === userEmail) {
      // 사용자가 이미 사용중인 경우 사용 취소 여부를 묻는 알림 표시
      Alert.alert(
        `건조기 ${machineNumber}번`,
        `사용 중입니다. 사용을 취소하시겠습니까? \n남은 시간: ${DryingMachines[machineNumber].remainingTime}분`,
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
      DryingMachines[machineNumber].reserve === false &&
      DryingMachines[machineNumber].reserveId !== userEmail
    ) {
      // 이미 다른 사람이 예약중인 경우 알림 표시
      Alert.alert(
        `이미 다른 사용자가 예약중입니다. \n남은 시간: ${dryingMachines[machineNumber].remainingTime} 분`
      );
    } else if (
      DryingMachines[machineNumber].reserveId === userEmail &&
      DryingMachines[machineNumber].available === false
    ) {
      // 사용자가 이미 예약중인 경우 예약 취소 여부를 묻는 알림 표시
      Alert.alert(
        `건조기 ${machineNumber}번`,
        `예약 중입니다. 취소하시겠습니까? \n남은 시간: ${DryingMachines[machineNumber].remainingTime}분`,
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
        `${machineNumber}번 건조기`,
        `예약하시겠습니까? \n남은 시간: ${DryingMachines[machineNumber].remainingTime}분`,
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

    database.ref(`DryingMachines/${machineNumber}`).transaction(
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
          const message = `${machineNumber}번 건조기 사용 시작. 남은 시간: ${initialRemainingTime}분.`;
          Alert.alert(message);
          const timer = setInterval(() => {
            database
              .ref(`DryingMachines/${machineNumber}`)
              .transaction((machine) => {
                if (machine && machine.remainingTime > 0) {
                  if (
                    machine.remainingTime <= 5 &&
                    machine.userId === userEmail
                  ) {
                    Alert.alert(
                      `${machineNumber}번 건조기 남은 시간: ${machine.remainingTime}분. (5분 이하)`
                    );
                  }
                  machine.remainingTime--;
                } else if (machine && machine.remainingTime === 0) {
                  if (
                    machine.userId === userEmail ||
                    machine.reserveId === userEmail
                  ) {
                    Alert.alert(
                      `${machineNumber}번 건조기 사용이 완료되었습니다.`
                    );
                  }
                  machine.available = true;
                  machine.remainingTime = 0;
                  machine.useTime = 0;
                  machine.userId = '';
                  machine.reservationTime = null;
                  clearInterval(timer);
                }
                return machine;
              });
          }, 10000);
        } else {
          Alert.alert('사용 시작에 실패하였습니다.');
        }
      }
    );
  };

  const reserveMachine = (machineNumber, userEmail) => {
    database.ref(`DryingMachines/${machineNumber}`).transaction(
      (machine) => {
        if (machine) {
          if (machine.reserve) {
            machine.reserve = false;
            machine.reservationTime = new Date().getTime();
            machine.reserveId = userEmail;
            machine.remainingTime = DryingMachines[machineNumber].remainingTime;
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
            `${machineNumber}번 건조기 예약이 완료되었습니다. \n남은 시간: ${machine.remainingTime}분.`
          );
          const timer = setInterval(() => {
            database
              .ref(`DryingMachines/${machineNumber}`)
              .transaction((machine) => {
                if (machine && machine.remainingTime > 0) {
                  machine.remainingTime--;
                  if (
                    machine.remainingTime <= 5 &&
                    machine.reserveId === reserveId
                  ) {
                    Alert.alert(
                      `${machineNumber}번 건조기 남은 시간: ${machine.remainingTime}분. (5분 이하)`
                    );
                  }
                } else if (machine && machine.remainingTime === 0) {
                  machine.available = true;
                  machine.remainingTime = 0;
                  machine.useTime = 0;
                  machine.userId = '';
                  clearInterval(timer);
                  Alert.alert(
                    `${machineNumber}번 건조기 사용이 완료되었습니다.`
                  );
                }
                return machine;
              });
          }, 10000);
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
    database.ref(`DryingMachines/${machineNumber}`).transaction(
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
          Alert.alert(`${machineNumber}번 건조기 사용이 취소되었습니다.`);
        } else {
          Alert.alert('사용 취소에 실패하였습니다.');
        }
      }
    );
  };

  const cancelReservation = (machineNumber) => {
    database.ref(`DryingMachines/${machineNumber}`).transaction(
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
          Alert.alert(`${machineNumber}번 건조기 예약이 취소되었습니다.`);
        } else {
          Alert.alert('예약 취소에 실패하였습니다.');
        }
      }
    );
  };

  const autoReserveMachine = () => {
    const availableMachines = Object.entries(DryingMachines)
      .filter(
        ([_, machine]) =>
          machine.available &&
          machine.remainingTime !== null &&
          machine.reserve === true
      )
      .sort(([, a], [, b]) => a.remainingTime - b.remainingTime);
    if (availableMachines.length > 0) {
      // 사용 가능한 건조기 있을 때
      const [machineNumber] = availableMachines[0];
      Alert.alert(`사용 가능한 건조기: ${machineNumber}번`);
    } else {
      // 사용 가능한 건조기 없을 때
      const shortestTimeMachine = Object.entries(DryingMachines)
        .filter(
          ([_, machine]) =>
            machine.remainingTime !== null &&
            machine.reserve === true &&
            machine.userId !== userEmail
        )
        .sort(([, a], [, b]) => a.remainingTime - b.remainingTime);
      if (shortestTimeMachine.length > 0) {
        const [machineNumber] = shortestTimeMachine[0];
        const reservationTime = DryingMachines[machineNumber].reservationTime;
        const useTime = DryingMachines[machineNumber].useTime;
        const currentTime = new Date().getTime();
        if (reservationTime && currentTime - reservationTime >= 5 * 60 * 1000) {
          // 예약한 사용자가 5분 이내에 사용하지 않은 경우
          database.ref(`DryingMachines/${machineNumber}`).transaction(
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
                Alert.alert(`${machineNumber}번 건조기 초기화되었습니다.`);
              } else {
                Alert.alert('예약에 실패하였습니다.');
              }
            }
          );
        } else {
          Alert.alert(
            `건조기 ${machineNumber}번 예약하시겠습니까?\n 남은시간: ${washingMachines[machineNumber].remainingTime}`,
            '',
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
      } else {
        Alert.alert('예약 가능한 건조기가 없습니다.');
      }
    }
  };

  const handleBorderColor = (machine, userEmail) => {
    const { reserveId, userId, available, reserve } = DryingMachines[machine];
    if (reserveId === userEmail && available) {
      return 'orange';
    } else if (userId === userEmail) {
      return 'lightblue';
    } else if (reserveId !== userEmail && reserveId !== '' && available) {
      return 'red';
    } else if (reserveId === userEmail) {
      return 'green';
    } else if (available) {
      return 'blue';
    } else if (reserve) {
      return 'yellow';
    } else {
      return 'red';
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
                placeholder="건조 시간 (분단위로 입력)"
                onChangeText={(text) => setRemainingTimeInput(text)}
                keyboardType="numeric"
              />
              <TouchableOpacity
                style={InputTimeStyle.button}
                onPress={() =>
                  useMachine(
                    machineNumber,
                    userEmail,
                    parseInt(remainingTimeInput, 10)
                  )
                }
              >
                <Text>사용 시작</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View>
              <View style={DryingMchartStyle.iconContainer}>
                {/*세탁기1*/}
                <TouchableOpacity style={DryingMchartStyle.leftButton}>
                  <Text>1번 세탁기</Text>
                </TouchableOpacity>

                {/*세탁기4*/}
                <TouchableOpacity style={DryingMchartStyle.rightButton}>
                  <Text>4번 세탁기</Text>
                </TouchableOpacity>
              </View>

              <View style={DryingMchartStyle.iconContainer}>
                {/*세탁기2*/}
                <TouchableOpacity style={DryingMchartStyle.leftButton}>
                  <Text>2번 세탁기</Text>
                </TouchableOpacity>

                {/*세탁기5*/}
                <TouchableOpacity style={DryingMchartStyle.rightButton}>
                  <Text>5번 세탁기</Text>
                </TouchableOpacity>
              </View>

              <View style={DryingMchartStyle.iconContainer}>
                {/*세탁기3*/}
                <TouchableOpacity style={DryingMchartStyle.leftButton}>
                  <Text>3번 세탁기</Text>
                </TouchableOpacity>

                {/*세탁기6*/}
                <TouchableOpacity style={DryingMchartStyle.rightButton}>
                  <Text>6번 세탁기</Text>
                </TouchableOpacity>
              </View>

              <View style={DryingMchartStyle.iconContainer}>
                {/*건조기1*/}
                <TouchableOpacity
                  style={[
                    DryingMchartStyle.leftButton,
                    { borderColor: handleBorderColor('1', userEmail) },
                  ]}
                  onPress={() => handleMachineClick('1')}
                >
                  <Text>1번 건조기</Text>
                </TouchableOpacity>

                {/*세탁기7*/}
                <TouchableOpacity style={DryingMchartStyle.rightButton}>
                  <Text>7번 세탁기</Text>
                </TouchableOpacity>
              </View>

              <View style={DryingMchartStyle.iconContainer}>
                {/*세탁기8*/}
                <TouchableOpacity style={DryingMchartStyle.leftButton}>
                  <Text>8번 세탁기</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    DryingMchartStyle.rightButton,
                    { borderColor: handleBorderColor('2', userEmail) },
                  ]}
                  onPress={() => handleMachineClick('2')}
                >
                  <Text>2번 건조기</Text>
                </TouchableOpacity>
              </View>

              <View style={DryingMchartStyle.iconContainer}>
                {/*입구*/}
                <TouchableOpacity
                  style={DryingMchartStyle.leftButton}
                  onPress={() => autoReserveMachine()}
                >
                  <Text>자동 추천</Text>
                </TouchableOpacity>

                {/*건조기3*/}
                <TouchableOpacity
                  style={[
                    DryingMchartStyle.rightButton,
                    { borderColor: handleBorderColor('3', userEmail) },
                  ]}
                  onPress={() => handleMachineClick('3')}
                >
                  <Text>3번 건조기</Text>
                </TouchableOpacity>
              </View>

              <View style={DryingMchartStyle.iconContainer}>
                {/*입구*/}
                <TouchableOpacity style={DryingMchartStyle.leftButton1}>
                  {/* <Text>입구</Text> */}
                  <Image
                    style={DryingMchartStyle.icon}
                    //source={require('../../img/reserve_possible_color2.jpg')}
                  />
                </TouchableOpacity>

                {/*건조기4*/}
                <TouchableOpacity
                  style={[
                    DryingMchartStyle.rightButton,
                    { borderColor: handleBorderColor('4', userEmail) },
                  ]}
                  onPress={() => handleMachineClick('4')}
                >
                  <Text>4번 건조기</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>
      )}
    </View>
  );
};

export default DryingMchartScreen;
