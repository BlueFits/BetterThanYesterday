import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { DefaultTextBold, SmallText, DefaultText } from "../../../controllers/TextController";
import moment from "moment";
import Touchable from "../../../components/Touchable";
import { Ionicons } from "@expo/vector-icons";
import Dialog from "../../Dialog";
import { useDispatch } from "react-redux";
import { updateTask } from "../../../store/actions/user";
import { capitalizeWords } from "../../../customFunctions/Validators";

const TaskList = ({ goal, selectedTask, selectedStep, toggleTaskList, toggleQuickAdd, shownTaskList, shownQuickAdd, index, quickAddVisibility }) => {
    //Initialize
    const dispatch = useDispatch();
    //Functions
    function addHandler(task) {
        const currentDate = moment().format("MMMM Do YYYY");
        dispatch(updateTask(goal._id, selectedStep._id, capitalizeWords(task), currentDate));
        toggleQuickAdd();
    };

    //Conditionals
    let shownTaskElement = null;
    let shownQuickAddElement = null;
    let quickAddRender = null;
    if (quickAddVisibility) {
        quickAddRender = (
            <TouchableOpacity onPress={() => toggleQuickAdd()}>
                <View style={styles.quickAddContainer}>
                    <View style={styles.quickAddIconContainer}>
                        <Ionicons name="ios-add" size={24} />
                    </View>
                        <View>
                            <DefaultText>Quick add</DefaultText>
                        </View>
                </View>
            </TouchableOpacity>
        );
    }
    if (shownTaskList["KeyForHomeGoals"+index]) {
        shownTaskElement = (
            <View>
                {selectedTask.tasksList.map((task, index) => {
                    return (
                        <View key={"selectedTaskKeyFor:" + index} style={styles.taskList}>
                            <View style={styles.checkContainer}>
                                <Ionicons name="ios-checkmark" size={24} color={"#fff"} />   
                            </View>
                            <View style={styles.taskTextContainer}>
                                <DefaultText>{task}</DefaultText>
                            </View>
                        </View> 
                    );
                })}
                {quickAddRender}
            </View>
        );
    }
    if (shownQuickAdd["KeyForHomeGoals"+index]) {
        shownQuickAddElement = (
            <Dialog 
                title="Quick add"
                labelRight="Add"
                labelLeft="Cancel"
                labelLeftHandler={() => toggleQuickAdd()} 
                labelRightHandler={addHandler} 
                visibility={true}
            />
        );
    }
    //Render
    return (
        <View>
                <Touchable onPress={toggleTaskList}>
                    <View style={styles.listItem}>
                        <View> 
                            <DefaultTextBold>{selectedStep.stepName}</DefaultTextBold>
                            <View style={styles.goalContainer}>
                                <View style={{...styles.colorIndicator, backgroundColor: goal.goalColor}}></View>
                                <SmallText>{goal.goalName}</SmallText>
                            </View>
                        </View>
                        <View>
                            <DefaultTextBold>{selectedTask.tasksList.length}</DefaultTextBold>
                        </View>
                    </View>
                </Touchable>         
                {shownTaskElement}
                {shownQuickAddElement}
            </View>
    );
};

//Constant Styles
const taskSpacing = 13;
const taskSpacingHorizontal = 20;

const styles = StyleSheet.create({
    taskList: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: taskSpacing,
        paddingLeft: 15,
        marginHorizontal: taskSpacingHorizontal,
    },
    quickAddContainer: {
        flexDirection: "row",
        paddingVertical: taskSpacing,
        paddingLeft: 15,
        marginHorizontal: taskSpacingHorizontal,
    },
    listItem: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: taskSpacing,
        paddingHorizontal: taskSpacingHorizontal,
    },
    checkContainer: {
        marginRight: 5,
        backgroundColor: "#2ecc71",
        height: 20,
        width: 20,
        borderRadius: 10,
        justifyContent: "center",
        alignItems:"center",
    },
    goalContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    colorIndicator: {
        height: 9,
        width: 9,
        borderRadius: 5,
        marginRight: 5,
    },
    quickAddIconContainer: {
        height: 20,
        width: 20,
        justifyContent: "center",
        alignItems: "center",
        marginRight: 5,
    },
});

export default TaskList;