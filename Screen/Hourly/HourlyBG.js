import React, { useEffect, useState } from "react";
import { getWeather } from "../../API";
import HourlyUIUX from "./HourlyUIUX";

export default () => {
  const [hourlyDataState, setHourlyDataState] = useState({
    loading: true,
    hourlyData: [],
    hourlyDataError: null,
  });

  const getHourlyData = async () => {
    const [hourlyData, hourlyDataError] = await getWeather();
    setHourlyDataState({ loading: false, hourlyData, hourlyDataError });
  };

  useEffect(() => {
    getHourlyData();
  }, []);

  return <HourlyUIUX refreshFn={getHourlyData} {...hourlyDataState} />;
};
