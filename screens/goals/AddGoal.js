import React, { useState } from "react";
import { View, StyleSheet, TextInput, FlatList, Keyboard, TouchableWithoutFeedback } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useSelector, useDispatch } from "react-redux";

//Redux Actions
import { updateGoals } from "../../store/actions/user";

//Controllers
import { DefaultText, SmallText } from "../../controllers/TextController";

//Constants
import GoalSuggestions from "../../constants/GoalSuggestions";

//Header Config
import HeaderButton from "../../components/HeaderButton";

const AddGoal = ({ navigation }) => {
    const [goal, setGoal] = useState(null);
    const [goalIsValid, setGoalIsValid] = useState(null);
    const [errors, setErrors] = useState([]);

    //Initiatize Logged in User
    const user = useSelector(state => state.userReducer.user);
    const dispatch = useDispatch();

    //Initialize Variables
    //Empty
    //Methods
    function suggestionsRenderHandler(data) {
        return(
            <DefaultText style={styles.flatListItems}>{data.item}</DefaultText>
        );
    };

    function submitHandler() {
        if (!goalIsValid) {
            setErrors(["Please put a goal or choose from the list below."]);
        } else {
            //Extra Validation
            const validatedText = goal.split(" ")
            .map(word => word.charAt(0).toUpperCase() + word.substring(1))
            .join(" ");
            //Pass data into redux
            dispatch(updateGoals(validatedText));
            navigation.navigate("Edit Goal");
        }
    };

    //Validations
    function goalInputHandler(text) {
        //Check if goal input is empty
        text.trim().length === 0 ? setGoalIsValid(false) : setGoalIsValid(true);
        setGoal(text);
    };

    //Page Specific Nav Settings
    navigation.setOptions({
        headerRight: () => (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item 
                    title="DONE" 
                    onPress={submitHandler}
                />
            </HeaderButtons>
        ),
    });

    return(
        <TouchableWithoutFeedback touchSoundDisabled={true} onPress={() => Keyboard.dismiss()}>
            <View style={styles.screen}>
                <View style={styles.headerInput}>
                    <DefaultText style={styles.headerText}>What is your goal?</DefaultText>
                    <TextInput 
                        style={styles.input} 
                        value={goal} 
                        onChangeText={goalInputHandler}
                        selectionColor="white"
                        autoFocus={true}
                        autoCapitalize="words"
                        autoCorrect
                        onSubmitEditing={submitHandler}
                    />
                    <SmallText style={styles.errorText}>{errors}</SmallText>
                </View>

                <View style={styles.suggestionContainer}>
                    <View style={styles.suggestionHeaderContainer}>
                        <DefaultText style={{ color: "#fff" }}>Or you can choose from the list</DefaultText>
                    </View>
                    <View style={styles.flatListContainer}>
                        <FlatList 
                            data={GoalSuggestions} 
                            renderItem={suggestionsRenderHandler} 
                            keyExtractor={(data, index) => "key"+index }
                        />
                    </View>
                    <View style={styles.downIndicator}>
                        <Ionicons name="ios-arrow-down" size={24} color="#fff"/>
                    </View>
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
};

//Style Constants
const headerChildrenPadding = 5;
const flatListElementsPadding = 10;

const styles = StyleSheet.create({
    screen: {
        flex: 1,
    },
    headerInput: {
        alignItems: "center",
    },
    headerText: {
        color: "#fff",
        padding: headerChildrenPadding,
    },
    input: {
        width: "100%",
        textAlign: "center",
        color: "#fff",
        padding: headerChildrenPadding,
    },
    errorText: {
        padding: headerChildrenPadding,
        color: "#e74c3c",
    },
    suggestionContainer: {
        alignItems: "center",
    },
    suggestionHeaderContainer: {
        alignItems: "center",
        paddingVertical: 20,
    },
    flatListContainer: {
        height: 240,
        width: "100%",
    },
    flatListItems: {
        textAlign: "center",
        padding: flatListElementsPadding,
        color: "#fff",
    },
    downIndicator: {
        padding: flatListElementsPadding,
    },
});

export default AddGoal;