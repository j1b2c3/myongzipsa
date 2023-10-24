import React, { useState, useEffect, createRef } from "react";
import { StatusBar } from 'expo-status-bar';
import { Text, View, TouchableOpacity, TextInput } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import WashingMchartScreen from './WashingMchart';
import DryingMchartScreen from './DryingMchart';

const Tab = createMaterialTopTabNavigator();

//FindingScreen 상단탭바에 FindingIDScreen,FindingPwdScreen 추가
export default function ChartScreen() {
    return (
      <Tab.Navigator initialRouteName="편의시설">
        <Tab.Screen name="세탁기" component={WashingMchartScreen} options={{ title: '세탁기' }} />
        <Tab.Screen name="건조기" component={DryingMchartScreen} options={{ title: '건조기' }} />
        {/* <Tab.Screen name="헬스장" component={FindIDScreen} options={{ title: '헬스장' }} />
        <Tab.Screen name="주차장" component={FindIDScreen} options={{ title: '주차장' }} /> */}
      </Tab.Navigator>
    );
  }