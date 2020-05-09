import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { DefaultText } from "../../../controllers/TextController";
import TaskList from "./TaskList";

const Tasks = ({ listIndexes, homeGoals, header, quickAddVisibility, navigation }) => {
    //States
    const [shownTaskList, setShownTaskList] = useState({});
    const [shownQuickAdd, setShownQuickAdd] = useState(false);
    //Fixes deletion Bug at home
    useEffect(() => {
        return navigation.addListener("blur", () => {
            setShownTaskList({});
        });
    },[navigation]);
    //Functions
    function toggleTaskList(id) {
        setShownTaskList((prevShownTaskList) => {
            return {
                ...prevShownTaskList,
                [id]: !prevShownTaskList[id],
            };
        });
    };

    function toggleQuickAdd(id) {
        setShownQuickAdd((prevShownQuickAdd) => {
            return {
                ...prevShownQuickAdd,
                [id]: !prevShownQuickAdd[id],
            };
        });
    };
    //Placeholders
    const emptyGoalContent = (
        <View style={styles.taskPlaceholder}>
            <DefaultText>
                You have no entries for {header.toLowerCase()}.
            </DefaultText>
        </View>
    );
    return (
        <View>
            {listIndexes.length === 0 ? emptyGoalContent : <View></View>}
            {homeGoals.map((goal, goalIndex) => {
                return listIndexes.map((item, itemIndex) => {
                    if (item.goalIndex === goalIndex) {
                    if (goal.steps.length === 0) {
                            return <View></View>;
                    } else {
                        const selectedStep = goal.steps[item.stepIndex];
                        const selectedTask = goal.steps[item.stepIndex].tasks[item.taskIndex];
                    return (
                            <TaskList 
                                key={"KeyForItemIndex"+itemIndex}
                                toggleTaskList={toggleTaskList.bind(this, "KeyForHomeGoals"+itemIndex)}
                                toggleQuickAdd={toggleQuickAdd.bind(this, "KeyForHomeGoals"+itemIndex)}
                                selectedStep={selectedStep}
                                goal={goal}
                                selectedTask={selectedTask}
                                shownTaskList={shownTaskList}
                                shownQuickAdd={shownQuickAdd}
                                index={itemIndex}
                                quickAddVisibility={quickAddVisibility}
                            />
                        );
                    }
                    }
                })
            })}
        </View>
    );
};

const paddingConstant = 20;
const styles = StyleSheet.create({
    taskPlaceholder: {
        paddingVertical: 20,
        paddingHorizontal: paddingConstant,
    },
});

export default Tasks;