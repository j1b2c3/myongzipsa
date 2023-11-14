import React, { useState, useEffect, createRef } from "react";
import { StatusBar } from 'expo-status-bar';
import { Text, View, TouchableOpacity, TextInput, Button, Alert, StyleSheet, Image } from 'react-native';

//스타일 import
import DryingMchart2Style from "../../styles/Auth/DryingMchart2Style";

export default function DryingMchart2Screen({ navigation }) {
    const [machineState, setMachineState] = useState("default");

    return (

        <View style={DryingMchart2Style.container}>
            <View style={DryingMchart2Style.row}>
                {/* 1행 */}
                <TouchableOpacity
                    style={DryingMchart2Style.machine}
                >
                    <Image style={DryingMchart2Style.machineImage}
                        source={require("../../img/non_washing_machine.jpg")} />
                </TouchableOpacity>
                <TouchableOpacity
                    style={DryingMchart2Style.machine2}
                >
                    <Image style={DryingMchart2Style.machineImage}
                        source={require("../../img/drying_machine.jpg")} />
                    <View style={DryingMchart2Style.overlay}>
                        <Text style={DryingMchart2Style.overlayText}>1</Text>
                    </View>
                </TouchableOpacity>
            </View>
            {/* 2행 */}
            <View style={DryingMchart2Style.row}>
                <TouchableOpacity
                    style={DryingMchart2Style.machine}
                >
                    <Image style={DryingMchart2Style.machineImage}
                        source={require("../../img/non_washing_machine.jpg")} />
                </TouchableOpacity>
                <TouchableOpacity
                    style={DryingMchart2Style.machine2}
                >
                    <Image style={DryingMchart2Style.machineImage}
                        source={require("../../img/drying_machine.jpg")} />
                    <View style={DryingMchart2Style.overlay}>
                        <Text style={DryingMchart2Style.overlayText}>2</Text>
                    </View>
                </TouchableOpacity>
            </View>
            {/* 3행 */}
            <View style={DryingMchart2Style.row}>
                <TouchableOpacity
                    style={DryingMchart2Style.machine}
                >
                    <Image style={DryingMchart2Style.machineImage}
                        source={require("../../img/non_washing_machine.jpg")} />
                </TouchableOpacity>
            </View>
        </View>
    );
}

