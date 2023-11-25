import React, { useState } from "react";
import { Text, View, TouchableOpacity, Alert, Image } from 'react-native';

//스타일 import
import GymChartStyle from '../../styles/Auth/GymChartStyle';

const GymChartScreen = () => {
    const [totalCapacity, setTotalCapacity] = useState(50);
    const [currentUsers, setCurrentUsers] = useState(4);

    const startUsage = () => {
        if (currentUsers < totalCapacity) {
            Alert.alert(
                "이용하시겠습니까?",
                null,
                [
                    { text: "취소", style: "cancel" },
                    {
                        text: "확인",
                        onPress: () => setCurrentUsers(currentUsers + 1)
                    }
                ],
                { cancelable: false }
            );
        } else {
            alert("이용 가능 인원을 초과했습니다!");
        }
    };

    const endUsage = () => {
        if (currentUsers > 0) {
            Alert.alert(
                "이용 종료하시겠습니까?",
                null,
                [
                    { text: "취소", style: "cancel" },
                    {
                        text: "확인",
                        onPress: () => setCurrentUsers(currentUsers - 1)
                    }
                ],
                { cancelable: false }
            );
        } else {
            alert("이용 중인 사람이 없습니다!");
        }
    };
    return (
        <View style={GymChartStyle.container}>
            <View style={GymChartStyle.noticeBox}>
                <Text style={GymChartStyle.noticText}><Text style={GymChartStyle.header}>이용 대상:</Text> 자연생활관 사생 전체</Text>
                <Text style={GymChartStyle.noticText}><Text style={GymChartStyle.header}>이용 시간:</Text> 오전 06:00~10:00, 오후 18:00~22:00</Text>
                <Text style={GymChartStyle.noticText}><Text style={GymChartStyle.header}>이용 안내:</Text></Text>
                <Text style={GymChartStyle.noticText}>-출입/퇴실시 '시작'/'종료'버튼 누르기</Text>
                <Text style={GymChartStyle.noticText}>-실내전용 운동화 필수, 미착용 적발시 강제 퇴장조치되며 체력단련실 출입 제한됨</Text>
                <Text style={GymChartStyle.noticText}>-타인에게 피해를 줄 수 있는 행위주의, 운동기구 사용후에 제자리에 정리정돈, 기구에 떨어진 본인땀닦기</Text>
                <Text style={GymChartStyle.noticText}><Text style={GymChartStyle.warning}>※외부인 동반 출입 적발시 생활관 강제 퇴사 조치됨.</Text></Text>
            </View>

            <View style={GymChartStyle.buttonContainer}>
                <TouchableOpacity style={GymChartStyle.button} onPress={startUsage}>
                    <Text style={GymChartStyle.buttonText}>이용 시작</Text>
                </TouchableOpacity>
                <TouchableOpacity style={GymChartStyle.button} onPress={endUsage}>
                    <Text style={GymChartStyle.buttonText}>이용 종료</Text>
                </TouchableOpacity>
            </View>

            <View style={GymChartStyle.usageInfoBox}>
                <Text style={GymChartStyle.usageInfoText1}>이용 중 / 이용 가능</Text>
                <Text style={GymChartStyle.usageInfoText2}>{currentUsers}/{totalCapacity}</Text>
            </View>

            {/* <View style={GymChartStyle.imageContainer}>
                <Image
                    source={require('../../img/icon_gym.jpg')} 
                    style={GymChartStyle.image}
                />
            </View> */}
        </View>
    );
};

export default GymChartScreen;