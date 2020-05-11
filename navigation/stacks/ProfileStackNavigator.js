import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
//SCREENS
import ProfileMenu from "../../screens/profile/ProfileMenu";
import Account from "../../screens/profile/Account";
import filler from "../../screens/filler";

const Stack = createStackNavigator();

const ProfileStackNavigator = () => {
    return (
        <Stack.Navigator headerMode="screen" screenOptions={defaultConfig}>
            <Stack.Screen name="profileMenu" component={ProfileMenu} options={{
                title: "",
            }}/>
            <Stack.Screen name="Account" component={Account} options={{
                title: "",
            }} />
            <Stack.Screen name="Notifications" component={filler} options={{
                title: "",
            }} />
        </Stack.Navigator>
    );
};

const defaultConfig = {
    headerShown: true,
    headerStyle: {
        elevation: 0,
        shadowColor: "transparent",
    },
    cardStyle: {
        backgroundColor: "#fff",
    },
};

export default ProfileStackNavigator;