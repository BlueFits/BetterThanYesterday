import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
//Custom Component
import Touchable from "../../components/Touchable";
//Controllers
import { DefaultText, Header2Text, DefaultTextBold } from "../../controllers/TextController";
//Constants
import Colors from "../../constants/Colors";

const chooseStep = ({ navigation, route }) => {
    //Route Params
    const { goalId } = route.params
    //Initialize variables
    const userGoals = useSelector(state => state.userReducer.goals);
    const selectedGoal = userGoals.find(goal => goal.id === goalId);
    //functions
    function chooseStepHandler(stepId) {
        navigation.navigate("AddTask", { goalId, stepId });
    };
    //Custom Options
    navigation.setOptions({
        title: selectedGoal.goalName,
        headerStyle:{
            backgroundColor: selectedGoal.goalColor,
        },
        headerTitleStyle: {
            color: "#fff"
        },
    });
    //Outside renders
    const stepList = (
        <View style={styles.touchableContainer}>
                <Touchable>
                    <View style={{ paddingVertical: 20, }}>
                        <DefaultTextBold>Active Ideation</DefaultTextBold>
                    </View>
                </Touchable>
            </View>
    );
    return(
    <View style={styles.screen}>
        <View style={styles.header}>
            <Header2Text>Steps</Header2Text>
            <View>
                <DefaultText>
                    These are the related steps within your set goals,
                    choose a step that you have accomplished today.
                </DefaultText>
            </View>
        </View>

        <View>
            {selectedGoal.stepsArrayOfObjects.map((step ,index) => {
                return(
                    <View key={"keyFor:"+step+":"+index} style={styles.touchableContainer}>
                        <Touchable onPress={chooseStepHandler.bind(this, step.id)}>
                            <View style={{ paddingVertical: 20, }}>
                                <DefaultTextBold>{step.stepName}</DefaultTextBold>
                            </View>
                        </Touchable>
                    </View>
                );
            })}
        </View>
    </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        paddingHorizontal: 20,
    },
    header: {
        paddingVertical: 20,
    },
    touchableContainer: {
        borderBottomWidth: 1,
        borderColor: Colors.lightgrey,
    },
});

export default chooseStep;