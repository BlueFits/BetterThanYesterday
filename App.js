import React, { useState } from 'react';
import * as Font from "expo-font";
import { AppLoading } from "expo";
import { enableScreens } from "react-native-screens";
import { MenuProvider } from "react-native-popup-menu";

//React-Redux Setup
import { createStore, combineReducers } from "redux";
import { Provider } from "react-redux";
//Reducers
import userReducer from "./store/reducers/user";
import goalsNavigationReducer from "./store/reducers/navigation/goalNavigation";
import homeNavigationReducer from "./store/reducers/navigation/homeNavigation";

//Navigation
import NavigationController from "./navigation/NavigationController";

//Initialize enableScreens for faster performance
enableScreens();

//Initialize React-Redux
const rootReducer = combineReducers({
  userReducer,
  goalsNavigationReducer,
  homeNavigationReducer,
});
const store = createStore(rootReducer);

//Initialize Fonts
function fetchFonts() {
  return Font.loadAsync({
    "myriad": require("./assets/fonts/Myriad-Pro-Regular.ttf"),
    "myriadBold": require("./assets/fonts/Myriad-Pro-Bold.ttf"),
    "myriadBoldItalic": require("./assets/fonts/Myriad-Pro-Bold-Italic.ttf"),
    "myriadSemiBold": require("./assets/fonts/Myriad-Pro-Semibold.ttf"),
    "myriadItalic": require("./assets/fonts/Myriad-Pro-Italic.ttf"),
  });
};

console.log(`
  -----Bug Report-----
  -Edit Goals 2
  --deleting a step bug
  --stepname is too long
  -Home
  --page update is too slow//Try putting the render in a state
  --stack header at add Task is too long
  --Long current indicator Text
`);

//Main Component
export default function App() { 
  //Initialize States
  const [fontLoaded, setFontLoaded] = useState(false);
  if (!fontLoaded) {
    return <AppLoading startAsync={fetchFonts} onFinish={() => setFontLoaded(true)} />;
  } else {
    return (
      <Provider store={store}>
        <MenuProvider>
          <NavigationController />
        </MenuProvider>
      </Provider>
    );
  }
};