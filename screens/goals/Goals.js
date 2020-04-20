import React, { useState } from "react";
import { View, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSelector } from "react-redux";

import { DefaultText, HeaderText } from "../../controllers/TextController";

const Goals = ({ navigation }) => {

    //Initialize Variables
    const userGoals = useSelector(state => state.userReducer.goals);
    //const [completedGoals, setCompletedGoals] = useState(goalsFilterHandler(userGoals, "completed"));
    
    //Methods  
    function goalsFilterHandler(userGoals, goalStatus) {
        let filteredData = [];

        if (goalStatus === "current") {
            filteredData = userGoals.filter((goal) => {
                if (goal.status === "on-going") {
                    return true;
                } else {
                    return false;
                }
            });
        } else if (goalStatus === "completed") {
            filteredData = userGoals.filter((goal) => {
                if (goal.status === "completed") {
                    return true;
                } else {
                    return false
                }
            });
        }
        return filteredData;
    };

    function addAGoalHandler() {
        navigation.navigate("Add Goal");
    };

    function goalSelectHandler(goalId) {
        navigation.navigate("Edit Goal", {
            goalId
        });
    };

    return(
        <ScrollView>
        <View style={styles.screen}>
            <View style={styles.contentContainer}>
                <View style={{...styles.headerContainer}}>
                    <HeaderText>GOALS</HeaderText>
                    <DefaultText>What do you want to become?</DefaultText>
                    <DefaultText>Set big goals!</DefaultText>
                </View>
                <View style={styles.goalsContainer}>
                        {userGoals.map((goal, index) => {
                            if (goal.status === "on-going") {
                                return (
                                    <TouchableOpacity 
                                        key={"key:"+index} 
                                        style={styles.goalList} 
                                        onPress={goalSelectHandler.bind(this, goal.id)}
                                    >
                                        <DefaultText>{goal.goalName}</DefaultText>
                                    </TouchableOpacity>
                                );
                            }
                        })}
                    <View style={styles.addAGoalButton}>
                        <TouchableOpacity onPress={addAGoalHandler}>
                            <View style={styles.addAGoalContainer}>
                                <Ionicons name="ios-add" size={22} />
                                <DefaultText>Add a goal</DefaultText>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

            <View style={styles.contentContainer}>
                <View style={styles.headerContainer}>
                    <HeaderText>Completed</HeaderText>
                    <DefaultText>These are your completed goals.</DefaultText>
                    <DefaultText>Be proud!</DefaultText>
                </View>
                <View style={styles.goalsContainer}>
                        {userGoals.map((goal, index) => {
                            if (goal.status === "completed") {
                                return (
                                    <TouchableOpacity 
                                        key={"key:"+index} 
                                        style={styles.goalList} 
                                        onPress={goalSelectHandler.bind(this, goal.id)}
                                    >
                                        <DefaultText>{goal.goalName}</DefaultText>
                                    </TouchableOpacity>
                                );
                            }
                        })}
                </View>
            </View>
        </View>
        </ScrollView>
    );
};

//Style Constants
const listHeight = 40;

const styles = StyleSheet.create({
    screen: {
        //empty
    },
    contentContainer: {
        alignItems: "center",
        //borderWidth: 1,
    },
    headerContainer: {
        justifyContent: "center",
        alignItems: "center",
        height: 70,
    },
    goalsContainer: {
        //borderWidth: 1,
        marginVertical: 20,
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
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
    goalList: {
        height: listHeight,
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        //borderWidth: 1,
    },
});

export default Goals;