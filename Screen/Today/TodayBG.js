import React, { useState } from "react";
import { Text, View } from "react-native";
import { useEffect } from "react/cjs/react.development";
import { getWeather } from "../../API";
import TodayUIUX from "./TodayUIUX";

export default () => {
  const [isReady, setIsReady] = useState(false);
  const [currentDataState, setCurrentDataState] = useState({
    currentData: [],
    currentDataError: null,
  });

  const getCurrentData = async () => {
    const [currentData, currentDataError] = await getWeather();
    setCurrentDataState({ currentData, currentDataError });
    setIsReady(true);
  };

  useEffect(() => {
    getCurrentData();
  }, []);

  return isReady ? <TodayUIUX {...currentDataState} /> : null;
};
