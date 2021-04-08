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
  width: ${WIDTH / 7};
  height: 100%;
`;

const HourlyText = styled.Text`
  font-size: 30px;
`;

const HourlySmallText = styled.Text`
  font-size: 20px;
`;

const HourlySmallRedText = styled.Text`
  font-size: 20px;
  color: #774558;
`;

const ColumnView = styled.View`
  align-items: center;
  justify-content: space-around;
  height: ${HEIGHT / 2}px;
`;

const LeftView = styled.View`
  width: ${WIDTH / 7};
  height: 100%;
`;

const RowView = styled.View`
  flex-direction: row;
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
          <RowView>
            <LeftView>
              <ColumnView>
                <HourlySmallText></HourlySmallText>
                <HourlyText></HourlyText>
                <HourlySmallRedText>온도</HourlySmallRedText>
                <HourlySmallRedText>풍속</HourlySmallRedText>
                <HourlySmallRedText>구름</HourlySmallRedText>
                <HourlySmallRedText>눈비</HourlySmallRedText>
              </ColumnView>
            </LeftView>
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
          </RowView>
        </RefreshingScroll>
      </BGColor>
    </LinearGradient>
  );
};
