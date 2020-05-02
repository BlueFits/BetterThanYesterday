import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { DefaultText, Header2Text } from "../../../controllers/TextController";

const EditGoalStep = ({ title, deleteStep, completeStep }) => {
    return(
        <View style={styles.step}>
            <Header2Text style={styles.stepHeader}>{title}</Header2Text>
            <View style={styles.stepMarker}>
                <TouchableOpacity onPress={completeStep}>
                    <DefaultText style={styles.stepMarkerComplete}>Complete</DefaultText>
                </TouchableOpacity>
                <TouchableOpacity onPress={deleteStep}>
                    <DefaultText>Delete</DefaultText>
                </TouchableOpacity>
            </View>
        </View>
    );
};
//Bug if Header Text is too long
const styles = StyleSheet.create({
    step: {
        paddingVertical: 20,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    stepHeader: {
        //flex: 2,
    },
    stepMarker: {
        flexDirection: "row",
    },
    stepMarkerComplete: {
        marginRight: 20,
    },
});

export default EditGoalStep;