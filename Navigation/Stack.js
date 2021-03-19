import React, { useLayoutEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Tabs from "./Tabs";
import HourlyUIUX from "../Screen/Hourly/HourlyUIUX";

const Stack = createStackNavigator();

export default () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Tab" component={Tabs} />
      <Stack.Screen name="Hourly" component={HourlyUIUX} />
    </Stack.Navigator>
  );
};
