import React, { useState } from "react";
import { View, StyleSheet, TextInput, TouchableWithoutFeedback, Keyboard } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useSelector, useDispatch } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import {
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
} from 'react-native-popup-menu';

//Model Import
import StepModel from "../../models/step";

//Custom Components
import Step from "../../components/local/goals/EditGoalStep";
import CSteps from "../../components/local/goals/CompletedSteps";

//Header Custom Component
import CustomBackButton from "../../components/HeaderButtonDark";
import OptionsHeaderButton from "../../components/HeaderButtonDarkSimpleLineIcons";

//Controllers
import { DefaultText, SmallText, HeaderText, SmallTextItalic } from "../../controllers/TextController";

//Constants
import Colors from "../../constants/Colors";

//Redux reducers
import { udpateStep, addStep, updateGoal } from "../../store/actions/user";

const EditGoal = ({ navigation, route }) => {
    //Initialize variables
    const dispatch = useDispatch();
    const { goalId, goalNameFromAddPage } = route.params;
    //Dynamic data
    let selectedGoal = useSelector(state => state.userReducer.goals.find((goal) => goal.id === goalId));
    if (goalNameFromAddPage) {
        selectedGoal = useSelector(state => state.userReducer.goals.find((goal) => goal.goalName === goalNameFromAddPage));
    }
    //Deconstruct needed variables
    const { goalName, startDate, status, stepsArrayOfObjects, id } = selectedGoal;
    //Initialize States
    const [steps, setSteps]= useState(stepFilter(stepsArrayOfObjects, "current"));
    const [completedSteps, setCompletedSteps] = useState(stepFilter(stepsArrayOfObjects, "completed"));
    const [addAStepText, setAddAStepText] = useState(null);
    const [stepIsValid, setStepIsValid] = useState(null);

    //Methods
    //Filter for stepArray
    function stepFilter(stepData, stepStatus) {
        let filteredData = null;
        if (stepStatus === "current") {
            filteredData = stepData.filter((step) => {
                if (!step.isComplete) {
                    return true;
                } else {
                    return false;
                }
            });
        }
        else if (stepStatus === "completed") {
            filteredData = stepData.filter((step) => {
                if (!step.isComplete) {
                    return false;
                } else {
                    return true;
                }
            });
        }
        return filteredData;
    };

    function markAsCompletedHandler() {
        dispatch(updateGoal(id));
        navigation.popToTop();
    };
    
    function renameGoalHandler() {
        //Use Menu Slide
        alert();
    };

    function deleteStepHandler(goalName, stepId, stepIndex, updateAction) {
        const stepSnapShot = [...steps];
        stepSnapShot.splice(stepIndex, 1);
        setSteps(stepSnapShot);
        dispatch(udpateStep(goalName, stepId, updateAction));
    };

    function completeStepHandler(goalName, stepId, stepIndex, updateAction) {
        const stepSnapShot = steps.concat(completedSteps);
        //Amazing insight from stackOverflow
        stepSnapShot[stepIndex] = {...stepSnapShot[stepIndex], isComplete: true};
        setSteps(stepFilter(stepSnapShot, "current"));
        setCompletedSteps(stepFilter(stepSnapShot, "completed"));
        dispatch(udpateStep(goalName, stepId, updateAction));
    };

    function addAStepTextHandler(text) {
        //Check if step input is empty
        text.trim().length === 0 ? setStepIsValid(false) : setStepIsValid(true);
        setAddAStepText(text);
    };

    function addAStepSubmitHandler() {
        if (!stepIsValid) {
            Keyboard.dismiss()
        } else {
        //Extra Validation
        setAddAStepText(null);
        const stepToAdd = addAStepText.split(" ")
        .map(word => word.charAt(0).toUpperCase() + word.substring(1))
        .join(" ");
        //Display new step
        let addAStepSnapshot = [...steps];
        addAStepSnapshot = [
            ...addAStepSnapshot, 
            new StepModel("stepId"+stepToAdd.replace(/\s/g,""), stepToAdd, false, [])
        ];
        setSteps(addAStepSnapshot);
        //Send to redux global
        dispatch(addStep(id, stepToAdd));
        }
    };

    //Local Navigation Settings
    navigation.setOptions({
        headerLeft: () => (
            <HeaderButtons HeaderButtonComponent={CustomBackButton}>
                <Item 
                    title="BACK" 
                    iconName="md-close"
                    onPress={() => navigation.popToTop()}
                />
            </HeaderButtons>
        ),
        headerRight: () => {
            return(
                <Menu style={styles.headerRightMenu}>
                    <MenuTrigger style={styles.headerRightMenuTriggerStyle}>
                        <HeaderButtons HeaderButtonComponent={OptionsHeaderButton}>
                            <Item 
                                title="OPTIONS" 
                                iconName="options-vertical"
                            />
                        </HeaderButtons>
                    </MenuTrigger>
                        <MenuOptions>
                            <MenuOption onSelect={markAsCompletedHandler} value={"Mark as completed"}>
                                <DefaultText style={styles.menuOptionText}>Mark as completed</DefaultText>
                            </MenuOption>
                            <MenuOption onSelect={renameGoalHandler}>
                                <DefaultText style={styles.menuOptionText}>Rename</DefaultText>
                            </MenuOption>
                            <MenuOption value={2}>
                                <DefaultText style={styles.menuOptionText}>Delete</DefaultText>
                            </MenuOption>
                        </MenuOptions>
                </Menu>
            );
        },
    });
    
    return(
        <TouchableWithoutFeedback touchSoundDisabled={true} onPress={() => Keyboard.dismiss()}>
        <View style={styles.screen}>
            <View style={styles.header}>
                <View style={styles.goalContainer}>
                    <SmallText>Goal:</SmallText>
                    <HeaderText>{goalName}</HeaderText>
                </View>
                <View style={styles.goalStatusContainer}>
                    <SmallText style={styles.headerTextMargin}>Started: {startDate}</SmallText>
                    <View style={{ flexDirection: "row" }}>
                        <SmallText>Finished: </SmallText>
                        <SmallTextItalic>{status}</SmallTextItalic>
                    </View>
                </View>
            </View>

            <View style={styles.pageDescription}>
                <DefaultText>
                    Here is where you can add, delete, or track the steps you need to do in
                    order to achieve your goal.
                </DefaultText>
            </View>

            <View style={styles.stepContainer}>
                {steps.map((selectedStep, index) => {
                    return <Step 
                        title={selectedStep.stepName} 
                        key={"key"+index} 
                        deleteStep={deleteStepHandler.bind(this, goalName, selectedStep.id, index, "delete")}
                        completeStep={completeStepHandler.bind(this, goalName, selectedStep.id, index, "complete")}
                    />
                })}
                {completedSteps.map((selectedCompletedStep, index) => {
                    return(
                        <CSteps
                            title={selectedCompletedStep.stepName}
                            key={"keyCompletedStep"+index}
                        />
                    );
                })}
                <View style={{...styles.step, ...styles.addAStepContainer}}>
                    <View style={styles.addAStep}>
                        <View style={styles.addAStepPlus}>
                            <Ionicons name="ios-add" size={23} color={Colors.grey} /> 
                        </View>
                        <View style={styles.addAStepInputContainer}>
                            <TextInput 
                                style={{ fontSize: 16 }} 
                                placeholder="Add a step" 
                                onChangeText={addAStepTextHandler}
                                value={addAStepText}
                                autoCapitalize="words"
                                autoCorrect
                                onSubmitEditing={addAStepSubmitHandler}
                            />
                        </View>
                    </View>
                </View>
            </View>
        </View>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    screen: {
        paddingHorizontal: 10,
        flex: 1,
    },
    headerRightMenu: { 
        justifyContent: "center", 
        alignItems: "center", 
        height: 50, 
        width: 50, 
        borderRadius: 25, 
        overflow: "hidden", 
    },
    headerRightMenuTriggerStyle: { 
        height: "100%", 
        width: "100%", 
        justifyContent: "center", 
        alignItems: "center", 
    },
    menuOptionText: {
        padding: 5,
    },
    header: {
        flexDirection: "row",
        height: 80,
        //alignItems: 'center', 
    },
    pageDescription: {
        paddingVertical: 10,
    },
    goalContainer: {
        flex: 1,
    },
    goalStatusContainer: {
        flex: 1,
        alignItems: "flex-end",
    },
    headerTextMargin: {
        marginBottom: 4,
    },
    stepContainer: {
        //borderWidth: 1,
    },
    addAStepContainer: {
        paddingVertical: 20,
    },
    addAStep: {
        flexDirection: "row",
        justifyContent: "center",
    },
    addAStepPlus: {
        padding: 5,
        justifyContent: "center",
        alignItems:"center",
    },
    addAStepInputContainer: {
        flex: 1,
        padding: 5,
    },
});

export default EditGoal;