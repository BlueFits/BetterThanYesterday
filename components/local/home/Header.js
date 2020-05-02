import React from "react";
import { View, StyleSheet } from "react-native";
import { HeaderText, DefaultText } from "../../../controllers/TextController";
import { Bar } from "react-native-progress";
import Colors from "../../../constants/Colors";

const Header = ({ homeState, currentIndicatorText, currentTotalPoints, previousTotalPoints, currentTotalPercentage }) => {
    return (
        <View style={styles.header}>
            <HeaderText style={styles.headerText}>{homeState.header.toUpperCase()}'S ACHIEVEMENTS</HeaderText>
            <View style={styles.progressIndicator}>
                <View style={styles.progressIndicatorTexts}>
                    {currentIndicatorText}
                    <DefaultText>{currentTotalPoints}/{previousTotalPoints}</DefaultText>
                </View>
                <View style={styles.progressBar}>
                    <Bar progress={currentTotalPercentage} width={null} color={currentTotalPercentage > 1 ? Colors.primary : Colors.green}/>
                </View>
            </View>
        </View>
    );
};

//Style Constants
const paddingConstant = 20;
const progressSpacing = 4;

const styles = StyleSheet.create({
    header: {
        paddingVertical: 20,
        paddingHorizontal: paddingConstant,
    },
    headerText: {
        paddingBottom: 5,
    },
    progressIndicator: {
        
    },
    progressIndicatorTexts: {
        flexDirection: "row",
        justifyContent: "space-between",
        padding: progressSpacing,
    },
    progressBar: {
        padding: progressSpacing,
    },

});

export default Header;