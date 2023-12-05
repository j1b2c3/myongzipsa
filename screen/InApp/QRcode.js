import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { auth, database } from '../../javascripts/FirebaseConfigFile';

// Text 적용
Text.defaultProps = Text.defaultProps || {};
Text.defaultProps.allowFontScaling = false;

import QRscreenStyle from '../../styles/Auth/QRscreenStyle';

const QRScreen = ({ navigation }) => {
    const [userEmail, setUserEmail] = useState('');
    const [userName, setUserName] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        // Fetch user information from Firebase
        const authObserver = auth.onAuthStateChanged((user) => {
            if (user) {
                setUserEmail(user.email);
                // Fetch additional user information from the database based on user's UID
                const userRef = database.ref(`users/${user.uid}`);
                userRef.once('value', (snapshot) => {
                    const userData = snapshot.val();
                    if (userData && userData.username) {
                        setUserName(userData.username);

                        // Log email and name
                        console.log('User Info In QR code:', user.email, userData.username);
                    }
                });
            }
            setIsLoading(false);
        });
        return authObserver;
    }, []);

    if (isLoading) {
        return (
            <View style={QRscreenStyle.container}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    const userInfo = `${userEmail}\n${userName}\n`;

    return (
        <View style={QRscreenStyle.container}>
            <Text>User Information:</Text>
            <Text>Email: {userEmail}</Text>
            <Text>Name: {userName}</Text>
            <QRCode
                value={userInfo}
                size={200}
                color="black"
                backgroundColor="white"
            />
        </View>
    );
};

export default QRScreen;
