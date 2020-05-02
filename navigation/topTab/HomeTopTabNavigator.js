import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";

//Action Redux
import { switchDate } from "../../store/actions/navigation/homeNavigation";

//API's
import moment from "moment";

//Constants
import Colors from "../../constants/Colors";

//Screens
import Home from "../../screens/home/Home";

//Initialize
const TopTab = createMaterialTopTabNavigator();

const tabConstant = {
    TODAY: {
        destination: "TODAY",
        header: "TODAY",
        currentDate: moment().format("MMMM Do YYYY"),
        previousDate: moment().subtract(1, "d").format("MMMM Do YYYY"),
    },
    YESTERDAY: {
        destination: "YESTERDAY",
        header: "YESTERDAY",
        currentDate: moment().subtract(1,"d").format("MMMM Do YYYY"),
        previousDate: moment().subtract(2, "d").format("MMMM Do YYYY"),
    },
    HISTORY1: {
        destination: DateFrom(2),
        header: DateFrom(2, "short"),
        currentDate: moment().subtract(2,"d").format("MMMM Do YYYY"),
        previousDate: moment().subtract(3, "d").format("MMMM Do YYYY"),
    },
    HISTORY2: {
        destination: DateFrom(3),
        header: DateFrom(3, "short"),
        currentDate: moment().subtract(3,"d").format("MMMM Do YYYY"),
        previousDate: moment().subtract(4, "d").format("MMMM Do YYYY"),
    },
    HISTORY3: {
        header: DateFrom(5, "short"),
    },
};

//Local Functions
function DateFrom(days, display) {
    switch (display) {
        case "short": 
            return moment().subtract(days,"d").format("MMMM Do");
        default: 
            return moment().subtract(days,"d").format("MMMM Do YYYY");
    }
};

const HomeTopTabNavigator = () => {
    //Navigation Initialize
    const navigation = useNavigation();
    const dispatch = useDispatch();
    return (
        <TopTab.Navigator tabBarOptions={defaultOptions} initialRouteName="TODAY" swipeEnabled={false}>
            <TopTab.Screen name={tabConstant.HISTORY2.destination} component={Home} listeners={{
                tabPress: (e) => {
                    e.preventDefault();
                    dispatch(switchDate(
                        tabConstant.HISTORY2.destination, 
                        tabConstant.HISTORY2.header, 
                        tabConstant.HISTORY3.header,
                        tabConstant.HISTORY2.currentDate,
                        tabConstant.HISTORY2.previousDate,
                    ));
                    navigation.jumpTo(tabConstant.HISTORY2.destination);
                },
            }} />
            <TopTab.Screen name={tabConstant.HISTORY1.destination} component={Home} listeners={{
                tabPress: (e) => {
                    e.preventDefault();
                    dispatch(switchDate(
                        tabConstant.HISTORY1.destination, 
                        tabConstant.HISTORY1.header, 
                        tabConstant.HISTORY2.header,
                        tabConstant.HISTORY1.currentDate,
                        tabConstant.HISTORY1.previousDate
                    ));
                    navigation.jumpTo(tabConstant.HISTORY1.destination);
                },
            }} />
            <TopTab.Screen name="YESTERDAY" component={Home} listeners={{
                tabPress: (e) => {
                    e.preventDefault();
                    dispatch(switchDate(
                        tabConstant.YESTERDAY.destination, 
                        tabConstant.YESTERDAY.header, 
                        tabConstant.HISTORY1.header,
                        tabConstant.YESTERDAY.currentDate,
                        tabConstant.YESTERDAY.previousDate
                    ));
                    navigation.jumpTo(tabConstant.YESTERDAY.destination);
                },
            }} />
            <TopTab.Screen name="TODAY" component={Home} listeners={{
                tabPress: (e) => {
                    e.preventDefault();
                    dispatch(switchDate(
                        tabConstant.TODAY.destination, 
                        tabConstant.TODAY.header, 
                        tabConstant.YESTERDAY.header,
                        tabConstant.TODAY.currentDate,
                        tabConstant.TODAY.previousDate,
                        ));
                    navigation.jumpTo(tabConstant.TODAY.destination);
                },
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