import React, { useState } from 'react';
import * as Font from "expo-font";
import { AppLoading } from "expo";
import { enableScreens } from "react-native-screens";
import { MenuProvider } from "react-native-popup-menu";

//React-Redux Setup
import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import ReduxThunk from "redux-thunk";
//Reducers
import userReducer from "./store/reducers/user";
import goalsNavigationReducer from "./store/reducers/navigation/goalNavigation";
import homeNavigationReducer from "./store/reducers/navigation/homeNavigation";
import authReducer from "./store/reducers/auth";

//Navigation
import NavigationController from "./navigation/NavigationController";

//Initialize enableScreens for faster performance
enableScreens();

//Initialize React-Redux
const rootReducer = combineReducers({
  userReducer,
  goalsNavigationReducer,
  homeNavigationReducer,
  authReducer,
});
const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

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

//Main Component
export default function App() { 
  //Initialize States
  const [fontLoaded, setFontLoaded] = useState(false);

  if (!fontLoaded) {
    return <AppLoading startAsync={fetchFonts} onFinish={() => setFontLoaded(true)} />;
  } 

  else {
    return (
      <Provider store={store}>
        <MenuProvider>
          <NavigationController />
        </MenuProvider>
      </Provider>
    );
  }
};