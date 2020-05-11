import React from "react";
import { View, StyleSheet } from "react-native";
//CONTROLLERS
import { DefaultText } from "../../../controllers/TextController";
//COMPONENTS
import Touchable from "../../Touchable";
//CONSTANTS
import Colors from "../../../constants/Colors";

const CustomButton = ({ leftIcon, leftText, rightContent, onPress  }) => {
    return (
        <View style={styles.menuContainer}>
            <Touchable onPress={onPress}>
                <View style={styles.menu}>
                    <View style={styles.leftContent}>
                        {leftIcon}
                        <DefaultText style={styles.leftText}>{leftText}</DefaultText>
                    </View>

                    <View style={styles.rightContent}>
                        {rightContent}
                    </View>
                </View>
            </Touchable>
        </View>
    );
};

const styles = StyleSheet.create({
    menuContainer: {
        height: 60,
    },
    menu: { 
        paddingHorizontal: 20,
        height: "100%", 
        width: "100%", 
        justifyContent: "space-between",
        flexDirection: "row",
    },
    leftContent: {
        flexDirection: "row",
        alignItems: "center",
    },
    rightContent: {
        justifyContent: "center",
    },
});

export default CustomButton;