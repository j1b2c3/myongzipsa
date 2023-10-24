
// react에서 각종 함수들을 쓰기위해 기본적으로 불러오는 모듈, 앤간해서 모든 프론트 화면에 넣자.
import * as React from "react";

// 네비게이션 모듈
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from  "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

// 네비게이터 생성
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// 화면 연결
import LoginScreen from "./screen/Auth/Login";

import MemberShipScreen from "./screen/InApp/MemberShip";
import FindingScreen from "./screen/InApp/Finding";
import FindIDScreen from "./screen/InApp/FindID";
import FindPwdScreen from "./screen/InApp/FindPwd";

import HomeScreen from "./screen/InApp/Home";
import ChartScreen from "./screen/InApp/Chart";
import WashingMchartScreen from "./screen/InApp/WashingMchart";
import DryingMchartScreen from "./screen/InApp/DryingMchart";


export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
          name="Login"  
          component={LoginScreen} 
          options={{headerShown : false}}
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
          options={{headerShown : false}}
        />
          <Stack.Screen
          name="배치도"
          component={ChartScreen}
          //options={{headerShown : false}}
        />


    
      </Stack.Navigator>
    </NavigationContainer>
    
  );
}