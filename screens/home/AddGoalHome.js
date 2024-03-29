import React from "react";
import { View, StyleSheet } from "react-native";
import { DefaultText, Header2Text } from "../../controllers/TextController";
import { useSelector } from "react-redux";
//Custom Components
import GoalList from "../../components/GoalsList";

function AddTasks({ navigation }) {

    const userGoals = useSelector(state => state.userReducer.goals);

    //Functions
    function chooseTaskHandler(goalId) {
        navigation.navigate("ChooseStep", { goalId });
    };

    return (
        <View style={styles.screen}>
            <View>
                <Header2Text>Your Goals</Header2Text>
                <View style={{ width: "80%" }}>
                    <DefaultText>
                        These are the goals that you set for  yourself.
                        Pick a goal that you did recently.
                    </DefaultText>
                </View>
            </View>

            <View>
                {userGoals.map((goal, index) => {
                    if (goal.status === "on-going") {
                        return (
                            <GoalList 
                                key={"KeyFor:"+goal+index}
                                goalName={goal.goalName}
                                stepsLength={goal.steps.filter(step => !step.isComplete ? true : false).length}
                                startDate={goal.startDate}
                                customStyles={{ backgroundColor: goal.goalColor }}
                                onPress={chooseTaskHandler.bind(this, goal._id)}
                            />
                        );
                    }
                })}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: "#fff",
        paddingHorizontal: 20,
    },
});

export default AddTasks;