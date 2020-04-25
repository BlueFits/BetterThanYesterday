import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import {
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
} from 'react-native-popup-menu';
import OptionsHeaderButton from "../../HeaderButtonDarkSimpleLineIcons";
import { DefaultText } from "../../../controllers/TextController";

const EditGoalMenu = ({ markAsCompleted, renameGoal, deleteGoal }) => {

 return(
    <Menu style={styles.headerRightMenu}>
        <MenuTrigger style={styles.headerRightMenuTriggerStyle}>
            <HeaderButtons HeaderButtonComponent={OptionsHeaderButton}>
                <Item 
                    title="OPTIONS" 
                    iconName="options-vertical"
                />
            </HeaderButtons>
        </MenuTrigger>
            <MenuOptions customStyles={{ OptionTouchableComponent: TouchableOpacity }}>
                <MenuOption onSelect={markAsCompleted} value={"Mark as completed"}>
                    <DefaultText style={styles.menuOptionText}>Mark as completed</DefaultText>
                </MenuOption>
                <MenuOption onSelect={renameGoal}>
                    <DefaultText style={styles.menuOptionText}>Rename goal</DefaultText>
                </MenuOption>
            </MenuOptions>
    </Menu>
 );
};

const styles = StyleSheet.create({
    headerRightMenu: { 
        justifyContent: "center", 
        alignItems: "center", 
        height: 50, 
        width: 50, 
        borderRadius: 25, 
        overflow: "hidden", 
    },
    headerRightMenuTriggerStyle: { 
        height: "100%", 
        width: "100%", 
        justifyContent: "center", 
        alignItems: "center", 
    },
    menuOptionText: {
        padding: 5,
    },
});

export default EditGoalMenu;