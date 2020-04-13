import React from "react";
import { createStackNavigator } from '@react-navigation/stack';

//Components
import HeaderLogo from "../../components/images/HeaderLogo";

//TopTab
import HomeTopTabNavigator from "../topTab/HomeTopTabNavigator";

//Screens
import AddTasks from "../../screens/home/AddTasks";

//Initialize vars
const Stack = createStackNavigator();

const HomeStackNavigator = () => {
    return(
        <Stack.Navigator screenOptions={defaultOptions}>
            <Stack.Screen name="Home" component={HomeTopTabNavigator}/>
            <Stack.Screen name="AddTasks" component={AddTasks}/>
        </Stack.Navigator>
    );
};

//Options
const defaultOptions = {
    headerStyle: {
        elevation: 0,
        shadowColor: "transparent",
    },
    //headerTitleAlign: "center",
    headerTitle: () => {
        return <HeaderLogo />
    },
    headerTitleAlign: "center",
};

export default HomeStackNavigator;