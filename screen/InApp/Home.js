import React, { useState, useEffect } from "react";
import { Text, View, TouchableOpacity, Image, StatusBar, SafeAreaView } from 'react-native';
import { auth, database } from '../../javascripts/FirebaseConfigFile';
import HomeStyle from "../../styles/Auth/HomeStyle";
import ChartScreen from "../InApp/Chart";

export default function HomeScreen({ navigation }) {

  const [name, setName] = useState('');
  const [selectedButton, setSelectedButton] = useState(null);

  useEffect(() => {
    const user = auth.currentUser;

    if (user) {
      const userRef = database.ref('users/' + user.uid);
      userRef.on('value', snapshot => {
        const data = snapshot.val();
        setName(data.username);
      });
    }
  }, []);

  return (
    <SafeAreaView style={HomeStyle.container}>
      <StatusBar />

      {/* 명집사의 특색 */}
      <View style={HomeStyle.zipsaContainer}>
        <Text style={HomeStyle.zipsa}>안녕하세요 명집사입니다. </Text>
        <Text style={HomeStyle.zipsa}>{name}님 오늘도 좋은 아침입니다.</Text>
        <Text style={HomeStyle.zipsa}>무엇을 도와드릴까요?</Text>
      </View>

      <View style={HomeStyle.usingContainer}>
        <TouchableOpacity style={HomeStyle.firstButton} onPress={() => setSelectedButton('세탁기')}>
          <Text style={HomeStyle.useBtext}>세탁기</Text>
        </TouchableOpacity>

        <TouchableOpacity style={HomeStyle.secondButton} onPress={() => setSelectedButton('건조기')}>
          <Text style={HomeStyle.useBtext}>건조기</Text>
        </TouchableOpacity>

        <TouchableOpacity style={HomeStyle.thirdButton} onPress={() => setSelectedButton('헬스장')}>
          <Text style={HomeStyle.useBtext}>헬스장</Text>
        </TouchableOpacity>

        <TouchableOpacity style={HomeStyle.finalButton}>
          <Text style={HomeStyle.useBtext}>QR코드</Text>
        </TouchableOpacity>
      </View>

      {/* 각 버튼에 따른 사용 및 이용 현황 */}
      {(selectedButton === '세탁기') && (
        <View style={HomeStyle.usageStatus}>
          <Text style={HomeStyle.usageText}>세탁기 사용 현황</Text>
          {/* 세탁기 사용 현황에 대한 내용 */}
        </View>
      )}

      {(selectedButton === '건조기') && (
        <View style={HomeStyle.usageStatus}>
          <Text style={HomeStyle.usageText}>건조기 사용 현황</Text>
          {/* 건조기 사용 현황에 대한 내용 */}
        </View>
      )}

      {(selectedButton === '헬스장') && (
        <View style={HomeStyle.usageStatus}>
          <Text style={HomeStyle.usageText}>헬스장 이용 현황</Text>
          {/* 헬스장 이용 현황에 대한 내용 */}
        </View>
      )}

      {(selectedButton === '주차장') && (
        <View style={HomeStyle.usageStatus}>
          <Text style={HomeStyle.usageText}>주차장 이용 현황</Text>
          {/* 주차장 이용 현황에 대한 내용 */}
        </View>
      )}

      {/* //main 부분 */}
      {/* 세탁기 건조기 부분(중간고사) 헬스장(기말), 주차장(미정) */}
      <View style={HomeStyle.iconContainer}>
        {/*세탁기*/}
        <TouchableOpacity style={HomeStyle.leftButton}
          onPress={() => navigation.navigate("세탁기", {
            // ======= front 부분
            //         {/* 세탁기 건조기 부분(중간고사) 헬스장(기말), 주차장(미정) */}
            //         <View style={HomeStyle.iconContainer}>
            //           {/*세탁기*/}
            //           <TouchableOpacity style={HomeStyle.leftButton}
            //           onPress={() => navigation.navigate("세탁기", {
            // >>>>>>> front
            pageName: "세탁기"
          })}>
          <Image style={HomeStyle.icon}
            source={require("../../img/icon_washing_machine.jpg")} />
          <Text>세탁기</Text>
          {/* onPress = */}
        </TouchableOpacity>

        {/* <<<<<<< main */}
        {/*건조기*/}
        <TouchableOpacity style={HomeStyle.rightButton}
          onPress={() => navigation.navigate("건조기", {
            // ======= front 부분
            //           {/*건조기*/}
            //           <TouchableOpacity style={HomeStyle.rightButton}
            //           onPress={() => navigation.navigate("건조기", {
            // >>>>>>> front
            pageName: "건조기"
          })}>
          <Image style={HomeStyle.icon}
            source={require("../../img/icon_drying_machine.jpg")} />
          <Text>건조기</Text>
          {/* onPress = */}
        </TouchableOpacity>
      </View>

      <View style={HomeStyle.iconContainer2}>
        {/*헬스장*/}
        <TouchableOpacity style={HomeStyle.leftButton}>
          <Image style={HomeStyle.icon2}
            source={require("../../img/icon_gym.jpg")} />
          <Text>헬스장</Text>
          {/* onPress = */}
        </TouchableOpacity>

        {/*주차장*/}
        <TouchableOpacity style={HomeStyle.rightButton}
        onPress={() => navigation.navigate("QR코드", {
            pageName: "QR코드"
          })}>
          <Image style={HomeStyle.icon2}
            source={require("../../img/icon_parking.jpg")} />
          <Text>QR코드</Text>
          {/* onPress = */}
        </TouchableOpacity>
      </View>

      {/* 광고 배너 부분 */}
      <View style={HomeStyle.advContainer}>
        <TouchableOpacity >
          <Image style={HomeStyle.advert}
            source={require("../../img/blank.png")} />
        </TouchableOpacity>
      </View>
      
    </SafeAreaView>
  )
}
