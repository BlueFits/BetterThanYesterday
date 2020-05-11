import React from "react";
import { View, StyleSheet } from "react-native";
import { Bar } from "react-native-progress";
//CONSTANTS
import Colors from "../../../constants/Colors";

const ProgressBar = ({ currentTotalPercentage }) => {
    return (
        <Bar 
            progress={currentTotalPercentage} 
            width={null} 
            color={Colors.green}
        />
    );
};

const styles = StyleSheet.create({

});

export default ProgressBar;
