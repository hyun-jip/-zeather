import React, { useState } from "react";
import { Text, View } from "react-native";
import SwiperContainer from "../../Component/SwiperContainer";
import RefreshingScroll from "../../Component/RefreshingScroll";
import styled from "styled-components/native";
import { loadAsync } from "expo-font";
import { Ionicons } from "@expo/vector-icons";

const TodayContainer = styled.View`
  margin-top: 20px;
  width: 100%;
  align-items: center;
`;

const TempContainer = styled.View`
  flex-direction: row;
  align-items: baseline;
`;

const RainSnowContainer = styled.View`
  background-color: green;
`;

const HumidContainer = styled.View`
  background-color: green;
`;

const CloudContainer = styled.View`
  background-color: green;
`;
const SuntimeContainer = styled.View`
  background-color: green;
`;

const WindyContainer = styled.View`
  background-color: green;
`;

const IconText = styled.Text`
  font-size: 100px;
`;
const NumText = styled.Text`
  font-size: 80px;
`;

const CText = styled.Text`
  font-size: 40px;
  padding-bottom: 13px;
`;

export default ({ refreshFn, loading, currentData }) => {
  const currentHeader = currentData.current;

  return loading ? null : (
    <RefreshingScroll refreshFn={refreshFn} loading={loading}>
      <SwiperContainer>
        <TodayContainer>
          <Ionicons name="sunny" />
          <TempContainer>
            <NumText>{Math.round(currentHeader.temp)}</NumText>
            <CText>℃</CText>
          </TempContainer>
          <Text>{currentHeader.weather[0].description}</Text>
        </TodayContainer>
        <RainSnowContainer>
          <Text>{currentHeader.humidity}</Text>
        </RainSnowContainer>
      </SwiperContainer>
    </RefreshingScroll>
  );
};
