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

export const DefaultTextItalic = (props) => {
    return(
        <Text style={{fontFamily: "myriadItalic", ...styles.defaultText, ...props.style}}>{props.children}</Text>
    );
};

export const HeaderText = (props) => {
    return(
        <Text style={{fontFamily: "myriadBold", ...styles.headerText, ...props.style}}>{props.children}</Text>
    );
};

export const HeaderTextItalic = (props) => {
    return(
        <Text style={{fontFamily: "myriadBoldItalic", ...styles.headerText, ...props.style, fontSize: 20, }}>{props.children}</Text>
    );
};

export const HeaderTextSemiBold = (props) => {
    return (
        <Text style={{fontFamily: "myriadSemiBold", ...styles.headerText, ...props.style, fontSize: 20, }}>{props.children}</Text>
    );
};

export const Header2Text = (props) => {
    return(
        <Text style={{fontFamily: "myriadBold", ...styles.header2Text, ...props.style}}>{props.children}</Text>
    );
};

export const Header2TextItalic = (props) => {
    return(
        <Text style={{fontFamily: "myriadBoldItalic", ...styles.header2Text, ...props.style}}>{props.children}</Text>
    );
};


export const SmallText = (props) => {
    return(
        <Text style={{fontFamily: "myriad", ...styles.smallText, ...props.style}}>{props.children}</Text>
    );
};

export const SmallTextItalic = (props) => {
    return(
        <Text style={{fontFamily: "myriadItalic", ...styles.smallText, ...props.style}}>{props.children}</Text>
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
    header2Text: {
        fontSize: 18,
    },
});