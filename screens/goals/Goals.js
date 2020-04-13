import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons"

import { DefaultText, HeaderText } from "../../controllers/TextController";

import Touchable from "../../components/Touchable";

const Goals = ({ navigation }) => {

    function addAGoalHandler() {
        navigation.navigate("Add Goal");
    };

    return(
        <ScrollView>
        <View style={styles.screen}>
            <View style={styles.setGoals}>
                <View style={styles.goalsHeaderContainer}>
                    <HeaderText>GOALS</HeaderText>
                    <DefaultText>What do you want to become?</DefaultText>
                    <DefaultText>Set big goals!</DefaultText>
                </View>
                <View style={styles.goalsContainer}>
                    <DefaultText style={styles.goalList}>Sample</DefaultText>
                    <View style={styles.addAGoalButton}>
                        <Touchable onPress={addAGoalHandler}>
                            <View style={styles.addAGoalContainer}>
                                <Ionicons name="ios-add" size={22} />
                                <DefaultText>Add a goal</DefaultText>
                            </View>
                        </Touchable>
                    </View>
                </View>
                <View style={styles.emptyContainerForAllignment}></View>
            </View>
        </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    screen: {
        //empty
    },
    setGoals: {
        alignItems: "center",
        justifyContent: "space-between",
        borderWidth: 1,
        minHeight: "40%",
    },
    goalsHeaderContainer: {
        justifyContent: "center",
        alignItems: "center",
        height: 70,
    },
    addAGoalButton: {
        width: 110, 
        height: 35, 
        borderRadius: 17.5, 
        overflow: "hidden", 
        alignItems: "center", 
        justifyContent: "center",
    },
    addAGoalContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        width: "100%",
        height: "100%",
    },
    goalsContainer: {
        justifyContent: "center",
        alignItems: "center",
    },
    goalList: {
        marginVertical: 15,
    },
    emptyContainerForAllignment: {
        height: 35,
        borderWidth: 1,
    }
});

export default Goals;