import React from "react";
import { View, StyleSheet } from "react-native";
import { DefaultTextBold, SmallText } from "../controllers/TextController"
import Colors from "../constants/Colors";
import Touchable from "../components/Touchable";

const GoalsList = ({ goalName, stepsLength, customStyles, startDate, onPress }) => {
    return(
        <Touchable onPress={onPress}>
            <View style={styles.goalContainer}>
                <View style={styles.goalContainerChildren}>
                    <View style={styles.goalTitleContainer}>
                        <View style={[styles.color, customStyles]}></View>
                        <View style={styles.goalName}>
                            <DefaultTextBold style={{ flexGrow: 1, }}>{goalName}</DefaultTextBold>
                        </View>
                    </View>
                    <SmallText>{stepsLength} Steps</SmallText>
                </View>
                <View style={{ ...styles.goalContainerChildren, alignItems: "flex-end" }}>
                    <SmallText>Start Date: {startDate}</SmallText>
                </View>
            </View>
        </Touchable>
    );
};

const styles = StyleSheet.create({
    goalContainer: {
        borderBottomWidth: 1,
        borderColor: Colors.lightgrey,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#fff",
        height: 68,
        width: "100%",
    },
    goalTitleContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    color: {
        width: 9, 
        height: 9, 
        borderRadius: 5, 
        backgroundColor: "red", 
        marginRight: 5 
    },
    goalContainerChildren: { 
        width: "50%" 
    },
    goalName : { width: "85%" },   
});

export default GoalsList;