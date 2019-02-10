import React from "react";
import { createBottomTabNavigator } from "react-navigation";
import Routes from "../screens/Routes";
import LiveAutos from "../screens/LiveAutos";
import Pickup from "../screens/Pickup";

const DashboardTabNavigator = createBottomTabNavigator(
  {
    Routes,
    LiveAutos,
    Pickup
  },
  {
    navigationOptions: ({ navigation }) => {
      const { routeName } = navigation.state.routes[navigation.state.index];
      return {
        headerTitle: routeName
      };
    }
  }
);

export default DashboardTabNavigator;
