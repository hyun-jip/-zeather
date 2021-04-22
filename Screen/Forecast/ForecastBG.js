import React, { useEffect, useState } from "react";
import { getWeather } from "../../API";
import ForecastUIUX from "./ForecastUIUX";

export default ({ coordsState }) => {
  const [futureDataState, setFutureDataState] = useState({
    loading: true,
    main: null,
    futureData: [],
    futureDataError: null,
  });

  const getFutureData = async () => {
    const [futureData, futureDataError] = await getWeather(
      coordsState.latitude,
      coordsState.longitude
    );
    setFutureDataState({
      loading: false,
      main: futureData.current.weather[0].main,
      futureData,
      futureDataError,
    });
  };

  useEffect(() => {
    getFutureData();
  }, [coordsState]);

  return <ForecastUIUX refreshFn={getFutureData} {...futureDataState} />;
};
