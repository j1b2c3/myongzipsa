import React, { useState, useEffect } from "react";
import { Text, View, TouchableOpacity, Image, StatusBar, SafeAreaView } from 'react-native';
import { auth, database } from '../../javascripts/FirebaseConfigFile';
import HomeStyle from "../../styles/Auth/HomeStyle";
import ChartScreen from "../InApp/Chart";
import { ReservationStatus, UsageStatus } from "./MyStatusWashing";

// Text 적용
Text.defaultProps = Text.defaultProps || {};
Text.defaultProps.allowFontScaling = false;

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
      <View style={HomeStyle.specialContainer}>
        <TouchableOpacity style={HomeStyle.mailButton}
          onPress={() => {
            if (name === '관리자') {
              navigation.navigate("문의관리", { pageName: "문의관리" });
            } else {
              navigation.navigate("공지사항", { pageName: "공지사항" });
            }
          }}
        >
          <Image style={HomeStyle.iconNotice}
            source={require("../../img/icon_notice.png")} />
          <Text>공지사항</Text>
        </TouchableOpacity>

        <TouchableOpacity style={HomeStyle.qrButton}
          onPress={() => navigation.navigate("QR코드", {
            pageName: "QR코드"
          })}>
          <Image style={HomeStyle.iconQR}
            source={require("../../img/icon_qr.png")} />
          <Text>QR코드</Text>
        </TouchableOpacity>
      </View>
      {/* 명집사의 특색 */}
      <View style={HomeStyle.zipsaContainer}>
        <Text style={HomeStyle.zipsa}> 어서오세요 {name}님</Text>
        <Text style={HomeStyle.zipsa}> 무엇을 도와드릴까요?</Text>
        <Image
          style={HomeStyle.overlayImage}
          source={require("../../img/zipsa.jpg")}
        />
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

        <TouchableOpacity style={HomeStyle.finalButton} onPress={() => setSelectedButton('주차장')}>
          <Text style={HomeStyle.useBtext}>주차장</Text>
        </TouchableOpacity>

      </View>

      <View style={HomeStyle.useContainer}>
        {(selectedButton === '세탁기') && (
          <TouchableOpacity style={HomeStyle.usageStatusW} onPress={() => navigation.navigate('세탁기 정보')}>
            <Text style={HomeStyle.usageText}>내 정보</Text>
          </TouchableOpacity>
        )}

        {(selectedButton === '건조기') && (
          <TouchableOpacity style={HomeStyle.usageStatusD} onPress={() => navigation.navigate('건조기 정보')} >
            <Text style={HomeStyle.usageText}>내 정보</Text>
          </TouchableOpacity>
        )}

        {(selectedButton === '헬스장') && (
          <TouchableOpacity style={HomeStyle.usageStatusG} onPress={() => navigation.navigate('헬스장 정보')}>
            <Text style={HomeStyle.usageText}>내 정보</Text>
          </TouchableOpacity>
        )}

        {(selectedButton === '주차장') && (
          <TouchableOpacity style={HomeStyle.usageStatusP}>
            <Text style={HomeStyle.usageText}>내 정보</Text>
          </TouchableOpacity>
        )}
      </View>

      <View style={HomeStyle.iconContainer}>
        <TouchableOpacity style={HomeStyle.leftButton}
          onPress={() => navigation.navigate("세탁기", {
            pageName: "세탁기"
          })}>
          <Image style={HomeStyle.icon}
            source={require("../../img/icon_washing_machine.jpg")} />
          <Text>세탁기</Text>
        </TouchableOpacity>

        <TouchableOpacity style={HomeStyle.rightButton}
          onPress={() => navigation.navigate("건조기", {
            pageName: "건조기"
          })}>
          <Image style={HomeStyle.icon}
            source={require("../../img/icon_drying_machine.jpg")} />
          <Text>건조기</Text>
        </TouchableOpacity>
      </View>

      <View style={HomeStyle.iconContainer2}>
        <TouchableOpacity style={HomeStyle.leftButton}
          onPress={() => navigation.navigate("헬스장", {
            pageName: "헬스장"
          })}>
          <Image style={HomeStyle.icon2}
            source={require("../../img/icon_gym.jpg")} />
          <Text>헬스장</Text>
        </TouchableOpacity>

        <TouchableOpacity style={HomeStyle.rightButton}>
          <Image style={HomeStyle.icon2}
            source={require("../../img/icon_parking.jpg")} />
          <Text>주차장</Text>
        </TouchableOpacity>
      </View>

      <View style={HomeStyle.advContainer}>
        <TouchableOpacity >
          <Image style={HomeStyle.advert}
            source={require("../../img/blank.png")} />
        </TouchableOpacity>
      </View>

    </SafeAreaView>
  )
}
