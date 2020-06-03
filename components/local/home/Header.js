import React from "react";
import { View, StyleSheet } from "react-native";
import { HeaderText, DefaultText } from "../../../controllers/TextController";
//COMPONENTS
import ProgressBar from "./ProgressBar";
import PlusIndicator from "./PlusIndicator";

const Header = ({ homeState, currentIndicatorText, currentTotalPoints, previousTotalPoints, currentTotalPercentage }) => {
    const plusIndicatorValue = currentTotalPoints - previousTotalPoints;
    return (
        <View style={styles.header}>
            <HeaderText style={styles.headerText}>{homeState.header.toUpperCase()}'S ACHIEVEMENTS</HeaderText>
            <View style={styles.progressIndicator}>
                <View style={styles.progressIndicatorTexts}>
                    {currentIndicatorText}
                    <DefaultText>
                        {Math.sign(plusIndicatorValue) === 1 ? `+${Math.abs(plusIndicatorValue)}` : `${currentTotalPoints}/${previousTotalPoints}`}
                    </DefaultText>
                </View>
                <View style={styles.progressBar}>
                    {currentTotalPercentage > 1 ? <PlusIndicator value={Math.abs(plusIndicatorValue)} /> : <ProgressBar currentTotalPercentage={currentTotalPercentage} />}
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
        marginVertical: progressSpacing,
    },
    progressBar: {
        marginTop: progressSpacing,
    },

});

export default Header;