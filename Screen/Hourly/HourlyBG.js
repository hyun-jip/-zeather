import React, { useEffect, useState } from "react";
import { getWeather } from "../../API";
import HourlyUIUX from "./HourlyUIUX";

export default () => {
  const [hourlyDataState, setHourlyDataState] = useState({
    loading: true,
    main: null,
    hourlyData: [],
    hourlyDataError: null,
  });

  const getHourlyData = async () => {
    const [hourlyData, hourlyDataError] = await getWeather();
    setHourlyDataState({
      loading: false,
      main: hourlyData.current.weather[0].main,
      hourlyData,
      hourlyDataError,
    });
  };

  useEffect(() => {
    getHourlyData();
  }, []);

  return <HourlyUIUX refreshFn={getHourlyData} {...hourlyDataState} />;
};
