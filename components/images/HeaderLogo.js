import React from "react";
import { Image, StyleSheet } from "react-native";

function HeaderLogo() {
    return(
        <Image style={styles.logoStyles} source={require("../../assets/images/LogoNoTxt.png")}/>
    );
};

//Initialize Defaults
const imageSize = 35;

const styles = StyleSheet.create({
    logoStyles: {
        height: imageSize,
        width: imageSize,
    },
});

export default HeaderLogo