import React from "react";
import { View, StyleSheet } from "react-native";
import { useSelector, useDispatch } from "react-redux";
//REACT-REDUX
import { deleteAccount, signOut } from "../../store/actions/auth";
//COMPONENTS
import ProfileHeader from "../../components/local/profile/ProfileHeader";
import CustomButton from "../../components/local/profile/CustomButton";


const Settings = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.userReducer);

    //HANDLERS
    function deleteAccountHandler() {
        dispatch(deleteAccount(user._id));
    };

    return (
        <View style={styles.screen}>
            <ProfileHeader 
                headerText={user.email.charAt(0).toUpperCase() + user.email.slice(1)}
                subHeader1={`Registered on ${user.createdAt}`}
                subHeader2="Beta Account"
            />
            <CustomButton 
                leftText="Delete Account"
                onPress={deleteAccountHandler}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
    },
});

export default Settings;