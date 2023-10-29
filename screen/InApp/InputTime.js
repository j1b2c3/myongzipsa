import React, { useState } from 'react';
import { View, TextInput, Button, TouchableOpacity, Text } from 'react-native';

//스타일 import
import InputTimeStyle from "../../styles/Auth/InputTimeStyle";

const InputTimeScreen = () => {
  const [washingTime, setWashingTime] = useState('');

  const handleStartButtonClick = () => {
    //사용처리 로직
    //세탁기 상태 바뀌게 하는 로직(사용가능->예약가능)
    //사용자의 사용현황에 정보 추가
    //세탁 완료시간을 계산하여 알림창으로 띠움.(ex.0시0분에 세탁물을 찾아가세요.)

  };

  return (
    <View style={InputTimeStyle.container}>
      <View style={InputTimeStyle.InputContainer}>
        <TextInput
          style={InputTimeStyle.input}
          placeholder="세탁시간 (분단위로 입력)"
          value={washingTime}
          onChangeText={(text) => setWashingTime(text)}
        />
        <TouchableOpacity
          style={InputTimeStyle.button}
          onPress={handleStartButtonClick}
        >
          <Text>사용시작</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default InputTimeScreen;
