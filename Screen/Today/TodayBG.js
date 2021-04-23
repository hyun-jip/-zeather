import React, { useState } from "react";
import { Settings } from "react-native";
import { useEffect } from "react/cjs/react.development";
import { getWeather } from "../../API";
import TodayUIUX from "./TodayUIUX";

export default ({ coordsState }) => {
  const [currentDataState, setCurrentDataState] = useState({
    loading: true,
    main: null,
    currentData: [],
    currentDataError: null,
  });

  const getCurrentData = async () => {
    const [currentData, currentDataError] = await getWeather(
      coordsState.latitude,
      coordsState.longitude
    );
    setCurrentDataState({
      loading: false,
      main: currentData.current.weather[0].main,
      currentData,
      currentDataError,
    });
  };

  useEffect(() => {
    getCurrentData();
    // console.log(coordsState.latitude);
  }, [coordsState]);

  return (
    <TodayUIUX
      refreshFn={getCurrentData}
      {...currentDataState}
      geoCodeName={coordsState.geoCodeName}
    />
  );
};
