import React, { useEffect } from "react";
import { View, StyleSheet, Text, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSelector } from "react-redux";

import { DefaultText, HeaderText } from "../../controllers/TextController";

import Touchable from "../../components/Touchable";

const Goals = ({ navigation, route }) => {

    //Initialize Variables
    const userGoals = useSelector(state => state.userReducer.goals);
    
    //Methods  
    function addAGoalHandler() {
        navigation.navigate("Add Goal");
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
                            return (
                            <View key={"key:"+index} style={styles.goalList}>
                                <DefaultText>{goal.goalName}</DefaultText>
                            </View>
                            );
                        })}
                    <View style={styles.addAGoalButton}>
                        <Touchable onPress={addAGoalHandler}>
                            <View style={styles.addAGoalContainer}>
                                <Ionicons name="ios-add" size={22} />
                                <DefaultText>Add a goal</DefaultText>
                            </View>
                        </Touchable>
                    </View>
                </View>
            </View>

            <View style={styles.contentContainer}>
                <View style={styles.headerContainer}>
                    <HeaderText>Completed</HeaderText>
                    <DefaultText>These are your completed goals.</DefaultText>
                    <DefaultText>Be proud!</DefaultText>
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