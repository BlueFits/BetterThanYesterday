import React from "react";
import { View, StyleSheet } from "react-native";
import { DefaultText, HeaderText } from "../../../controllers/TextController";

const Footer = ({ homeState, prevListIndex, previousTotalPoints }) => {
    return (
        <View style={styles.header}>
                <HeaderText style={styles.headerText}>{homeState.header2.toUpperCase()}'S ACHIEVEMENTS</HeaderText>
                <View style={styles.progressIndicator}>
                    <DefaultText>Here are your entries for {homeState.header2.toLowerCase()}.</DefaultText>
                    <DefaultText>You have {prevListIndex.length} entries totalling {previousTotalPoints} {previousTotalPoints === (1 || 0) ? "point" : "points"}.</DefaultText>
                </View>
            </View>
    );
};

//Style Constants
const paddingConstant = 20;
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
});

export default Footer;