import React, { useState } from "react";
import { Text, View } from "react-native";
import { useEffect } from "react/cjs/react.development";
import { getWeather } from "../API";

export default () => {
  const [fu, setFu] = useState({ fuda: [], fudaE: null });

  const getdata = async () => {
    const [fuda, fudaE] = await getWeather();
    setFu({ fuda, fudaE });
  };

  console.log(fu.fuda.current);
  useEffect(() => {
    getdata();
  }, []);

  return (
    <View>
      <Text>{fu.fuda.current.weather[0].description}</Text>
    </View>
  );
};
