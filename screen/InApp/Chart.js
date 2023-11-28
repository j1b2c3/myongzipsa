import React, { useState, useEffect, createRef } from "react";
import { StatusBar } from 'expo-status-bar';
import { Text, View, TouchableOpacity, TextInput } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import WashingMchartScreen from './WashingMchart';
import WashingMchart2Screen from './WashingMchart2';

//세탁기배치도
const Tab = createMaterialTopTabNavigator();

export default function ChartScreen({ navigation, route }) {
  const { pageName: initialPage } = route.params;
  return (
    <Tab.Navigator initialRouteName={initialPage}>
      <Tab.Screen name="1번방" component={WashingMchartScreen} options={{ title: '1번방' }} />
      <Tab.Screen name="2번방" component={WashingMchart2Screen} options={{ title: '2번방' }} />
    </Tab.Navigator>
  );
}