import React, { useState } from 'react';
import * as Font from "expo-font";
import { AppLoading } from "expo";
import { enableScreens } from "react-native-screens";

//Navigation
import NavigationController from "./navigation/NavigationController";
import { NavigationContainer } from '@react-navigation/native';

//Initialize enableScreens for faster performance
enableScreens();

//Initialize Fonts
function fetchFonts() {
  return Font.loadAsync({
    "myriad": require("./assets/fonts/Myriad-Pro-Regular.ttf"),
    "myriadBold": require("./assets/fonts/Myriad-Pro-Bold.ttf"),
    "myriadSemiBold": require("./assets/fonts/Myriad-Pro-Semibold.ttf"),
    "myriadItalic": require("./assets/fonts/Myriad-Pro-Italic.ttf"),
  });
};

//Main Component
export default function App() { 
  //Initialize States
  const [fontLoaded, setFontLoaded] = useState(false);
  if (!fontLoaded) {
    return <AppLoading startAsync={fetchFonts} onFinish={() => setFontLoaded(true)} />;
  } else {
    return <NavigationController />;
  }
};