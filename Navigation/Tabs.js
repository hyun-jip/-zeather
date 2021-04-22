import React, { useEffect, useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons, Anticon, AntDesign } from "@expo/vector-icons";
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
    loading: true,
    latitude: null,
    longitude: null,
    geoCodeName: null,
    geocodeAPI: [],
  });

  const setLATLONG = (LAT, LONG) =>
    setCoordsState({ latitude: LAT, longitude: LONG });

  useLayoutEffect(() => {
    const title = getHeaderName(route);
    navigation.setOptions({ title, headerTitleAlign: "center" });
    console.log(coordsState.geoCodeName);
  }, [navigation, route]);

  const getLocation = async () => {
    try {
      await Location.requestPermissionsAsync();
      const {
        coords: { latitude, longitude },
      } = await Location.getCurrentPositionAsync();
      setCoordsState({
        loading: false,
        latitude: latitude,
        longitude: longitude,
      });
    } catch (error) {
      Alert.alert("Can't find you.", "So sad");
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
            iconName = "beer-sharp";
          } else if (route.name === "오늘") {
            iconName = "bicycle";
          } else if (route.name === "미래") {
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
      <Tab.Screen
        name="지금"
        children={() => <TodayBG coordsState={coordsState} />}
      />
      <Tab.Screen
        name="오늘"
        children={() => (
          <HourlyBG coordsState={coordsState} setCoordsState={setCoordsState} />
        )}
      />
      <Tab.Screen
        name="미래"
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
            aa={coordsState.latitude}
            coordsState={coordsState}
            setCoordsState={setCoordsState}
          />
        )}
      />
    </Tab.Navigator>
  );
};
