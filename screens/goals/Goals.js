import React from "react";
import { View, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { useSelector } from "react-redux";

import GoalsList from "../../components/local/goals/GoalsRender";

const Goals = ({ navigation }) => {

    //Initialize Variables
    const userGoals = useSelector(state => state.userReducer.goals);
    
    //Methods  
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
                <GoalsList 
                    goalsList={userGoals} 
                    header={"GOALS"} 
                    subHeader={"What do you want to become?"} 
                    subHeader2={"Set big goals!"}
                    goalSelect={goalSelectHandler}
                    goalStatus={"on-going"}
                    addAGoal={addAGoalHandler}
                />
                <GoalsList 
                    goalsList={userGoals} 
                    header={"COMPLETED"} 
                    subHeader={"These are your completed goals."} 
                    subHeader2={"Be proud!"}
                    goalSelect={goalSelectHandler}
                    goalStatus={"completed"}
                />
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    screen: {
        //empty
    },
});

export default Goals;