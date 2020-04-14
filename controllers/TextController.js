import React from "react";
import { Text, StyleSheet } from "react-native";

export const DefaultText = (props) => {
    return(
        <Text style={{fontFamily: "myriad", ...styles.defaultText, ...props.style}}>{props.children}</Text>
    );
};

export const DefaultTextBold = (props) => {
    return(
        <Text style={{fontFamily: "myriadBold", ...styles.defaultText, ...props.style}}>{props.children}</Text>
    );
};

export const HeaderText = (props) => {
    return(
        <Text style={{fontFamily: "myriadBold", ...styles.headerText, ...props.style}}>{props.children}</Text>
    );
};

export const SmallText = (props) => {
    return(
        <Text style={{fontFamily: "myriad", ...styles.smallText, ...props.style}}>{props.children}</Text>
    );
};

//Styles
const styles = StyleSheet.create({
    defaultText: {
        //Unusual Number
        fontSize: 16,
    },
    smallText: {
        fontSize: 14,
    },
    headerText: {
        fontSize: 21,
    },
});