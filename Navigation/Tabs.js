import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import Today from "../Screen/Today";
import Forecast from "../Screen/Forecast";
import Past from "../Screen/Past";
import Settings from "../Screen/Settings";
import { useLayoutEffect } from "react";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";

const Tab = createBottomTabNavigator();

const getHeaderName = (route) => getFocusedRouteNameFromRoute(route) || "Today";

export default ({ navigation, route }) => {
  useLayoutEffect(() => {
    const title = getHeaderName(route);
    navigation.setOptions({ title, headerTitleAlign: "center" });
  }, [navigation, route]);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Today") {
            iconName = "smileo";
          } else if (route.name === "Forecast") {
            iconName = "linechart";
          } else if (route.name === "Past") {
            iconName = "profile";
          } else if (route.name === "Settings") {
            iconName = "setting";
          }
          return (
            <AntDesign
              name={iconName}
              size={26}
              color={focused ? "skyblue" : "grey"}
            />
          );
        },
      })}
    >
      <Tab.Screen name="Today" component={Today} />
      <Tab.Screen name="Forecast" component={Forecast} />
      <Tab.Screen name="Past" component={Past} />
      <Tab.Screen name="Settings" component={Settings} />
    </Tab.Navigator>
  );
};
