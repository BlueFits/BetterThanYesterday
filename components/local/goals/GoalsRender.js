import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { HeaderText, DefaultText } from "../../../controllers/TextController";
import { Ionicons } from "@expo/vector-icons";

const GoalsRender = ({ header, goalsList, subHeader, subHeader2, goalSelect, goalStatus, addAGoal }) => {
    //Conditional Renders
    let addAGoalElement = null;
    if (goalStatus === "on-going") {
        addAGoalElement = (
            <View style={styles.addAGoalButton}>
                <TouchableOpacity onPress={addAGoal}>
                    <View style={styles.addAGoalContainer}>
                        <Ionicons name="ios-add" size={22} />
                        <DefaultText>Add a goal</DefaultText>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
    return(
        <View style={styles.contentContainer}>
            <View style={styles.headerContainer}>
                <HeaderText>{header}</HeaderText>
                <DefaultText>{subHeader}</DefaultText>
                <DefaultText>{subHeader2}</DefaultText>
            </View>
            <View style={styles.goalsContainer}>
                    {goalsList.map((goal, index) => {
                        if (goal.status === goalStatus) {
                            return (
                                <TouchableOpacity 
                                    key={"key:"+index} 
                                    style={styles.goalList} 
                                    onPress={goalSelect.bind(this, goal.id)}
                                >
                                    <DefaultText>{goal.goalName}</DefaultText>
                                </TouchableOpacity>
                            );
                        }
                    })}
            </View>
            {addAGoalElement}
        </View>
    );
}

//Styling Constant
const listHeight = 40;
const headerGoalsSpacing = 10;

const styles = StyleSheet.create({
    contentContainer: {
        alignItems: "center",
        //borderWidth: 1,
    },
    headerContainer: {
        justifyContent: "center",
        alignItems: "center",
        height: 70,
        marginTop: headerGoalsSpacing,
    },
    goalsContainer: {
        //borderWidth: 1,
        marginVertical: headerGoalsSpacing,
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
    },
    goalList: {
        height: listHeight,
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
    },
    addAGoalButton: { 
        height: listHeight, 
        width: "100%",
    },
    addAGoalContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100%",
    },
});

export default GoalsRender;