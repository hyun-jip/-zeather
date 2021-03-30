import { useNavigation } from "@react-navigation/core";
import React, { useLayoutEffect } from "react";
import { Dimensions, Text, View } from "react-native";
import styled from "styled-components";
import RefreshingScroll from "../../Component/RefreshingScroll";
import SmallSwiperContainer from "../../Component/SmallSwiperContainer";
import { formatFutureDate } from "../../Util";
import { weatherOptions } from "../../Weather";

const { width: WIDTH, height: HEIGHT } = Dimensions.get("window");

const BGcolor = styled.View`
  background-color: #f2e7e7;
  height: 100%;
`;

const SemiOpacity = styled.View`
  background-color: rgba(255, 255, 255, 0.5);
`;

const EmptySpace = styled.View`
  height: 80px;
`;

const DailyMainContainer1 = styled.View`
  height: 300px;
  align-items: center;
`;

const DailyMainContainer2 = styled.View`
  height: 200px;
  padding: 0px 50px;
  flex-direction: row;
`;

const DailySubContainer1 = styled.View`
  align-items: center;
  width: 160px;
  padding: 0px 0px;
`;

const DailySubContainer2 = styled.View`
  align-items: center;
  width: 70px;
  height: 60px;
  padding: 0px 0px;
  margin-left: 10px;
  margin-top: 40px;
`;

const DailySubContainer3 = styled.View`
  margin-top: 25px;
  align-items: center;
`;

const DailySubContainer4 = styled.View`
  flex-direction: row;
`;

const Line = styled.View`
  background-color: black;
  height: 2px;
  width: ${WIDTH / 2}px;
  margin-bottom: 20px;
  margin-top: 30px;
`;

const Icon = styled.Text`
  font-size: 100px;
`;

const Temp = styled.Text`
  font-size: 40px;
`;

const MINMAX = styled.Text`
  font-size: 20px;
`;

export default ({ refreshFn, loading, futureData, main }) => {
  const navigation = useNavigation();
  useLayoutEffect(() => navigation.setOptions({ headerTitleAlign: "center" }));

  return loading ? null : (
    <BGcolor>
      <RefreshingScroll refreshFn={refreshFn} loading={loading}>
        <EmptySpace></EmptySpace>
        <SemiOpacity>
          <SmallSwiperContainer>
            {futureData.daily.map((data) => (
              <DailyMainContainer1>
                <DailyMainContainer2>
                  <DailySubContainer1>
                    <Icon>{weatherOptions[data.weather[0].main].icon}</Icon>
                    <Temp>{Math.round(data.temp.day)}℃</Temp>
                  </DailySubContainer1>
                  <DailySubContainer1>
                    <DailySubContainer4>
                      <DailySubContainer2>
                        <MINMAX>MIN</MINMAX>
                        <MINMAX>{Math.round(data.temp.min)}</MINMAX>
                      </DailySubContainer2>
                      <DailySubContainer2>
                        <MINMAX>MAX</MINMAX>
                        <MINMAX>{Math.round(data.temp.max)}</MINMAX>
                      </DailySubContainer2>
                    </DailySubContainer4>
                    <DailySubContainer3>
                      <MINMAX>RAIN/SNOW</MINMAX>
                      <MINMAX>
                        {Math.round(data.rain || data.snow || 0)}mm
                      </MINMAX>
                    </DailySubContainer3>
                  </DailySubContainer1>
                </DailyMainContainer2>
                <Line></Line>
                <MINMAX>{formatFutureDate(data.dt)}</MINMAX>
              </DailyMainContainer1>
            ))}
          </SmallSwiperContainer>
        </SemiOpacity>
      </RefreshingScroll>
    </BGcolor>
  );
};
