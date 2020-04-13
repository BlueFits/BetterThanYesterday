import React from "react";
import { View, Image, StyleSheet } from "react-native";

//Initialize Defaults
let imageSize = 35;

function HeaderLogo(props) {
    return(
        <Image style={styles.logoStyles} source={require("../../assets/images/LogoNoTxt.png")}/>
    );
};

const styles = StyleSheet.create({
    logoStyles: {
        height: imageSize,
        width: imageSize,
    },
});

export default HeaderLogo