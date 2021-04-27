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

const SemiOpacity = styled.View`
  background-color: rgba(255, 255, 255, 0.5);
`;

const EmptySpace = styled.View`
  height: 108px;
`;

const Vertical = styled.View`
  width: ${WIDTH / 7};
  height: 100%;
`;

const HourlyText = styled.Text`
  font-size: 30px;
`;

const HourlyMiddleText = styled.Text`
  font-size: 13px;
  color: #485563;
  font-weight: bold;
  padding-bottom: 5px;
`;

const HourText = styled.Text`
  font-size: 16px;
  color: #485563;
  font-weight: bold;
`;

const HourlySmallText = styled.Text`
  font-size: 20px;
  margin-bottom: 5px;
`;

const ColumnView = styled.View`
  align-items: center;
  justify-content: space-around;
  height: ${HEIGHT / 2}px;
`;

const ColumnView2 = styled.View`
  align-items: center;
  justify-content: space-around;
  height: ${HEIGHT / 2}px;

  background-color: rgba(255, 255, 255, 0.3);
`;

const LeftView = styled.View`
  width: ${WIDTH / 14};
  height: 100%;
`;

const RowView = styled.View`
  flex-direction: row;
`;

const TitleView = styled.View`
  justify-content: center;
  align-items: center;
  margin-top: 3px;
`;

const TitleText = styled.Text`
  font-size: 15px;
  font-weight: 100;
  color: white;
`;

export default ({ refreshFn, loading, hourlyData, main }) => {
  const navigation = useNavigation();
  useLayoutEffect(() => navigation.setOptions({ headerTitleAlign: "center" }));

  const hourlyHeader = hourlyData.hourly;

  return loading ? null : (
    <LinearGradient colors={weatherOptions[main].gradient}>
      <BGColor>
        <RefreshingScroll refreshFn={refreshFn} loading={loading}>
          <EmptySpace></EmptySpace>

          <SemiOpacity>
            <RowView>
              <LeftView>
                <ColumnView2>
                  <HourlyMiddleText></HourlyMiddleText>
                  <HourlyMiddleText></HourlyMiddleText>
                  <HourlyMiddleText>온도</HourlyMiddleText>
                  <HourlyMiddleText>바람</HourlyMiddleText>
                  <HourlyMiddleText>구름</HourlyMiddleText>
                  <HourlyMiddleText>눈비</HourlyMiddleText>
                </ColumnView2>
              </LeftView>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {hourlyHeader.slice(0, 24).map((data) => (
                  <Vertical>
                    <ColumnView>
                      <HourText>
                        {formatHour(data.dt, hourlyData.timezone_offset)}시
                      </HourText>
                      <HourlyText>
                        {weatherOptions[String(data.weather[0].main)].icon}
                      </HourlyText>
                      <HourlySmallText>
                        {Math.round(data.temp * 10) / 10}
                      </HourlySmallText>
                      <HourlySmallText>
                        {Math.round(data.wind_speed * 10) / 10}
                      </HourlySmallText>
                      <HourlySmallText>{data.clouds}</HourlySmallText>
                      <HourlySmallText>
                        {data.rain?.["1h"] || 0}
                      </HourlySmallText>
                    </ColumnView>
                  </Vertical>
                ))}
              </ScrollView>
              <LeftView>
                <ColumnView2>
                  <HourlyMiddleText></HourlyMiddleText>
                  <HourlyMiddleText></HourlyMiddleText>
                  <HourlyMiddleText>℃</HourlyMiddleText>
                  <HourlyMiddleText>㎧</HourlyMiddleText>
                  <HourlyMiddleText>%</HourlyMiddleText>
                  <HourlyMiddleText>㎜</HourlyMiddleText>
                </ColumnView2>
              </LeftView>
            </RowView>
          </SemiOpacity>
          <TitleView>
            <TitleText>좌우로 스크롤 하세요</TitleText>
          </TitleView>
        </RefreshingScroll>
      </BGColor>
    </LinearGradient>
  );
};
