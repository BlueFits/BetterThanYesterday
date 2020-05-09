import React from "react";
import { View, StyleSheet, Image } from "react-native";

const BtyLogo = ({ style }) => {
 return (
    <Image style={{...styles.image, ...style}} source={require("../../assets/images/LogoWithText.png")} />
 );
};

//Constant styles
const imageDimensions = 195;

const styles = StyleSheet.create({

    image: {
        height: imageDimensions,
        width: imageDimensions,
    },
});

export default BtyLogo;