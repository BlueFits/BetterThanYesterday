import React from "react";
import { createStackNavigator, TransitionPresets } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
//COMPONENTS
import HeaderLogo from "../../components/images/HeaderLogo";

//Screens
import AuthenticationOptions from "../../screens/login-register/AuthenticationOption";
import Register from "../../screens/login-register/Register";
import Login from "../../screens/login-register/Login";

const Stack = createStackNavigator();

const AuthenticationNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{...defaultOptions, ...TransitionPresets.SlideFromRightIOS}}>
                <Stack.Screen 
                    name="menu" 
                    component={AuthenticationOptions} 
                />
                <Stack.Screen 
                    name="register" 
                    component={Register} 
                    options={{
                        headerTitleAlign: "center",
                        headerTitle: () => {
                            return <HeaderLogo />
                        },
                    }} 
                />
                <Stack.Screen 
                    name="login" 
                    component={Login} 
                    options={{
                        headerTitleAlign: "center",
                        headerTitle: () => {
                            return <HeaderLogo />
                        },
                    }} 
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

const defaultOptions ={
    headerStyle: {
        backgroundColor: "transparent",
        elevation: 0,
        shadowColor: "transparent",
    },
    headerTitleStyle: {
        color: "transparent",
    },
    cardStyle: {
        backgroundColor: "#fff",
    },
};

export default AuthenticationNavigator;