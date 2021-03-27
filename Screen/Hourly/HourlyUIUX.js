import { useNavigation } from "@react-navigation/core";
import { LinearGradient } from "expo-linear-gradient";
import React, { useLayoutEffect } from "react";
import { View, Text, Dimensions } from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import styled from "styled-components";
import RefreshingScroll from "../../Component/RefreshingScroll";
import SwiperContainer from "../../Component/SwiperContainer";
import { formatHour } from "../../Util";
import { weatherOptions } from "../../Weather";

const { width: WIDTH, height: HEIGHT } = Dimensions.get("window");

const BGColor = styled.View`
  width: 100%;
  height: 100%;
`;

const EmptySpace = styled.View`
  height: 130px;
`;

const Vertical = styled.View`
  width: ${WIDTH / 6};
  height: 100%;
`;

const HourlyText = styled.Text`
  font-size: 30px;
`;

const HourlySmallText = styled.Text`
  font-size: 20px;
`;

const ColumnView = styled.View`
  align-items: center;
  justify-content: space-around;
  height: ${HEIGHT / 2}px;
`;

export default ({ refreshFn, loading, hourlyData, main }) => {
  const navigation = useNavigation();
  useLayoutEffect(() => navigation.setOptions({ headerTitleAlign: "center" }));

  // console.log(hourlyData);

  const hourlyHeader = hourlyData.hourly;

  return loading ? null : (
    <LinearGradient colors={weatherOptions[main].gradient}>
      <BGColor>
        <RefreshingScroll refreshFn={refreshFn} loading={loading}>
          <EmptySpace></EmptySpace>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {hourlyHeader.slice(0, 24).map((data) => (
              <Vertical>
                <ColumnView>
                  <HourlySmallText>{formatHour(data.dt)}</HourlySmallText>
                  <HourlyText>{weatherOptions[main].icon}</HourlyText>
                  <HourlySmallText>{data.temp}</HourlySmallText>
                  <HourlySmallText>{data.wind_speed}</HourlySmallText>
                  <HourlySmallText>{data.clouds}</HourlySmallText>
                  <HourlySmallText>{data.rain?.["1h"] || 0}</HourlySmallText>
                </ColumnView>
              </Vertical>
            ))}
          </ScrollView>
        </RefreshingScroll>
      </BGColor>
    </LinearGradient>
  );
};
