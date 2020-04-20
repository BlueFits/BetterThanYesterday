import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Header2Text, DefaultTextItalic } from "../../../controllers/TextController";

import Colors from "../../../constants/Colors";

const CompletedSteps = ({ title, deleteStep, completeStep }) => {
    return(
        <View style={styles.step}>
            <Header2Text style={styles.stepHeader}>{title}</Header2Text>
            <View style={styles.stepMarker}>
                <DefaultTextItalic style={styles.completedText}>Completed</DefaultTextItalic>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    step: {
        paddingVertical: 20,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    stepHeader: {
        //flex: 2,
        color: Colors.grey,
    },
    stepMarker: {
        flexDirection: "row",
    },
    completedText: {
        color: Colors.grey
    }

});

export default CompletedSteps;