import React, { useState, useEffect, createRef } from "react";
import { StatusBar } from 'expo-status-bar';
import { Text, View, TouchableOpacity, TextInput, Button, Alert, StyleSheet, Image } from 'react-native';

//스타일 import
import WashingMchart2Style from "../../styles/Auth/WashingMchart2Style";

export default function WashingMchart2Screen({ navigation }) {
    const [machineState, setMachineState] = useState("default");

    return (

        <View style={WashingMchart2Style.container}>
            <View style={WashingMchart2Style.row}>
                {/* 1행 */}
                <TouchableOpacity
                    style={WashingMchart2Style.machine}
                >
                    <Image style={WashingMchart2Style.machineImage}
                        source={require("../../img/washing_machine.jpg")} />
                    <View style={WashingMchart2Style.overlay}>
                        <Text style={WashingMchart2Style.overlayText}>1</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    style={WashingMchart2Style.machine}
                >
                    <Image style={WashingMchart2Style.machineImage}
                        source={require("../../img/non_drying_machine.jpg")} />
                    {/* <View style={WashingMchart2Style.overlay}>
                        <Text style={WashingMchart2Style.overlayText}>4</Text>
                    </View> */}
                </TouchableOpacity>
            </View>
            {/* 2행 */}
            <View style={WashingMchart2Style.row}>
                <TouchableOpacity
                    style={WashingMchart2Style.machine}
                >
                    <Image style={WashingMchart2Style.machineImage}
                        source={require("../../img/washing_machine.jpg")} />
                    <View style={WashingMchart2Style.overlay}>
                        <Text style={WashingMchart2Style.overlayText}>2</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    style={WashingMchart2Style.machine}
                >
                    <Image style={WashingMchart2Style.machineImage}
                        source={require("../../img/non_drying_machine.jpg")} />
                    {/* <View style={WashingMchart2Style.overlay}>
                        <Text style={WashingMchart2Style.overlayText}>5</Text>
                    </View> */}
                </TouchableOpacity>
            </View>
            {/* 3행 */}
            <View style={WashingMchart2Style.row}>
                <TouchableOpacity
                    style={WashingMchart2Style.machine}
                >
                    <Image style={WashingMchart2Style.machineImage}
                        source={require("../../img/washing_machine.jpg")} />
                    <View style={WashingMchart2Style.overlay}>
                        <Text style={WashingMchart2Style.overlayText}>3</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
}

