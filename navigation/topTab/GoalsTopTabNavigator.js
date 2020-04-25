import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { useNavigation } from "@react-navigation/native";
import Colors from "../../constants/Colors";
import { useSelector, useDispatch } from "react-redux";
//Reducers
import { switchTab } from "../../store/actions/navigation/goalNavigation";
//Screens
import GoalsScreen from "../../screens/goals/Goals";
//Initialize
const TopTab = createMaterialTopTabNavigator();

const GoalsTopTabNavigator = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    //Local Constants
    const destination = {
        ACTIVE: "active",
        COMPLETED: "completed"
    };
    return(
        <TopTab.Navigator tabBarOptions={defaultOptions} swipeEnabled={false} initialRouteName={destination.ACTIVE} >
            <TopTab.Screen 
            name={destination.ACTIVE} 
            component={GoalsScreen} 
            listeners={{
                tabPress: (e) => {
                    e.preventDefault();
                    dispatch(switchTab(
                        destination.ACTIVE,
                        "ACTIVE GOALS", 
                        "What do you want to become?", 
                        "Set big goals!", 
                        "on-going"
                    ));
                    navigation.jumpTo(destination.ACTIVE);
                },
            }} />
            <TopTab.Screen name={destination.COMPLETED} component={GoalsScreen} listeners={{
                tabPress: (e) => {
                    e.preventDefault();
                    dispatch(switchTab(
                        destination.COMPLETED,
                        "COMPLETED GOALS", 
                        "These are your completed goals.", 
                        "Be proud!", 
                        "completed"
                    ));
                    navigation.jumpTo(destination.COMPLETED);
                },
            }} />
        </TopTab.Navigator>
    );
};

const defaultOptions = {
    indicatorStyle: {
        backgroundColor: Colors.primary,
    },
    labelStyle: {
        fontFamily: "myriadBold",
    },
};

export default GoalsTopTabNavigator;