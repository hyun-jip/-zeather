import { useNavigation } from "@react-navigation/core";
import React, { useLayoutEffect } from "react";
import { View, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import styled from "styled-components";

const CenterAlign = styled.View`
  margin-top: 40px;
  align-items: center;
`;

const HourlyUIUX = () => {
  const navigation = useNavigation();
  const gotoHourly = () => {
    navigation.navigate("Hourly");
  };

  useLayoutEffect(() => navigation.setOptions({ headerTitleAlign: "center" }));

  return (
    <CenterAlign>
      <TouchableOpacity onPress={gotoHourly}>
        <Text>detail</Text>
      </TouchableOpacity>
    </CenterAlign>
  );
};
export default HourlyUIUX;
