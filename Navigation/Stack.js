import React, { useLayoutEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Tabs from "./Tabs";
import HourlyBG from "../Screen/Hourly/HourlyBG";

const Stack = createStackNavigator();

export default () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Tab" component={Tabs} />
      <Stack.Screen name="Hourly" component={HourlyBG} />
    </Stack.Navigator>
  );
};
