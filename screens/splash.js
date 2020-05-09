import React, { useEffect } from "react";
import { View, ActivityIndicator, AsyncStorage } from "react-native";
import { useDispatch } from "react-redux";
import { authenticate } from "../store/actions/auth";
import Colors from "../constants/Colors";

const splash = ({ navigation }) => {

    const dispatch = useDispatch()

    useEffect(()=> {
        const tryLogin = async () => {
            const userData = await AsyncStorage.getItem("userData");
            if (!userData) {
                navigation.navigate("menu");
                return;
            }
            
            const { token, userId, expiryDate } = JSON.parse(userData);
            const expirationDate = new Date(expiryDate);

            if (expirationDate <= new Date() || !token || !userId) {
                navigation.navigate("menu");
                return;
            } else {
                dispatch(authenticate(userId, token));
            }
        };

        tryLogin();
    }, [dispatch]);

    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", }}>
            <ActivityIndicator size="large" color={Colors.red} /> 
        </View>
    );
};

export default splash;