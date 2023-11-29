import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { auth, database } from '../../javascripts/FirebaseConfigFile';
import StatusGymStyle from '../../styles/Auth/StatusGymStyle';

const StatusGym = ({ navigation }) => {
    const [dates, setDates] = useState([]);
    const [selectedDate, setSelectedDate] = useState(null);
    const [enterTime, setEnterTime] = useState('');
    const [outTime, setOutTime] = useState('');

    const userKey = auth.currentUser.email.replace(/[.$#[\]/]/g, "_");

    useEffect(() => {
        const gymDateListRef = database.ref('GymDateList');
        gymDateListRef.on('value', (snapshot) => {
            const data = snapshot.val();
            const sortedDates = Object.keys(data || {})
                .sort((a, b) => new Date(b) - new Date(a))
                .filter(date => data[date][userKey]);
            setDates(sortedDates);
        });

        return () => gymDateListRef.off();
    }, []);

    const selectDate = (date) => {
        if (selectedDate === date) {
            setSelectedDate(null);
            setEnterTime('');
            setOutTime('');
        } else {
            setSelectedDate(date);

            const gymDateRef = database.ref(`GymDateList/${date}/${userKey}`);
            gymDateRef.on('value', (snapshot) => {
                const data = snapshot.val();
                setEnterTime(data?.enterTime || '');
                setOutTime(data?.outTime || '');
            });

            return () => gymDateRef.off();
        }
    };

    const isToday = (date) => {
        const today = new Date();
        const todayStr = `${today.getFullYear()}-${today.getMonth()+1}-${today.getDate()}`;
        return date === todayStr;
    };

    return (
        <ScrollView
            contentContainerStyle={{padding: 30}}  // flex: 1 제거하고 필요한 padding 또는 margin 추가
            showsVerticalScrollIndicator={false}
        >
            {dates.map((date, index) => (
                <View key={index}>
                    <TouchableOpacity
                        style={[StatusGymStyle.dateBox, isToday(date) ? { backgroundColor: '#87ceeb' } : {}]}
                        onPress={() => selectDate(date)}
                    >
                        <Text style={StatusGymStyle.dateText}>{date}</Text>
                    </TouchableOpacity>
                    {selectedDate === date && (
                        <View style={StatusGymStyle.usageBox}>
                            <Text>날짜: {selectedDate}</Text>
                            <Text>입장 시간: {enterTime}</Text>
                            <Text>퇴장 시간: {outTime}</Text>
                        </View>
                    )}
                </View>
            ))}
            {dates.length === 0 && (
                <ActivityIndicator size="large" color="#0000ff" />
            )}
        </ScrollView>
    );
};

export default StatusGym;