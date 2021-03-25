import { useNavigation } from "@react-navigation/core";
import React, { useLayoutEffect } from "react";
import { View, Text, Dimensions } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import styled from "styled-components";
import RefreshingScroll from "../../Component/RefreshingScroll";
import SwiperContainer from "../../Component/SwiperContainer";
import { formatHour } from "../../Util";

const { width: WIDTH, height: HEIGHT } = Dimensions.get("window");

const EmptySpace = styled.View`
  height: 60px;
`;

const Vertical = styled.View`
  width: ${WIDTH / 7}px;
`;

export default ({ refreshFn, loading, hourlyData }) => {
  const navigation = useNavigation();
  useLayoutEffect(() => navigation.setOptions({ headerTitleAlign: "center" }));

  console.log(hourlyData);

  const hourlyHeader = hourlyData.hourly;

  return loading ? null : (
    <RefreshingScroll refreshFn={refreshFn} loading={loading}>
      <EmptySpace></EmptySpace>
      <SwiperContainer>
        <Vertical>
          <Text>{formatHour(hourlyHeader[0].dt)}</Text>
          <Text>🚍</Text>
          <Text>{hourlyHeader[0].temp}</Text>
          <Text>{hourlyHeader[0].wind_speed}</Text>
          <Text>{hourlyHeader[0].clouds}</Text>
          <Text>{hourlyHeader[0].rain["1h"] || 0}</Text>
        </Vertical>
      </SwiperContainer>
    </RefreshingScroll>
  );
};
