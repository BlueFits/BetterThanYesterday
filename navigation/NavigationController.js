import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons, Foundation } from "@expo/vector-icons";

//Constants
import Colors from "../constants/Colors";

//Stacks
import HomeStackNavigator from "./stacks/HomeStackNavigator";
import GoalsStackNavigator from "./stacks/GoalsStackNavigator";

//Initialized Variables
const Tab = createBottomTabNavigator();

const TabNavigator = () => {
    return (
        <NavigationContainer>
            <Tab.Navigator tabBarOptions={defaultConfig}>
                <Tab.Screen name="Home" component={HomeStackNavigator} options={{
                    tabBarIcon: (tabInfo) => {
                        return <Ionicons name="md-home" size={28} color={tabInfo.color}/> 
                    },
                }}/>
                <Tab.Screen name="Goals" component={GoalsStackNavigator} options={{
                    tabBarIcon: (tabInfo) => {
                        return <Foundation name="target" size={28} color={tabInfo.color}/> 
                    },
                }}/>
                <Tab.Screen name="Insights" component={HomeStackNavigator} options={{
                    tabBarIcon: (tabInfo) => {
                        return <Foundation name="graph-bar" size={28} color={tabInfo.color}/> 
                    },
                }}/>
            </Tab.Navigator>
        </NavigationContainer>
    );
};

const defaultConfig = {
    activeTintColor: Colors.primary,
    keyboardHidesTabBar: true,
};

//export main navigation method
export default TabNavigator;