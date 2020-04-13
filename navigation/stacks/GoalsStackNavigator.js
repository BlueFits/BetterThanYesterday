import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

//Initialize Vars
const Stack = createStackNavigator();

//Screens
import GoalsScreen from "../../screens/goals/Goals";
import AddGoalScreen from "../../screens/goals/AddGoal";

const GoalsStackNavigator = () => {
    return(
        <Stack.Navigator  screenOptions={defaultScreenOptions}>
            <Stack.Screen name="Goals" component={GoalsScreen} options={{
                headerShown: true,
            }} />
            <Stack.Screen name="Add Goal" component={AddGoalScreen} />
        </Stack.Navigator>
    );
};

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