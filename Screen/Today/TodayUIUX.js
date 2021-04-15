import React, { useLayoutEffect, useState } from "react";
import { Dimensions, Text, View } from "react-native";
import SwiperContainer from "../../Component/SwiperContainer";
import RefreshingScroll from "../../Component/RefreshingScroll";
import styled from "styled-components/native";
import { formatTime, formatSunTime, formatSunAMPM } from "../../Util";
import { useNavigation } from "@react-navigation/core";
import { TouchableOpacity } from "react-native-gesture-handler";

import { weatherOptions } from "../../Weather";
import { LinearGradient } from "expo-linear-gradient";

const { width: WIDTH, height: HEIGHT } = Dimensions.get("window");

const BGColor = styled.View`
  width: 100%;
  height: 100%;
`;

const TodayContainer = styled.View`
  margin-top: 20px;
  width: 100%;
  align-items: center;
`;

const TempContainer = styled.View`
  flex-direction: row;
  align-items: baseline;
`;

const STContainer = styled.View`
  align-items: baseline;
`;

const RainSnowContainer = styled.View`
  margin-top: 20px;
  width: 100%;
  align-items: center;
`;

const HumidContainer = styled.View`
  margin-top: 20px;
  width: 100%;
  align-items: center;
`;

const CloudContainer = styled.View`
  margin-top: 20px;
  width: 100%;
  align-items: center;
`;
const SuntimeContainer = styled.View`
  margin-top: 20px;
  width: 100%;
  align-items: center;
`;

const WindyContainer = styled.View`
  margin-top: 20px;
  width: 100%;
  align-items: center;
`;

const IconText = styled.Text`
  font-size: 100px;
`;
const NumText = styled.Text`
  font-size: 80px;
`;

const CText = styled.Text`
  font-size: 50px;
  padding-bottom: 13px;
`;

const Description = styled.Text`
  font-size: 26px;
`;

const Line = styled.View`
  background-color: black;
  height: 1.5px;
  width: ${WIDTH / 3}px;
  margin-bottom: 20px;
`;

const LineCenter = styled.View`
  align-items: center;
`;

const AMPMContainer = styled.View`
  flex-direction: row;
  align-items: baseline;
  margin-top: 20px;
  margin-bottom: 20px;
`;

const TimeStamp = styled.Text`
  font-size: 17px;
`;

const Suntime = styled.Text`
  font-size: 50px;
`;

const AMPM = styled.Text`
  font-size: 20px;
  padding-bottom: 5px;
`;

export default ({ refreshFn, loading, currentData, main }) => {
  const currentHeader = currentData.current;
  return loading ? null : (
    <LinearGradient colors={weatherOptions[main].gradient}>
      <BGColor>
        <RefreshingScroll refreshFn={refreshFn} loading={loading}>
          <SwiperContainer>
            <Text>{currentHeader.temp}</Text>
            <TodayContainer>
              <IconText>{weatherOptions[main].icon}</IconText>
              <TempContainer>
                <NumText>{Math.round(currentHeader.temp)}</NumText>
                <CText>℃</CText>
              </TempContainer>
              <Description>{currentHeader.weather[0].description}</Description>
            </TodayContainer>
            <RainSnowContainer>
              <IconText>☔</IconText>
              <TempContainer>
                <NumText>
                  {currentHeader.rain?.["1h"] ||
                    currentHeader.snow?.["1h"] ||
                    0}
                </NumText>
                <CText>㎜</CText>
              </TempContainer>
              <Description>강수/강설</Description>
            </RainSnowContainer>
            <HumidContainer>
              <IconText>💧</IconText>
              <TempContainer>
                <NumText>{currentHeader.humidity}</NumText>
                <CText>%</CText>
              </TempContainer>
              <Description>습도</Description>
            </HumidContainer>
            <CloudContainer>
              <IconText>☁</IconText>
              <TempContainer>
                <NumText>{currentHeader.clouds}</NumText>
                <CText>%</CText>
              </TempContainer>
              <Description>구름</Description>
            </CloudContainer>
            <SuntimeContainer>
              <IconText>🌅</IconText>
              <STContainer>
                <AMPMContainer>
                  <Suntime>{formatSunTime(currentHeader.sunrise)}</Suntime>
                  <AMPM>{formatSunAMPM(currentHeader.sunrise)}</AMPM>
                  <Suntime> {formatSunTime(currentHeader.sunset)}</Suntime>
                  <AMPM>{formatSunAMPM(currentHeader.sunset)}</AMPM>
                </AMPMContainer>
              </STContainer>
              <Description>일출/일몰</Description>
            </SuntimeContainer>
            <WindyContainer>
              <IconText>🌬</IconText>
              <TempContainer>
                <NumText>
                  {Math.round(currentHeader.wind_speed * 10) / 10}
                </NumText>
                <CText>㎧</CText>
              </TempContainer>
              <Description>바람</Description>
            </WindyContainer>
          </SwiperContainer>
          <LineCenter>
            <Line></Line>
            <TimeStamp>
              {formatTime(currentHeader.dt * 1000)} 현재위치 기준
            </TimeStamp>
          </LineCenter>
        </RefreshingScroll>
      </BGColor>
    </LinearGradient>
  );
};
