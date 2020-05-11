import React from "react";
import { View, StyleSheet } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import * as MailComposer from "expo-mail-composer";
//ACTIONS
import { signOut } from "../../store/actions/auth";
//COMPONENTS
import CustomButton from "../../components/local/profile/CustomButton";
import { MaterialIcons, FontAwesome } from "@expo/vector-icons";
import ProfileHeader from "../../components/local/profile/ProfileHeader";
//CONSTANTS
import Colors from "../../constants/Colors";

const profileMenu = ({ navigation }) => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.userReducer);

    //Config

    //HANDLERS
    function signOutHandler () {
        dispatch(signOut());
    };

    function sendFeedbackHandler () {
        MailComposer.composeAsync({
            recipients:["btydevelopmentteam@gmail.com"],
            subject: "BTY Feedback - " + user.email,
        });
    };

    return (
        <View style={styles.screen}>
            <ProfileHeader 
                headerText="Settings" 
                subHeader1={user.email.charAt(0).toUpperCase() + user.email.slice(1)} 
                subHeader2="Beta Account" 
            />
            <CustomButton 
                leftIcon={ <MaterialIcons name="account-circle" size={28} color={Colors.black} style={styles.iconStyle}/>}
                leftText="Account"
                onPress={() => navigation.navigate("Account")}
            />
            <CustomButton 
                leftIcon={ <MaterialIcons name="notifications" size={28} color={Colors.black} style={styles.iconStyle}/>}
                leftText="Notifications"
                onPress={() => navigation.navigate("Notifications")}
            />
            <CustomButton 
                leftIcon={ <MaterialIcons name="feedback" size={28} color={Colors.black} style={styles.iconStyle}/>}
                leftText="Send Feedback"
                onPress={sendFeedbackHandler}
            />
            <CustomButton 
                leftIcon={ <FontAwesome name="sign-out" size={28} color={Colors.black} style={styles.iconStyle}/>}
                leftText="Sign Out"
                onPress={signOutHandler}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
    },
    iconStyle: {
        marginRight: 10,
    },
});

export default profileMenu;