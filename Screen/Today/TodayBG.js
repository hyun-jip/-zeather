import React, { useState } from "react";
import { useEffect } from "react/cjs/react.development";
import { getWeather } from "../../API";
import TodayUIUX from "./TodayUIUX";

export default () => {
  const [currentDataState, setCurrentDataState] = useState({
    loading: true,
    main: null,
    currentData: [],
    currentDataError: null,
  });

  const getCurrentData = async () => {
    const [currentData, currentDataError] = await getWeather();
    setCurrentDataState({
      loading: false,
      main: currentData.current.weather[0].main,
      currentData,
      currentDataError,
    });
  };

  useEffect(() => {
    getCurrentData();
  }, []);

  return <TodayUIUX refreshFn={getCurrentData} {...currentDataState} />;
};