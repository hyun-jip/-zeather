import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Today from "../Screen/Today";
import Forecast from "../Screen/Forecast";
import Past from "../Screen/Past";
import Settings from "../Screen/Settings";

const Tab = createBottomTabNavigator();

export default () => (
  <Tab.Navigator>
    <Tab.Screen name="Today" component={Today} />
    <Tab.Screen name="Forecast" component={Forecast} />
    <Tab.Screen name="Past" component={Past} />
    <Tab.Screen name="Settings" component={Settings} />
  </Tab.Navigator>
);
