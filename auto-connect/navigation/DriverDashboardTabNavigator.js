import React from "react";
import { createBottomTabNavigator } from "react-navigation";
import A from "../screens/A";
import B from "../screens/B";
import C from "../screens/C";

const DashboardTabNavigator = createBottomTabNavigator(
  {
    A,
    B,
    C
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
