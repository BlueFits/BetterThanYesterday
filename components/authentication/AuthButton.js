import React from "react";
import { View, StyleSheet } from "react-native";
import { DefaultText } from "../../controllers/TextController"; 
import Touchable from "../Touchable";
//Constants
import Colors from "../../constants/Colors";

const AuthButton = ({ textStyle, IconSettings, buttonText, style, onPress }) => {
    let iconElement = IconSettings.name === "notSet" ? <View></View> :  <IconSettings.iconPack name={IconSettings.name} size={28} color={"#fff"} style={styles.buttonElement}/>;

    return (
        <View style={{...styles.buttonContianer, ...style}}>
            <Touchable onPress={onPress}>
                <View style={styles.button}>
                    {iconElement}
                    <View style={styles.textContainer}>
                        <DefaultText style={{...styles.text, ...textStyle}}>{buttonText}</DefaultText>
                    </View>
                </View>     
            </Touchable>  
        </View> 
    );
};

const styles = StyleSheet.create({
    buttonContianer: { 
        marginBottom: 10,
        /*
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        */
        justifyContent: "center",
        alignItems: "center",
        width: "80%", 
        height: 40, 
        backgroundColor: Colors.red, 
        borderRadius: 30,
        overflow: "hidden",
    },
    button: {
        paddingHorizontal: 20,
        height: "100%",
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },  
    buttonElement: {
        flex: 1,
    },
    textContainer: {
        flex: 4,
    },
    text: {
        color: "#fff",
    },
});

export default AuthButton;