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
            }} />
            <Stack.Screen name="Edit Goal" component={EditGoal} />
        </Stack.Navigator>
    );
};

/* 
<Stack.Screen name="Goals" component={GoalsScreen} options={{
    headerShown: true,
}} />
*/

const defaultScreenOptions= {
    headerStyle: {
        elevation: 0,
        shadowColor: "transparent",
        backgroundColor: "transparent",
    },
    headerTitleStyle: {
        color: "transparent",
    },
    cardStyle: {
        backgroundColor: "white",
    },
};

export default GoalsStackNavigator;