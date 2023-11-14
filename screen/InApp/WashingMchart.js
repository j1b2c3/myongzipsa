import React, { useState, useEffect, createRef } from "react";
import { StatusBar } from 'expo-status-bar';
import { Text, View, TouchableOpacity, TextInput, Button, Alert, StyleSheet, Image } from 'react-native';

//스타일 import
import WashingMchartStyle from "../../styles/Auth/WashingMchartStyle";

export default function WashingMchartScreen({ navigation }) {
    const [machineState, setMachineState] = useState("default");

    return (

        <View style={WashingMchartStyle.container}>
            <View style={WashingMchartStyle.blank}>
            </View>
            {/* 1행 */}
            <View style={WashingMchartStyle.row}>
                <TouchableOpacity
                    style={WashingMchartStyle.machine}
                >
                    <Image style={WashingMchartStyle.machineImage}
                        source={require("../../img/washing_machine.jpg")} />
                    <View style={WashingMchartStyle.overlay}>
                        <Text style={WashingMchartStyle.overlayText}>1</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity
                    style={WashingMchartStyle.machine1}
                >
                    <Image style={WashingMchartStyle.machineImage}
                        source={require("../../img/washing_machine.jpg")} />
                    <View style={WashingMchartStyle.overlay}>
                        <Text style={WashingMchartStyle.overlayText}>4</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity
                    style={WashingMchartStyle.machine2}
                >
                    <Image style={WashingMchartStyle.machineImage}
                        source={require("../../img/Possible_status.jpg")} />
                </TouchableOpacity>
                
            </View>
            {/* 2행 */}
            <View style={WashingMchartStyle.row}>

                <TouchableOpacity
                    style={WashingMchartStyle.machine}
                >
                    <Image style={WashingMchartStyle.machineImage}
                        source={require("../../img/washing_machine.jpg")} />
                    <View style={WashingMchartStyle.overlay}>
                        <Text style={WashingMchartStyle.overlayText}>2</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    style={WashingMchartStyle.machine1}
                >
                    <Image style={WashingMchartStyle.machineImage}
                        source={require("../../img/washing_machine.jpg")} />
                    <View style={WashingMchartStyle.overlay}>
                        <Text style={WashingMchartStyle.overlayText}>5</Text>
                    </View>
                </TouchableOpacity>
            </View>
            {/* 3행 */}
            <View style={WashingMchartStyle.row}>
                <TouchableOpacity
                    style={WashingMchartStyle.machine}
                >
                    <Image style={WashingMchartStyle.machineImage}
                        source={require("../../img/washing_machine.jpg")} />
                    <View style={WashingMchartStyle.overlay}>
                        <Text style={WashingMchartStyle.overlayText}>3</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    style={WashingMchartStyle.machine1}
                >
                    <Image style={WashingMchartStyle.machineImage}
                        source={require("../../img/washing_machine.jpg")} />
                    <View style={WashingMchartStyle.overlay}>
                        <Text style={WashingMchartStyle.overlayText}>6</Text>
                    </View>
                </TouchableOpacity>
            </View>
            {/* 4행 */}
            <View style={WashingMchartStyle.row}>
                <TouchableOpacity
                    style={WashingMchartStyle.machine}
                >
                    <Image style={WashingMchartStyle.machineImage}
                        source={require("../../img/non_drying_machine.jpg")} />
                    {/* <Text>건조기</Text> */}
                </TouchableOpacity>
                <TouchableOpacity
                    style={WashingMchartStyle.machine1}
                >
                    <Image style={WashingMchartStyle.machineImage}
                        source={require("../../img/washing_machine.jpg")} />

                    <View style={WashingMchartStyle.overlay}>
                        <Text style={WashingMchartStyle.overlayText}>7</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    style={WashingMchartStyle.machine2}
                >
                    <Image style={WashingMchartStyle.machineImage}
                        source={require("../../img/non_drying_machine.jpg")} />
                    {/* <Text>건조기</Text> */}
                </TouchableOpacity>
            </View>
            {/* 5행 */}
            <View style={WashingMchartStyle.row}>
                <TouchableOpacity
                    style={WashingMchartStyle.machine}
                >
                    <Image style={WashingMchartStyle.machineImage}
                        source={require("../../img/non_drying_machine.jpg")} />
                    {/* <Text>건조기</Text> */}
                </TouchableOpacity>
                <TouchableOpacity
                    style={WashingMchartStyle.machine1}
                >
                    <Image style={WashingMchartStyle.machineImage}
                        source={require("../../img/washing_machine.jpg")} />
                    <View style={WashingMchartStyle.overlay}>
                        <Text style={WashingMchartStyle.overlayText}>8</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity
                    style={WashingMchartStyle.machine2}
                >
                    <Image style={WashingMchartStyle.machineImage}
                        source={require("../../img/non_drying_machine.jpg")} />
                    {/* <Text>건조기</Text> */}
                </TouchableOpacity>
            </View>
            <View style={WashingMchartStyle.blank}>
            </View>
        </View>
    );
}

