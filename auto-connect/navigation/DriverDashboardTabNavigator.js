import React from "react";
import { createBottomTabNavigator } from "react-navigation";
import DriverRoutesScreen from "../screens/DriverRoutes";
import LivePassengersScreen from "../screens/LivePassengers";
import C from "../screens/C";

const DashboardTabNavigator = createBottomTabNavigator(
  {
    Routes: DriverRoutesScreen,
    LivePassengers: LivePassengersScreen,
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
