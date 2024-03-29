import React from "react";
import { HeaderButton } from "react-navigation-header-buttons";
import { SimpleLineIcons } from "@expo/vector-icons";

const HeaderButtonDarkSimpleLine = (props) => {
    return(
        <HeaderButton 
            {...props} 
            IconComponent={SimpleLineIcons}
            iconSize={23}
        />
    );
};

export default HeaderButtonDarkSimpleLine;