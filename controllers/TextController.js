import React from "react";
import { Text, StyleSheet } from "react-native";

export function DefaultText(props) {
    return(
        <Text style={{fontFamily: "myriad", ...styles.defaultText, ...props.style}}>{props.children}</Text>
    );
}

export function HeaderText(props) {
    return(
        <Text style={{fontFamily: "myriadBold",...styles.font, ...styles.headerText, ...props.style}}>{props.children}</Text>
    );
}

//Styles
const styles = StyleSheet.create({
    defaultText: {
        //Unusual Number
        fontSize: 16,
    },
    headerText: {
        fontSize: 21,
    },
});