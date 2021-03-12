import React, { useState } from "react";
import { Text, View } from "react-native";
import { useEffect } from "react/cjs/react.development";
import { getWeather } from "../../API";

export default () => {
  const [isReady, setIsReady] = useState(false);
  const [futureDataState, setFutureDataState] = useState({
    futureData: [],
    futureDataError: null,
  });

  const getFutureData = async () => {
    const [futureData, futureDataError] = await getWeather();
    setFutureDataState({ futureData, futureDataError });
    setIsReady(true);
  };

  useEffect(() => {
    getFutureData();
  }, []);

  return isReady ? (
    <View>
      <Text>{futureDataState.futureData.current.weather[0].description}</Text>
    </View>
  ) : null;
};
