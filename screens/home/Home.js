import React, { useEffect, useReducer, useState, useCallback } from "react";
import { View, StyleSheet, ScrollView, ActivityIndicator } from "react-native";
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
import { useSelector, useDispatch } from "react-redux";
//Actions
import { fetchUser } from "../../store/actions/user";

const Home = ({ navigation }) => {
    //Hooks
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false); 
    //Global States
    const homeState = useSelector(state => state.homeNavigationReducer); 
    const homeGoals = useSelector(state => state.userReducer.goals);
    //List Indexes
    const [listState, listDispatch] = useReducer(listAction, {
        currentIndex: taskListInfo(homeGoals, homeState),
        previousIndex: previousTaskListInfo(homeGoals, homeState),
    }); 
    //Ui info states
    const [uiState, uiDispatch] = useReducer(uiAction, {
        currentIndicatorText: progressIndicatorText(homeGoals, homeState),
        currentTotalPoints: totalTaskList("current", homeGoals, homeState),
        previousTotalPoints: totalTaskList("previous", homeGoals, homeState),
        currentTotalPercentage: percentageValidator(homeGoals, homeState),
    });

    //React Hooks
    //DEBUGGING PURPOSES *TEMPORARY
    const loadUser = useCallback(async () => {
        setIsLoading(true);
        await dispatch(fetchUser());
        setIsLoading(false);
    }, [dispatch, setIsLoading]);

    useEffect(() => {
        loadUser();
    }, [loadUser]);
    //End
    useEffect(() => {
        uiDispatch({ type: "currentIndicatorText"});
        uiDispatch({ type: "currentTotalPoints"});
        uiDispatch({ type: "previousTotalPoints"});
        uiDispatch({ type: "currentTotalPercentage"});
        listDispatch({ type: "currentIndex" });
        listDispatch({ type: "previousIndex" });
    }, [homeGoals, homeState]);
    //Local Reducers
    function uiAction(state, action) {
        switch (action.type) {
            case "currentIndicatorText":
                return {...state, currentIndicatorText: progressIndicatorText(homeGoals, homeState)}
            case "currentTotalPoints":
                return {...state, currentTotalPoints: totalTaskList("current", homeGoals, homeState)}
            case "previousTotalPoints":
                return {...state, previousTotalPoints: totalTaskList("previous", homeGoals, homeState)}
            case "currentTotalPercentage":
                return {...state, currentTotalPercentage: percentageValidator(homeGoals, homeState)}
            deafult: 
                throw new Error("error in uiInformation");
        }
    };
    
    function listAction(state, action) {
        switch (action.type) {
            case "currentIndex":
                return {...state, currentIndex: taskListInfo(homeGoals, homeState)}
            case "previousIndex":
                return {...state, previousIndex: previousTaskListInfo(homeGoals, homeState)}
            default:
                throw new Error("Error in listAction");
        };
    };
    //Run this while waiting for dipatch
    if (isLoading) {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <ActivityIndicator size="large" color={Colors.primary} />
            </View>
        );
    }

    return (
        <View style={styles.screen}>
            <ScrollView>
                <Header
                    homeState={homeState}
                    currentIndicatorText={uiState.currentIndicatorText}
                    currentTotalPoints={uiState.currentTotalPoints}
                    previousTotalPoints={uiState.previousTotalPoints}
                    currentTotalPercentage={uiState.currentTotalPercentage}
                />
                <Tasks 
                    listIndexes={listState.currentIndex}
                    homeGoals={homeGoals}
                    header={homeState.header}
                    quickAddVisibility={true}
                    navigation={navigation}
                />
                <Footer 
                    homeState={homeState}
                    prevListIndex={listState.previousIndex}
                    previousTotalPoints={uiState.previousTotalPoints}
                />
                <Tasks
                    listIndexes={listState.previousIndex}
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

//Functions
function taskListInfo(homeGoals, homeState) {
    let info = [];
    for (let i = 0; i < homeGoals.length; i++) {
        let selectedGoal = homeGoals[i];
        let selectedStep = selectedGoal.steps;
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

function previousTaskListInfo(homeGoals, homeState) {
    let info = [];
    for (let i = 0; i < homeGoals.length; i++) {
        let selectedGoal = homeGoals[i];
        let selectedStep = selectedGoal.steps;
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

function totalTaskList(status, homeGoals, homeState) {
    if (status === "current") {
        let accumulator = 0;
        for (const goal of homeGoals) {
            for (const step of goal.steps) {
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
            for (const step of goal.steps) {
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

function progressIndicatorText(homeGoals, homeState) {
    const currentTotalPoints = totalTaskList("current", homeGoals, homeState);
    const previousTotalPoints = totalTaskList("previous", homeGoals, homeState);
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

function percentageValidator(homeGoals, homeState) {
    const currentPoints = totalTaskList("current", homeGoals, homeState);
    const previousPoints = totalTaskList("previous", homeGoals, homeState);
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

export default Home;