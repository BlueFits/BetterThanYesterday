import React, { useState, useEffect } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
//Custom Components
import Touchable from "../../components/Touchable";
import Header from "../../components/local/home/Header";
import Footer from "../../components/local/home/Footer";
import Tasks from "../../components/local/home/Tasks";
//Controller
import { DefaultText } from "../../controllers/TextController";
//Constants
import Colors from "../../constants/Colors";
//reducer
import { useSelector } from "react-redux";

const Home = ({ navigation }) => {
    //Global States
    const homeState = useSelector(state => state.homeNavigationReducer); 
    const homeGoals = useSelector(state => state.userReducer.goals);
    //Ui information Dependencies
    const [currentIndicatorText, setCurrentIndicatorText] = useState(progressIndicatorText());
    const [currentTotalPoints, setCurrentTotalPoints] = useState(totalTaskList("current"));
    const [previousTotalPoints, setPreviousTotalPoints] = useState(totalTaskList("previous"));
    const [currentTotalPercentage, setCurrentTotalPercentage] = useState(percentageValidator());
    //Task dependencies
    const [listIndexes, setListIndexes] = useState(taskListInfo());
    const [prevListIndex, setPrevListIndex] = useState(previousTaskListInfo());
    //React Hooks
    useEffect(() => {
        setListIndexes(taskListInfo());
        setPrevListIndex(previousTaskListInfo());
        setCurrentTotalPoints(totalTaskList("current"));
        setPreviousTotalPoints(totalTaskList("previous"));
        setCurrentIndicatorText(progressIndicatorText());
        setCurrentTotalPercentage(percentageValidator());
    }, [homeGoals, homeState]);
    //Functions
    function taskListInfo() {
        let info = [];
        for (let i = 0; i < homeGoals.length; i++) {
            let selectedGoal = homeGoals[i];
            let selectedStep = selectedGoal.stepsArrayOfObjects;
            for (let z = 0; z < selectedStep.length; z++) {
                let selectedTask = selectedStep[z].tasks;
                for (let x = 0; x < selectedTask.length; x++) {
                    if (selectedTask[x].taskDate === homeState.currentDate) {
                        //Show it
                        info.push({
                            goalIndex: i,
                            stepIndex: z,
                            taskIndex: x,
                        });
                    }
                }
            }
        };
        return info;
    };
    
    function previousTaskListInfo() {
        let info = [];
        for (let i = 0; i < homeGoals.length; i++) {
            let selectedGoal = homeGoals[i];
            let selectedStep = selectedGoal.stepsArrayOfObjects;
            for (let z = 0; z < selectedStep.length; z++) {
                let selectedTask = selectedStep[z].tasks;
                for (let x = 0; x < selectedTask.length; x++) {
                    if (selectedTask[x].taskDate === homeState.previousDate) {
                        //Show it
                        info.push({
                            goalIndex: i,
                            stepIndex: z,
                            taskIndex: x,
                        });
                    }
                }
            }
        };
        return info;
    };

    function totalTaskList(status) {
        if (status === "current") {
            let accumulator = 0;
            for (const goal of homeGoals) {
                for (const step of goal.stepsArrayOfObjects) {
                    for (const task of step.tasks) {
                        if (task.taskDate === homeState.currentDate) {
                            accumulator = accumulator + task.tasksList.length;
                        }
                    }
                }
            }
            return accumulator;
        } else {
            let accumulator = 0;
            for (const goal of homeGoals) {
                for (const step of goal.stepsArrayOfObjects) {
                    for (const task of step.tasks) {
                        if (task.taskDate === homeState.previousDate) {
                            accumulator = accumulator + task.tasksList.length;
                        }
                    }
                }
            }
            return accumulator;
        }
    };

    function progressIndicatorText() {
        const currentTotalPoints = totalTaskList("current");
        const previousTotalPoints = totalTaskList("previous");
        if ((currentTotalPoints === 0) && (previousTotalPoints === 0)) {
            return (
                <DefaultText>
                    Start your journey!
                </DefaultText>
            );
        }
        else if (currentTotalPoints < previousTotalPoints) {
            return (
                <DefaultText>
                    Keep up with the yesterday you!
                </DefaultText>
            );
        } else if (currentTotalPoints && (previousTotalPoints === 0)) {
            return (
                <DefaultText>
                    Congratulations on taking your first steps!
                </DefaultText>
            );
        } else if (currentTotalPoints >= previousTotalPoints) {
            return (
                <DefaultText>
                    Nice! Now become even better!
                </DefaultText>
            );
        }
    };

    function percentageValidator() {
        const currentPoints = totalTaskList("current");
        const previousPoints = totalTaskList("previous");
        if ((!currentPoints) && (!previousPoints)) {
            return 0;
        }
        else if (currentPoints && (!previousPoints)) {
            return currentPoints/20;
        }
        else if ((!currentPoints && previousPoints) || (currentPoints && previousPoints)) {
            return currentPoints/previousPoints;
        }
        else {
            console.warn("Error in percentage Validator")
            return;
        }
    };
    
    return (
        <View style={styles.screen}>
            <ScrollView>
                <Header
                    homeState={homeState}
                    currentIndicatorText={currentIndicatorText}
                    currentTotalPoints={currentTotalPoints}
                    previousTotalPoints={previousTotalPoints}
                    currentTotalPercentage={currentTotalPercentage}
                />
                <Tasks 
                    listIndexes={listIndexes}
                    homeGoals={homeGoals}
                    header={homeState.header}
                    quickAddVisibility={true}
                    navigation={navigation}
                />
                <Footer 
                    homeState={homeState}
                    prevListIndex={prevListIndex}
                    previousTotalPoints={previousTotalPoints}
                />
                <Tasks
                    listIndexes={prevListIndex}
                    homeGoals={homeGoals}
                    header={homeState.header2}
                    quickAddVisibility={false}
                    navigation={navigation}
                />
            </ScrollView>               
            <View style={styles.addButtonContainer}>
                <Touchable onPress={() => navigation.navigate("AddGoal")}>
                    <View style={{ width: "100%", height: "100%", justifyContent: "center", alignItems: "center" }}>
                    <Ionicons name="ios-add" size={32} color="#fff"/>
                    </View>
                </Touchable>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: "#fff",
    },
    addButtonContainer: {
        position: "absolute",
        bottom: 15,
        right: 0,
        height: 56,
        width: 56,
        borderRadius: 28,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        overflow: "hidden",
        backgroundColor: Colors.primary,
        right: 30,
    },
});

export default Home;