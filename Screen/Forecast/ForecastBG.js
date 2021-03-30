import React, { useEffect, useState } from "react";
import { getWeather } from "../../API";
import ForecastUIUX from "./ForecastUIUX";

export default () => {
  const [futureDataState, setFutureDataState] = useState({
    loading: true,
    futureData: [],
    futureDataError: null,
  });

  const getFutureData = async () => {
    const [futureData, futureDataError] = await getWeather();
    setFutureDataState({
      loading: false,
      futureData,
      futureDataError,
    });
  };

  useEffect(() => {
    getFutureData();
  }, []);

  return <ForecastUIUX refreshFn={getFutureData} {...futureDataState} />;
};
