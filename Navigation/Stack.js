import React, { useLayoutEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Tabs from "./Tabs";
import Hourly from "../Screen/Hourly/Hourly";

const Stack = createStackNavigator();

export default () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Tab" component={Tabs} />
      <Stack.Screen name="Hourly" component={Hourly} />
    </Stack.Navigator>
  );
};
