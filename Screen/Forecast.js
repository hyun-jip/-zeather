import React from "react";
import { Text, View } from "react-native";
import { useEffect } from "react/cjs/react.development";
import { getData } from "../API";

export default () => {
  useEffect(() => {
    getData();
  }, []);

  return (
    <View>
      <Text>Forecast</Text>
    </View>
  );
};
