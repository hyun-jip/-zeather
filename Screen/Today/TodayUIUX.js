import React, { useState } from "react";
import { Text, View } from "react-native";
import SwiperContainer from "../../Component/SwiperContainer";
import RefreshingScroll from "../../Component/RefreshingScroll";
import styled from "styled-components/native";
import { loadAsync } from "expo-font";

const DataContainer = styled.View`
  width: 100%;
  margin-bottom: 60px;
  background-color: green;
`;

export default ({ refreshFn, loading, currentData }) => {
  const currentHeader = currentData.current;

  return loading ? null : (
    <RefreshingScroll refreshFn={refreshFn} loading={loading}>
      <SwiperContainer>
        <DataContainer>
          <Text>{currentHeader.weather[0].main}</Text>
          <Text>{currentHeader.temp}</Text>
          <Text>{currentHeader.weather[0].description}</Text>
        </DataContainer>
      </SwiperContainer>
    </RefreshingScroll>
  );
};
