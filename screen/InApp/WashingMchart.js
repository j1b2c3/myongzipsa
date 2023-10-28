import React, { useState, useEffect, createRef } from "react";
import { StatusBar } from 'expo-status-bar';
import { Text, View, TouchableOpacity, TextInput, Button, Alert, StyleSheet } from 'react-native';

//스타일 import
import WashingMchartStyle from "../../styles/Auth/WashingMchartStyle";

export default function WashingMchartScreen({navigation}) {
    return (
        <View>
            <View style={WashingMchartStyle.iconContainer}>
                {/*세탁기1*/}
                <TouchableOpacity style={WashingMchartStyle.rightButton}
                //'사용가능'이라고 가정하고 세탁시간 입력하는 페이지로 이동코드 임시로 추가
                onPress={()=>navigation.navigate("세탁시간입력")}>
                {/* onPress={() => navigation.navigate("배치도")}> */}
                    <Text>1번 세탁기</Text>
                </TouchableOpacity>

                {/*세탁기4*/}
                <TouchableOpacity style={WashingMchartStyle.rightButton}
                //'예약가능'이라고 가정하고 예약페이지로 이동코드 임시로 추가
                onPress={()=>navigation.navigate("예약하기")}>
                {/* onPress={() => navigation.navigate("배치도")}> */}
                    <Text>4번 세탁기</Text>
                </TouchableOpacity>
            </View>

            <View style={WashingMchartStyle.iconContainer}>
                {/*세탁기2*/}
                <TouchableOpacity style={WashingMchartStyle.rightButton}>
                {/* onPress={() => navigation.navigate("배치도")}> */}
                    <Text>2번 세탁기</Text>
                </TouchableOpacity>

                {/*세탁기5*/}
                <TouchableOpacity style={WashingMchartStyle.rightButton}>
                {/* onPress={() => navigation.navigate("배치도")}> */}
                    <Text>5번 세탁기</Text>
                </TouchableOpacity>
            </View>

            <View style={WashingMchartStyle.iconContainer}>
                {/*세탁기3*/}
                <TouchableOpacity style={WashingMchartStyle.rightButton}>
                {/* onPress={() => navigation.navigate("배치도")}> */}
                    <Text>3번 세탁기</Text>
                </TouchableOpacity>

                {/*세탁기6*/}
                <TouchableOpacity style={WashingMchartStyle.rightButton}>
                {/* onPress={() => navigation.navigate("배치도")}> */}
                    <Text>6번 세탁기</Text>
                </TouchableOpacity>
            </View>

            <View style={WashingMchartStyle.iconContainer}>
                {/*건조기1*/}
                <TouchableOpacity style={WashingMchartStyle.rightButton}>
                {/* onPress={() => navigation.navigate("배치도")}> */}
                    <Text>1번 건조기</Text>
                </TouchableOpacity>

                {/*세탁기7*/}
                <TouchableOpacity style={WashingMchartStyle.rightButton}>
                {/* onPress={() => navigation.navigate("배치도")}> */}
                    <Text>7번 세탁기</Text>
                </TouchableOpacity>
            </View>

            <View style={WashingMchartStyle.iconContainer}>
                {/*건조기2*/}
                <TouchableOpacity style={WashingMchartStyle.rightButton}>
                {/* onPress={() => navigation.navigate("배치도")}> */}
                    <Text>2번 건조기</Text>
                </TouchableOpacity>

                {/*세탁기8*/}
                <TouchableOpacity style={WashingMchartStyle.rightButton}>
                {/* onPress={() => navigation.navigate("배치도")}> */}
                    <Text>8번 세탁기</Text>
                </TouchableOpacity>
            </View>

            <View style={WashingMchartStyle.iconContainer}>
                {/*입구*/}
                <TouchableOpacity style={WashingMchartStyle.rightButton}>
                {/* onPress={() => navigation.navigate("배치도")}> */}
                    <Text>자동 추천</Text>
                </TouchableOpacity>

                {/*건조기3*/}
                <TouchableOpacity style={WashingMchartStyle.rightButton}>
                {/* onPress={() => navigation.navigate("배치도")}> */}
                    <Text>3번 건조기</Text>
                </TouchableOpacity>
            </View>

            <View style={WashingMchartStyle.iconContainer}>
                {/*입구*/}
                <TouchableOpacity style={WashingMchartStyle.rightButton}>
                {/* onPress={() => navigation.navigate("배치도")}> */}
                    <Text>입구</Text>
                </TouchableOpacity>

                {/*건조기4*/}
                <TouchableOpacity style={WashingMchartStyle.rightButton}>
                {/* onPress={() => navigation.navigate("배치도")}> */}
                    <Text>4번 건조기</Text>
                </TouchableOpacity>
            </View>
        </View>

    );
}

