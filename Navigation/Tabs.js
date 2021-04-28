import React, { useEffect, useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AntDesign } from "@expo/vector-icons";
import Settings from "../Screen/Settings";
import { useLayoutEffect } from "react";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import TodayBG from "../Screen/Today/TodayBG";
import ForecastBG from "../Screen/Forecast/ForecastBG";
import HourlyBG from "../Screen/Hourly";
import { Alert } from "react-native";
import * as Location from "expo-location";

const Tab = createBottomTabNavigator();

const getHeaderName = (route) => getFocusedRouteNameFromRoute(route) || "지금";

export default ({ navigation, route }) => {
  const [coordsState, setCoordsState] = useState({
    loading: false,
    latitude: null,
    longitude: null,
    geoCodeName: null,
    geocodeAPI: [],
  });

  useLayoutEffect(() => {
    const title = getHeaderName(route);
    navigation.setOptions({ title, headerTitleAlign: "center" });
  }, [navigation, route]);

  const getLocation = async () => {
    try {
      await Location.requestPermissionsAsync();
      const {
        coords: { latitude, longitude },
      } = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });
      setCoordsState({
        loading: false,
        latitude: latitude,
        longitude: longitude,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getLocation();
  }, []);

  return coordsState.loading ? null : (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "지금") {
            iconName = "staro";
          } else if (route.name === "시간") {
            iconName = "clockcircleo";
          } else if (route.name === "주간") {
            iconName = "barchart";
          } else if (route.name === "설정") {
            iconName = "find";
          }
          return (
            <AntDesign
              name={iconName}
              size={26}
              color={focused ? "#1177e6" : "grey"}
            />
          );
        },
      })}
    >
      <Tab.Screen
        name="지금"
        children={() => (
          <TodayBG coordsState={coordsState} setCoordsState={setCoordsState} />
        )}
      />
      <Tab.Screen
        name="시간"
        children={() => (
          <HourlyBG coordsState={coordsState} setCoordsState={setCoordsState} />
        )}
      />
      <Tab.Screen
        name="주간"
        children={() => (
          <ForecastBG
            coordsState={coordsState}
            setCoordsState={setCoordsState}
          />
        )}
      />
      <Tab.Screen
        name="설정"
        children={() => (
          <Settings
            coordsState={coordsState}
            setCoordsState={setCoordsState}
            getLocation={getLocation}
          />
        )}
      />
    </Tab.Navigator>
  );
};
