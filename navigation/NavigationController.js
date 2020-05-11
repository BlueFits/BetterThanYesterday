import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Foundation, MaterialIcons } from "@expo/vector-icons";
import { useSelector } from "react-redux";

//Screens
import Filler from "../screens/filler";

//Constants
import Colors from "../constants/Colors";

//Stacks
import HomeStackNavigator from "./stacks/HomeStackNavigator";
import GoalsStackNavigator from "./stacks/GoalsStackNavigator";
import AuthNavigator from "./stacks/AuthenticationNavigator";
import ProfileStackNavigator from "./stacks/ProfileStackNavigator";

//Initialized Variables
const Tab = createBottomTabNavigator();

const TabNavigator = () => {
    const userToken = useSelector(authState => authState.authReducer.token);
    if (userToken === null) {
        return <AuthNavigator />
    }
    else {
        return (
            <NavigationContainer>
                <Tab.Navigator tabBarOptions={defaultConfig}>
                    <Tab.Screen 
                        name="Home" 
                        component={HomeStackNavigator} 
                        options={{
                            tabBarIcon: tabInfo => <MaterialIcons name="home" size={28} color={tabInfo.color} />
                        }}
                    />
                    <Tab.Screen name="Goals" component={GoalsStackNavigator} options={{
                        tabBarIcon: (tabInfo) => {
                            return <Foundation name="target" size={28} color={tabInfo.color}/> 
                        },
                    }}/>
                    <Tab.Screen name="Insights" component={Filler} options={{
                        tabBarIcon: (tabInfo) => {
                            return <Foundation name="graph-bar" size={28} color={tabInfo.color}/> 
                        },
                    }}/>
                    <Tab.Screen name="Profile" component={ProfileStackNavigator} options={{
                        tabBarIcon: tabInfo => <MaterialIcons name="person" size={28} color={tabInfo.color} />
                    }} />
                </Tab.Navigator>
            </NavigationContainer>
        );
    }
};

const defaultConfig = {
    showLabel: true,
    activeTintColor: Colors.primary,
    keyboardHidesTabBar: true,
};

//export main navigation method
export default TabNavigator;