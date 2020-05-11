import React from "react";
import { View, StyleSheet } from "react-native";
import { HeaderTextSemiBold, SmallText, } from "../../../controllers/TextController";

const ProfileHeader = ({ headerText, subHeader1, subHeader2, style }) => {
    return (
        <View style={{...styles.header, ...style}}>
            <HeaderTextSemiBold style={styles.headerText}>{headerText}</HeaderTextSemiBold>
            <SmallText>{subHeader1}</SmallText>
            <SmallText>{subHeader2}</SmallText>
        </View>
    );
};

const styles = StyleSheet.create({
    header: { 
        backgroundColor: "#fff", 
        paddingBottom: 25,
        paddingHorizontal: 20,
    },
    headerText: {
        marginBottom: 5,
    },
});

export default ProfileHeader;