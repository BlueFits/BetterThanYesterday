import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { useNavigation } from "@react-navigation/native";
//API's
import moment from "moment";

//Constants
import Colors from "../../constants/Colors";

//Screens
import Home from "../../screens/home/Home";

//Initialize
const TopTab = createMaterialTopTabNavigator();

//Local Functions
function DateFrom(days, display) {
    switch (display) {
        case "short": 
            return moment().subtract(days,"d").format("MMMM Do");
        default: 
            return moment().subtract(days,"d").format("MMMM Do YYYY");
    }
};

function tabPressHandler(e, destination, headerValue, navigation) {
    const data = {
        headerValue
    };
    e.preventDefault();
    navigation.jumpTo(destination, data);
};

const HomeTopTabNavigator = () => {
    //Navigation Initialize
    const navigation = useNavigation();
    return (
        <TopTab.Navigator tabBarOptions={defaultOptions} initialRouteName="TODAY" swipeEnabled={false}>
            <TopTab.Screen name={DateFrom(4)} initialParams={{ headerValue: "TODAY" }} component={Home} listeners={{
                tabPress: e => tabPressHandler(e, DateFrom(4), DateFrom(4,"short"), navigation),
            }} />
            <TopTab.Screen name={DateFrom(3)} initialParams={{ headerValue: "TODAY" }} component={Home} listeners={{
                tabPress:  e => tabPressHandler(e, DateFrom(3), DateFrom(3,"short"), navigation),
            }} />
            <TopTab.Screen name="YESTERDAY" initialParams={{ headerValue: "TODAY" }} component={Home} listeners={{
                tabPress:  e => tabPressHandler(e, "YESTERDAY", "YESTERDAY", navigation),
            }} />
            <TopTab.Screen name="TODAY" component={Home} initialParams={{ headerValue: "TODAY" }} listeners={{
                tabPress:  e => tabPressHandler(e, "TODAY", "TODAY", navigation),
            }} />
        </TopTab.Navigator>
    );
};

//Default Options
const defaultOptions = {
    indicatorStyle: {
        backgroundColor: Colors.primary,
    },
    labelStyle: {
        fontFamily: "myriadBold",
    },
    scrollEnabled: true,
};

export default HomeTopTabNavigator;