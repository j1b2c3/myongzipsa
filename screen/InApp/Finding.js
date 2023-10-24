import React, { useState, useEffect, createRef } from "react";
import { StatusBar } from 'expo-status-bar';
import { Text, View, TouchableOpacity, TextInput } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import FindIDScreen from './FindID';
import FindPwdScreen from './FindPwd';

const Tab = createMaterialTopTabNavigator();
 
//FindingScreen 상단탭바에 FindingIDScreen,FindingPwdScreen 추가
export default function FindingScreen() {
    return (
      <Tab.Navigator initialRouteName="아이디찾기">
        <Tab.Screen name="아이디찾기" component={FindIDScreen} options={{ title: '아이디 찾기' }} />
        <Tab.Screen name="비밀번호찾기" component={FindPwdScreen} options={{ title: '비밀번호 찾기' }} />
      </Tab.Navigator>
    );
  }