import React from "react";
import { createStackNavigator } from "react-navigation";

import PayScreen from "../screens/Pay";
import FinalPayScreen from "../screens/FinalPay";

const PayStackNavigator = createStackNavigator(
  {
    Pay: PayScreen,
    FinalPay: FinalPayScreen
  }
);

export default PayStackNavigator;
