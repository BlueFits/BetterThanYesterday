import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

//Constants
import Colors from "../../constants/Colors";

//Initialize Vars
const Stack = createStackNavigator();

//Tab Navigators
import GoalsTopTabNavigator from "../topTab/GoalsTopTabNavigator";

//Screens
import AddGoalScreen from "../../screens/goals/AddGoal";
import EditGoal from "../../screens/goals/EditGoal";

const GoalsStackNavigator = () => {
    return(
        <Stack.Navigator  screenOptions={defaultScreenOptions}>
            <Stack.Screen name="Goals" component={GoalsTopTabNavigator} options={{
                headerStatusBarHeight: -30,
            }}/>
            <Stack.Screen name="Add Goal" component={AddGoalScreen} options={{
                headerTintColor: "#fff",
                cardStyle: {
                    backgroundColor: Colors.accentC,
                },
                headerStyle: {
                    backgroundColor: Colors.accentC,
                    shadowColor: "transparent",
                    elevation: 0,
                },
            }} />
            <Stack.Screen name="Edit Goal" component={EditGoal} />
        </Stack.Navigator>
    );
};

const defaultScreenOptions= {
    headerStyle: {
        elevation: 0,
        shadowColor: "transparent",
        backgroundColor: "#fff",
    },
    headerTitleStyle: {
        color: "transparent",
    },
    cardStyle: {
        backgroundColor: "#fff",
    },
};

export default GoalsStackNavigator;