import React from "react";
import { createStackNavigator } from '@react-navigation/stack';
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../../components/HeaderButtonDark";

//Components
import HeaderLogo from "../../components/images/HeaderLogo";

//TopTab
import HomeTopTabNavigator from "../topTab/HomeTopTabNavigator";

//Screens
import AddGoalHome from "../../screens/home/AddGoalHome";
import ChooseStep from "../../screens/home/ChooseStep";
import AddTask from "../../screens/home/AddTask";

//Initialize vars
const Stack = createStackNavigator();

const HomeStackNavigator = () => {
    return(
        <Stack.Navigator screenOptions={defaultOptions}>
            <Stack.Screen name="Home" component={HomeTopTabNavigator} options={{
                headerTitleAlign: "center",
                headerTitle: () => {
                    return <HeaderLogo />
                },
            }} />
            <Stack.Screen name="AddGoal" component={AddGoalHome} options={{
                title: "",
                headerBackImage: () => {
                    return (
                        <HeaderButtons HeaderButtonComponent={HeaderButton}>
                            <Item 
                                title="BACK" 
                                iconName="md-close"
                            />
                        </HeaderButtons>
                    );
                }
            }}/>
            <Stack.Screen name="ChooseStep" component={ChooseStep} options={{
                headerTintColor: "#fff",
            }} />
            <Stack.Screen name="AddTask" component={AddTask} options={{
                headerTintColor: "#fff"
            }} />
        </Stack.Navigator>
    );
};

//Options
const defaultOptions = {
    headerStyle: {
        elevation: 0,
        shadowColor: "transparent",
    },
    cardStyle: {
        backgroundColor: "#fff"
    },
};

export default HomeStackNavigator;