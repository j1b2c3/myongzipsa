
// react에서 각종 함수들을 쓰기위해 기본적으로 불러오는 모듈, 앤간해서 모든 프론트 화면에 넣자.
import * as React from "react";

// 네비게이션 모듈
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

// 네비게이터 생성
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// 화면 연결
import LoginScreen from "./screen/Auth/Login";
import MemberShipScreen from "./screen/Auth/MemberShip";
import FindingScreen from "./screen/Auth/Finding";
import FindIDScreen from "./screen/Auth/FindID";
import FindPwdScreen from "./screen/Auth/FindPwd";

import HomeScreen from "./screen/InApp/Home";
import ChartScreen from "./screen/InApp/Chart";
import Chart2Screen from "./screen/InApp/Chart2";
import WashingMchartScreen from "./screen/InApp/WashingMchart";
import DryingMchartScreen from "./screen/InApp/DryingMchart";
import QRScreen from "./screen/InApp/QRcode";
import GymChartScreen from "./screen/InApp/GymChart";
import MailBoxScreen from "./screen/InApp/MailBox";
import AdminScreen from "./screen/InApp/adminMail";


import StatusW from "./screen/InApp/MyStatusWashing";
import StatusD from "./screen/InApp/MyStatusDrying";
import StatusGym from "./screen/InApp/gymStatus";

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="회원가입"
          component={MemberShipScreen}
        //options={{headerShown : false}}
        />
        <Stack.Screen
          name="아이디/비밀번호 찾기"
          component={FindingScreen}
        //options={{headerShown : false}}
        />
        <Stack.Screen
          name="명집사"
          component={HomeScreen}
        //options={{ headerShown: false }}
        />
        <Stack.Screen
          name="세탁기"
          component={ChartScreen}
        //options={{headerShown : false}}
        />
        <Stack.Screen
          name="건조기"
          component={Chart2Screen}
        //options={{headerShown : false}}
        />
        <Stack.Screen
          name="공지사항"
          component={MailBoxScreen}
        //options={{headerShown : false}}
        />
        <Stack.Screen
          name="문의관리"
          component={AdminScreen}
        //options={{headerShown : false}}
        />
        <Stack.Screen
          name="헬스장"
          component={GymChartScreen}
        //options={{headerShown : false}}
        />
        <Stack.Screen
          name="QR코드"
          component={QRScreen}
        />
        <Stack.Screen
          name="세탁기 정보"
          component={StatusW}
        />
        <Stack.Screen
          name="건조기 정보"
          component={StatusD}
        />
        <Stack.Screen
          name="헬스장 정보"
          component={StatusGym}
        />
      </Stack.Navigator>
    </NavigationContainer>

  );
}