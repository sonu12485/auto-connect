import React from "react";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import MainDrawerNavigator from "./MainDrawerNavigator";
import MainDriverDrawerNavigator from "./MainDriverDrawerNavigator";
import AuthLoadingScreen from "../screens/AuthLoadingScreen";
// import MainDriverScreen from "../screens/MainDriverScreen";
import WelcomeScreen from "../screens/WelcomeScreen";

export default createAppContainer(
  createSwitchNavigator({
    AuthLoading: AuthLoadingScreen,
    Welcome: WelcomeScreen,
    Main: MainDrawerNavigator,
    MainDriver: MainDriverDrawerNavigator
  })
);
