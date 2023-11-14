import React, { useState, useEffect, createRef } from "react";
import { StatusBar } from 'expo-status-bar';
import { Text, View, TouchableOpacity, TextInput, Button, Alert, StyleSheet, Image} from 'react-native';

//스타일 import
import DryingMchartStyle from "../../styles/Auth/DryingMchartStyle";

export default function DryingMchartScreen({ navigation }) {
    const [machineState, setMachineState] = useState("default");

    return (

        <View style={DryingMchartStyle.container}>
            <View style={DryingMchartStyle.blank}>
            </View>
            <View style={DryingMchartStyle.row}>
                <TouchableOpacity
                    style={DryingMchartStyle.machine}
                >
                    <Image style={DryingMchartStyle.machineImage}
                        source={require("../../img/non_washing_machine.jpg")} />
                </TouchableOpacity>
                <TouchableOpacity
                    style={DryingMchartStyle.machine1}
                >
                    <Image style={DryingMchartStyle.machineImage}
                        source={require("../../img/non_washing_machine.jpg")} />
                </TouchableOpacity>
                <TouchableOpacity
                    style={DryingMchartStyle.machine2}
                >
                    <Image style={DryingMchartStyle.machineImage}
                        source={require("../../img/Possible_status.jpg")} />
                </TouchableOpacity>
            </View>
            <View style={DryingMchartStyle.row}>

                <TouchableOpacity
                    style={DryingMchartStyle.machine}
                >
                    <Image style={DryingMchartStyle.machineImage}
                        source={require("../../img/non_washing_machine.jpg")} />
                </TouchableOpacity>
                <TouchableOpacity
                    style={DryingMchartStyle.machine1}
                >
                    <Image style={DryingMchartStyle.machineImage}
                        source={require("../../img/non_washing_machine.jpg")} />
                </TouchableOpacity>
            </View>
            <View style={DryingMchartStyle.row}>
                <TouchableOpacity
                    style={DryingMchartStyle.machine}
                >
                    <Image style={DryingMchartStyle.machineImage}
                        source={require("../../img/non_washing_machine.jpg")} />
                </TouchableOpacity>
                <TouchableOpacity
                    style={DryingMchartStyle.machine1}
                >
                    <Image style={DryingMchartStyle.machineImage}
                        source={require("../../img/non_washing_machine.jpg")} />
                </TouchableOpacity>
            </View>
            <View style={DryingMchartStyle.row}>
                <TouchableOpacity
                    style={DryingMchartStyle.machine}
                >
                    <Image style={DryingMchartStyle.machineImage}
                        source={require("../../img/drying_machine.jpg")} />
                     <View style={DryingMchartStyle.overlay}>
                        <Text style={DryingMchartStyle.overlayText}>1</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    style={DryingMchartStyle.machine1}
                >
                    <Image style={DryingMchartStyle.machineImage}
                        source={require("../../img/non_washing_machine.jpg")} />
                </TouchableOpacity>
                <TouchableOpacity
                    style={DryingMchartStyle.machine2}
                >
                    <Image style={DryingMchartStyle.machineImage}
                        source={require("../../img/drying_machine.jpg")} />
                     <View style={DryingMchartStyle.overlay}>
                        <Text style={DryingMchartStyle.overlayText}>3</Text>
                    </View>
                </TouchableOpacity>
            </View>
            <View style={DryingMchartStyle.row}>
                <TouchableOpacity
                    style={DryingMchartStyle.machine}
                >
                    <Image style={DryingMchartStyle.machineImage}
                        source={require("../../img/drying_machine.jpg")} />
                     <View style={DryingMchartStyle.overlay}>
                        <Text style={DryingMchartStyle.overlayText}>2</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    style={DryingMchartStyle.machine1}
                >
                    <Image style={DryingMchartStyle.machineImage}
                        source={require("../../img/non_washing_machine.jpg")} />
                </TouchableOpacity>
                <TouchableOpacity
                    style={DryingMchartStyle.machine2}
                >
                    <Image style={DryingMchartStyle.machineImage}
                        source={require("../../img/drying_machine.jpg")} />
                    <View style={DryingMchartStyle.overlay}>
                        <Text style={DryingMchartStyle.overlayText}>4</Text>
                    </View>
                </TouchableOpacity>
            </View>
            <View style={DryingMchartStyle.blank}>
            </View>
        </View>
    );
}

