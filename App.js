import React, { useState } from 'react';
import * as Font from "expo-font";
import { AppLoading } from "expo";
import { enableScreens } from "react-native-screens";

//React-Redux Setup
import { createStore, combineReducers } from "redux";
import { Provider } from "react-redux";
import userReducer from "./store/reducers/user";

//Navigation
import NavigationController from "./navigation/NavigationController";

//Initialize enableScreens for faster performance
enableScreens();

//Initialize React-Redux
const rootReducer = combineReducers({
  userReducer
});
const store = createStore(rootReducer);

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
    return (
      <Provider store={store}>
        <NavigationController />
      </Provider>
    );
  }
};