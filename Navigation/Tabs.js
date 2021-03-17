import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons, Anticon, AntDesign } from "@expo/vector-icons";
import Today from "../Screen/Today/TodayBG";
import Forecast from "../Screen/Forecast/ForecastBG";
import Past from "../Screen/Past";
import Settings from "../Screen/Settings";
import { useLayoutEffect } from "react";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";

const Tab = createBottomTabNavigator();

const getHeaderName = (route) => getFocusedRouteNameFromRoute(route) || "오늘";

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

          if (route.name === "오늘") {
            iconName = "beer-sharp";
          } else if (route.name === "미래") {
            iconName = "bicycle";
          } else if (route.name === "과거") {
            iconName = "bluetooth";
          } else if (route.name === "설정") {
            iconName = "boat";
          }
          return (
            <Ionicons
              name={iconName}
              size={26}
              color={focused ? "skyblue" : "grey"}
            />
          );
        },
      })}
    >
      <Tab.Screen name="오늘" component={Today} />
      <Tab.Screen name="미래" component={Forecast} />
      <Tab.Screen name="과거" component={Past} />
      <Tab.Screen name="설정" component={Settings} />
    </Tab.Navigator>
  );
};
