import React from "react";
import { View, StyleSheet, TouchableOpacity, ScrollView, Dimensions } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { DefaultText, HeaderText } from "../../controllers/TextController";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import Swipeable from "react-native-swipeable-row";
import Colors from "../../constants/Colors";
import Touchable from "../../components/Touchable";
import GoalList from "../../components/GoalsList";
import { updateGoal } from "../../store/actions/user";

const Goals = ({ navigation }) => {

    const dispatch = useDispatch();
    const userId = useSelector(state => state.userReducer._id);
    const userGoals = useSelector(state => state.userReducer.goals);
    const goalState = useSelector(state => state.goalsNavigationReducer);    
    //Renders
    let addAGoal = null;
    if (goalState.destination === "active") {
        addAGoal = (
            <View style={styles.addAgoalTouchableContainer}>
                <Touchable onPress={() => {
                    navigation.navigate("Add Goal");
                }}>
                <View style={styles.addAgoalContainer}>
                    <Ionicons name="ios-add" size={22} color={Colors.grey} />
                    <DefaultText style={{ color: Colors.grey }}>Add a goal</DefaultText>
                </View>
                </Touchable>
            </View>
        );
    }    

    //Handlers
    function goalSelectHandler(goalId) {
        navigation.navigate("Edit Goal", {
            goalId
        });
    };

    function deleteGoalHandler(goalId) {
        dispatch(updateGoal(goalId, "deleteGoal", "", userId));
    };

    return(
        <ScrollView style={{ backgroundColor: "#fff" }}>
        <View style={styles.screen}>
            <View style={styles.listContainer}>
                <View style={styles.header}>
                    <HeaderText>{goalState.header}</HeaderText>
                    <DefaultText>{goalState.subHeaderOne}</DefaultText>
                    <DefaultText>{goalState.subHeaderTwo}</DefaultText>
                </View>

                {userGoals.map((goal, index) => {
                    if (goal.status === goalState.goalStatus) {
                        return (
                            <Swipeable 
                                key={"GoalKey:"+index}
                                rightActionActivationDistance={250}
                                onRightActionRelease={deleteGoalHandler.bind(this, goal._id)}
                                rightButtons={[
                                    <TouchableOpacity onPress={deleteGoalHandler.bind(this, goal._id)}>
                                        <View style={styles.rightSwipeButton}>
                                            <View style={styles.rightSwipeIcon}>
                                                <MaterialIcons name="delete" size={23} color="#fff"/>
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                ]}
                            >
                            <GoalList 
                                goalName={goal.goalName}
                                stepsLength={goal.steps.length}
                                startDate={goal.startDate}
                                customStyles={{ backgroundColor: goal.goalColor }}
                                onPress={goalSelectHandler.bind(this, goal._id)}
                            />
                            </Swipeable>
                        );
                    }
                })}
            </View>
            {addAGoal}
        </View>
        </ScrollView>
    );
};

//Style Constants
const containerPadding = 20;

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: "#fff",
    },
    header: {
        height: 120,
        justifyContent: "center",
    },
    listContainer: {
        paddingHorizontal: containerPadding
    },
    addAgoalTouchableContainer: {
        paddingHorizontal: containerPadding,
        overflow: "hidden",
        paddingHorizontal: 15, 
    },
    addAgoalContainer: {
        flexDirection: "row",
        paddingVertical: 15,
    },
    renderHiddenItemStyles: {
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: "center",
    },
    deleteContainer: {
        height: "100%",
        width: "100%",
        justifyContent: "center",
        paddingHorizontal: 10,
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
    },
    rightSwipeButton: {
        backgroundColor: "#e74c3c",
        height: 68,
        justifyContent: "center",
        marginLeft: containerPadding,
    },
    rightSwipeIcon: {
        height: 68, 
        width: 68, 
        justifyContent: "center", 
        alignItems: "center"
    },
});

export default Goals;