import React from "react";
import { View, StyleSheet } from "react-native";
//CONSTANTS
import Colors from "../../../constants/Colors";

const PlusIndicator = ({ value }) => {

    const indicatorDot = [];

    for (let i = 0; i < value; i++) {
        indicatorDot.push(<View key={"IndicatorKey:" + i} style={styles.indicatorDot}></View>);
    }

    return (
        <View style={styles.layout}>
            {indicatorDot}
        </View>
    );
};

//CONSTANT STYLES
const dimensions = 10;

const styles = StyleSheet.create({
    layout: {
        flexDirection: "row",
    },
    indicatorDot: {
        height: dimensions,
        width: dimensions,
        borderRadius: 5,
        backgroundColor: Colors.primary,
        marginRight: 5,
    },
});

export default PlusIndicator;
