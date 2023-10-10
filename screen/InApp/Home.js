import React, { useState, useEffect, createRef } from "react";
import { StatusBar } from 'expo-status-bar';
import { Text, View, TouchableOpacity, TextInput } from 'react-native';

// 스타일 import
import HomeStyle from "../../styles/Auth/HomeStyle";

export default function HomeScreen({navigation}) {
    React.useLayoutEffect(() => {
      navigation.setOptions({
        headerStyle: HomeStyle.head_navigation,
        headerTitleStyle: HomeStyle.title,
        headerLeft: () => (
          // 뒤로가기 버튼 아이콘 설정
          <Text 
          style={HomeStyle.backButton} 
          onPress={() => navigation.goBack()}
          >
            {'〈'} {/* 뒤로가기 아이콘 */}
          </Text>
        ),
        headerTitleAlign : 'center',
      })
    }, [navigation])

    return (
      <View>
        
        {/* 명집사의 특색 */}
        <View>
          <Text>안녕하세요 명집사입니다. </Text>
          <Text>OOO님 오늘도 좋은 하루 보내시길 바랍니다.</Text>
        </View>

        {/* 광고 배너 부분 */}
        <View>
        
        </View>

        {/* 현재 이용 상황 */}
        <View>

        </View>

        {/* 세탁기 건조기 부분(중간고사) 헬스장(기말), 주차장(미정) */}
        <View>

        </View>

      </View>
    );
}