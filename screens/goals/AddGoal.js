import React, { useState } from "react";
import { View, StyleSheet, TextInput, FlatList, Keyboard, TouchableWithoutFeedback, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useDispatch, useSelector } from "react-redux";
import ColorPalette from "react-native-color-palette";
import moment from "moment";
//Redux Actions
import { addGoal } from "../../store/actions/user";

//Controllers
import { DefaultText, SmallText } from "../../controllers/TextController";

//Constants
import GoalSuggestions from "../../constants/GoalSuggestions";

//Custom Functions
import { capitalizeWords } from "../../customFunctions/Validators";

//Header Config
import HeaderButton from "../../components/HeaderButton";

const AddGoal = ({ navigation }) => {
    /* States */
    const [selectedColor, setSelectedColor] = useState("#2ecc71");
    const [goal, setGoal] = useState(null);
    const [goalIsValid, setGoalIsValid] = useState(null);
    const [errors, setErrors] = useState([]);

    //Initiatize variables
    const dispatch = useDispatch();
    const user = useSelector(state => state.userReducer);
    const userId = user._id;
    
    //Methods
    function suggestionsRenderHandler(data) {
        return(
            <TouchableOpacity onPress={goalSuggestionsHandler.bind(this, data)}>
                <DefaultText style={styles.flatListItems}>{data.item}</DefaultText>
            </TouchableOpacity>
        );
    };
    
    function submitHandler() {
        if (!goalIsValid) {
            setErrors(["Please put a goal or choose from the list below."]);
        } else {
            //Extra Validation
            const validatedText = capitalizeWords(goal);
            const startDate = moment().format("MMMM Do YYYY");
            //Pass data into redux
            dispatch(addGoal(userId, validatedText, selectedColor, startDate));
            navigation.navigate("Goals");
        }
    };

    //Validations
    function goalInputHandler(text) {
        //Check if goal input is empty
        text.trim().length === 0 ? setGoalIsValid(false) : setGoalIsValid(true);
        setGoal(text);
    };

    function goalSuggestionsHandler(data) {
        setGoal(data.item);
        setGoalIsValid(true);
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

                <View style={styles.colorPaletteContainer}>
                    <ColorPalette 
                        onChange={color => setSelectedColor(color)}
                        value={selectedColor}
                        colors={["#2ecc71","#1abc9c","#3498db","#9b59b6","#34495e","#e67e22"]} 
                        title={"Choose a color to identify this goal with"}
                        titleStyles={{ color: "#fff" }}
                        icon={<Ionicons name="ios-checkmark" size={23} color="#fff" />}
                        scaleToWindow={true}
                    />
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
    colorPaletteContainer: {
        justifyContent: "center",
        alignItems: "center",
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