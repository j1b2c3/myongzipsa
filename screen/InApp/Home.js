import React, { useState, useEffect, createRef } from "react";
// import { StatusBar } from 'expo-status-bar';
import 'firebase/database';
import { Text, View, TouchableOpacity, TextInput, Image, StatusBar } from 'react-native';

// 스타일 import
import HomeStyle from "../../styles/Auth/HomeStyle";

export default function HomeScreen({navigation}) {
    // React.useLayoutEffect(() => {
    //   navigation.setOptions({
    //     headerStyle: HomeStyle.head_navigation,
    //     headerTitleStyle: HomeStyle.title,
    //     headerLeft: () => (
    //       // 뒤로가기 버튼 아이콘 설정
    //       <Text 
    //       style={HomeStyle.backButton} 
    //       onPress={() => navigation.goBack()}
    //       >
    //         {'〈'} {/* 뒤로가기 아이콘 */}
    //       </Text>
    //     ),
    //     headerTitleAlign : 'center',
    //   })
    // }, [navigation])

    return (
      <View style={HomeStyle.container}>
        <StatusBar />
        {/*명집사 */}
        <View style={HomeStyle.titleContainer}>
          {/* <Image 
            style={HomeStyle.title}
            source = {require("../../img/icon.png")}
          /> */}
          <Text style={HomeStyle.titleText}>명 집 사</Text>
        </View>

        {/* 명집사의 특색 */}
        <View style={HomeStyle.zipsaContainer}>

          <Text style={HomeStyle.zipsa}>안녕하세요 명집사입니다. </Text>
          <Text style={HomeStyle.zipsa}>OOO님 오늘도 좋은 아침입니다.</Text>
          <Text style={HomeStyle.zipsa}>무엇을 도와드릴까요?</Text>
        </View>

        {/* 현재 이용 상황 */}
        <View style={HomeStyle.usingContainer}>
          <TouchableOpacity style={HomeStyle.firstButton}>
            <Text style={HomeStyle.useBtext}>세탁기</Text>
          </TouchableOpacity>

          <TouchableOpacity style={HomeStyle.secondButton}>
            <Text style={HomeStyle.useBtext}>건조기</Text>
          </TouchableOpacity>

          <TouchableOpacity style={HomeStyle.thirdButton}>
            <Text style={HomeStyle.useBtext}>헬스장</Text>
          </TouchableOpacity>

          <TouchableOpacity style={HomeStyle.finalButton}>
            <Text style={HomeStyle.useBtext}>주차장</Text>
          </TouchableOpacity>
        </View>

        <View style={HomeStyle.usingContainer2}>
        <TouchableOpacity style={HomeStyle.useButton}>
          <Text style={HomeStyle.useBtext1}>사용중</Text>
          </TouchableOpacity>

          <TouchableOpacity style={HomeStyle.reserveButton}>
            <Text style={HomeStyle.useBtext1}>예약중</Text>
          </TouchableOpacity>

          <TouchableOpacity style={HomeStyle.recommendButton}>
            <Text style={HomeStyle.useBtext1}>추천</Text>
          </TouchableOpacity>
        </View>

        {/* 세탁기 건조기 부분(중간고사) 헬스장(기말), 주차장(미정) */}
        <View style={HomeStyle.iconContainer}>
          {/*세탁기*/}
          <TouchableOpacity style={HomeStyle.leftButton}>
            <Image style={HomeStyle.icon}
              source = {require("../../img/icon_washing_machine.jpg")}/>
              <Text>세탁기</Text>
              {/* onPress = */}
            </TouchableOpacity>

          {/*건조기*/}
          <TouchableOpacity style={HomeStyle.rightButton}>
            <Image style={HomeStyle.icon}
              source = {require("../../img/icon_drying_machine.jpg")}/>
              <Text>건조기</Text>
              {/* onPress = */}
          </TouchableOpacity>
        </View>
        
        <View style={HomeStyle.iconContainer2}>
          {/*헬스장*/}
          <TouchableOpacity style={HomeStyle.leftButton}>
            <Image style={HomeStyle.icon2}
              source = {require("../../img/icon_gym.jpg")}/> 
              <Text>헬스장</Text>
              {/* onPress = */}
          </TouchableOpacity>

          {/*주차장*/}
          <TouchableOpacity style={HomeStyle.rightButton}>
            <Image style={HomeStyle.icon2}
              source = {require("../../img/icon_parking.jpg")}/> 
              <Text>주차장</Text>
              {/* onPress = */}
          </TouchableOpacity>
        </View>

                {/* 광고 배너 부분 */}
        <View style={HomeStyle.advContainer}>
          <TouchableOpacity >
            <Image style ={HomeStyle.advert}
            source = {require("../../img/blank.png")}/>
          </TouchableOpacity>
        </View>

      </View>
    );
}