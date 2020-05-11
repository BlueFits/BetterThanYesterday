import React, { useState } from "react";
import { View, StyleSheet, TextInput, TouchableWithoutFeedback, Keyboard } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
//Controller
import { DefaultText, Header2Text } from "../../controllers/TextController";
//Constants
import Colors from "../../constants/Colors";
//Custom Components
import Touchable from "../../components/Touchable";
//Custom Functions
import { capitalizeWords } from "../../customFunctions/Validators";
//Redux Actions
import { updateTask } from "../../store/actions/user";

const AddTask = ({ navigation, route }) => {
    //Route Declares
    const { goalId, stepId } = route.params;
    //Variables
    const dispatch = useDispatch();
    //Select goals
    const userGoals = useSelector(state => state.userReducer.goals);
    const selectedGoal = userGoals.find(goal => goal._id === goalId);
    const selectedStep = selectedGoal.steps.find(step => step._id === stepId);
    //States
    const [task, setTask] = useState(null);
    //Handlers
    function taskInputHandler(text) {
        setTask(text);
    };

    function submitHandler() {
        if (task === null) {
            Keyboard.dismiss();
        } else {
            const currentDate = moment().format("MMMM Do YYYY");
            dispatch(updateTask(goalId, stepId, capitalizeWords(task), currentDate));
            navigation.navigate("Home");
        }
    };
    //dynamic options
    navigation.setOptions({
        headerStyle: {
            backgroundColor: selectedGoal.goalColor,
        },
        headerTitleStyle: {
            color: "#fff",
        },
        title: selectedStep.stepName.length <= 15 ? `${selectedGoal.goalName} / ${selectedStep.stepName}`: `${selectedGoal.goalName} / ${selectedStep.stepName.substring(0, 15)}...`,
    });
    
    return(
        <TouchableWithoutFeedback touchSoundDisabled={true} onPress={() => Keyboard.dismiss()}>
            <View style={styles.screen}>
                <View>
                    <View style={styles.header}>
                        <Header2Text>Task</Header2Text>
                        <View>
                            <DefaultText>
                                Be specific, after choosing a step, you wan to specify exactly
                                what you did related to that step. For example, after choosing
                                "Eating Healthy" in the previous page, you can write: "Breakfast
                                ate was under 500 calories".
                            </DefaultText>
                        </View>
                    </View>

                    <View>
                        <TextInput 
                            style={styles.input} 
                            value={task} 
                            onChangeText={taskInputHandler}
                            selectionColor="white"
                            autoFocus={true}
                            autoCapitalize="words"
                            autoCorrect
                            onSubmitEditing={submitHandler}
                            placeholder="Write what task you did to this step"
                        />
                    </View>
                </View>

                <View style={styles.finishButtonTouchableContainer}>
                    <Touchable onPress={submitHandler}>
                        <View style={{...styles.finishButtonContainer, backgroundColor: selectedGoal.goalColor}}>
                            <DefaultText style={{ color: "#fff" }}>Finish</DefaultText>
                        </View>
                    </Touchable>
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 20,
    },
    header: {
        paddingVertical: 20,
    },
    input: {
        borderWidth: 1,
        padding: 8,
        borderRadius: 10,
        backgroundColor: Colors.lightgrey,
        borderColor: Colors.lightGreyOutline,
    },
    finishButtonTouchableContainer: {
        borderRadius: 20,
        overflow: "hidden",
        marginVertical: 30,
    },
    finishButtonContainer: {
        paddingVertical: 10,
        paddingHorizontal: 60,
    },
});

export default AddTask;