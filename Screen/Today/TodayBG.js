import React, { useState } from "react";
import { Text, View } from "react-native";
import { useEffect } from "react/cjs/react.development";
import { getWeather } from "../../API";
import TodayUIUX from "./TodayUIUX";

export default () => {
  const [currentDataState, setCurrentDataState] = useState({
    loading: true,
    currentData: {},
    currentDataError: null,
  });

  const getCurrentData = async () => {
    const [currentData, currentDataError] = await getWeather();
    setCurrentDataState({ loading: false, currentData, currentDataError });
  };

  useEffect(() => {
    getCurrentData();
  }, []);

  return <TodayUIUX refreshFn={getCurrentData} {...currentDataState} />;
};
