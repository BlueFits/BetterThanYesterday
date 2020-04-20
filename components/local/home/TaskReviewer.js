import React from "react";
import { View, StyleSheet } from "react-native";

//Controller
import { DefaultText, HeaderText } from "../../../controllers/TextController";


const TaskReviewer = (props) => {

    let homeTodayContent = (
        <View style={styles.tasks}>
            <DefaultText>
                Add a goal in the goals section and hit the add icon on the bottom left to start 
                recording your tasks.
            </DefaultText>
        </View>
    );

    return(
        <View style={styles.todaysAchievements}>
            <View style={styles.todaysHeader}>
                <HeaderText style={styles.todayHeaderText}>{props.title.toUpperCase()}'S ACHIEVEMENTS</HeaderText>
                <View style={styles.progressIndicator}>
                    <View style={styles.progressIndicatorTexts}>
                        <DefaultText>Start your journey!</DefaultText>
                        <DefaultText>0</DefaultText>
                    </View>
                    <View>
                        <DefaultText>ProgressBar</DefaultText>
                    </View>
                </View>
            </View>
            { homeTodayContent }
        </View>
    );
};

const styles = StyleSheet.create({
    todaysAchievements: {
        
    },
    todaysHeader: {
        marginBottom: 15,
    },
    todayHeaderText: {
        paddingBottom: 5,
    },
    progressIndicator: {
    },
    progressIndicatorTexts: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    tasks: {
        paddingBottom: 15,
    },
});

export default TaskReviewer;