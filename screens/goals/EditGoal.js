import React from "react";
import { View, StyleSheet } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

//Header Custom Component
import CustomBackButton from "../../components/HeaderButtonDark";

//Controllers
import { DefaultText } from "../../controllers/TextController";

const EditGoal = ({ navigation }) => {
    
    navigation.setOptions({
        headerLeft: () => (
            <HeaderButtons HeaderButtonComponent={CustomBackButton}>
                <Item 
                    title="BACK" 
                    iconName="md-close"
                    onPress={() => navigation.popToTop()}
                />
            </HeaderButtons>
        ),
    });
    
    return(
        <View>
            <DefaultText>Salut</DefaultText>
        </View>
    );
};

const styles = StyleSheet.create({

});

export default EditGoal;