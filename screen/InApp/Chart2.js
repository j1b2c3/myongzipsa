import React, { useState, useEffect, createRef } from "react";
import { StatusBar } from 'expo-status-bar';
import { Text, View, TouchableOpacity, TextInput } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import DryingMchartScreen from './DryingMchart';
import DryingMchart2Screen from './DryingMchart2';

//건조기배치도
const Tab = createMaterialTopTabNavigator();

export default function Chart2Screen({ navigation, route }) {
  const { pageName: initialPage } = route.params;
  return (
    <Tab.Navigator initialRouteName={initialPage}>
      <Tab.Screen name="1번방" component={DryingMchartScreen} options={{ title: '1번방' }} />
      <Tab.Screen name="2번방" component={DryingMchart2Screen} options={{ title: '2번방' }} />
    </Tab.Navigator>
  );
}