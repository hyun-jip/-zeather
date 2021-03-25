import React from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import Swiper from "react-native-web-swiper";
import styled from "styled-components/native";

const { width: WIDTH, height: HEIGHT } = Dimensions.get("window");

const Container = styled.View`
  width: 100%;
  height: ${HEIGHT / 2.3}px;
  margin-top: 60px;
  background-color: blue;
`;

const SwiperContainer = ({ children }) => (
  <>
    <Container>
      <Swiper controlsEnabled={false} loop timeout={3}>
        {children}
      </Swiper>
    </Container>
  </>
);

export default SwiperContainer;
