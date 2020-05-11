import React from "react";
import { View, StyleSheet } from "react-native";
import { HeaderTextSemiBold } from "../controllers/TextController";

export default function Filler() {
    return(
        <View style={{ flex: 1, justifyContent:"center", alignItems: "center", backgroundColor: "#fff" }}>
            <HeaderTextSemiBold>Will be available in a future release</HeaderTextSemiBold>
        </View>
    );
};