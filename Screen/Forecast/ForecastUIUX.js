import { useNavigation } from "@react-navigation/core";
import { LinearGradient } from "expo-linear-gradient";
import React, { useLayoutEffect } from "react";
import { Dimensions, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import styled from "styled-components";
import RefreshingScroll from "../../Component/RefreshingScroll";
import SmallSwiperContainer from "../../Component/SmallSwiperContainer";
import { formatFutureDate, formatFutureDay } from "../../Util";
import { weatherOptions } from "../../Weather";

const { width: WIDTH, height: HEIGHT } = Dimensions.get("window");

const BGcolor = styled.View`
  height: 100%;
`;

const SemiOpacity = styled.View`
  background-color: rgba(255, 255, 255, 0.5);
`;

const EmptySpace = styled.View`
  height: 80px;
`;

const EmptySmallSpace = styled.View`
  height: 72px;
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

const WeeklyView = styled.View`
  height: 120px;
  flex-direction: row;
`;

const ColumnView = styled.View`
  align-items: center;
  justify-content: space-around;
  width: ${WIDTH / 8};
`;

const LeftView = styled.View`
  width: ${WIDTH / 7}px;
  align-items: center;
  justify-content: space-around;
  margin-left: 20px;
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

const DateText = styled.Text`
  font-size: 15px;
  color: #485563;
  padding-top: 3px;
  font-weight: bold;
`;

const MiddleText = styled.Text`
  font-size: 13px;
  color: #485563;
  font-weight: bold;
`;

export default ({ refreshFn, loading, futureData, main }) => {
  const navigation = useNavigation();
  useLayoutEffect(() => navigation.setOptions({ headerTitleAlign: "center" }));

  return loading ? null : (
    <LinearGradient colors={weatherOptions[main].gradient}>
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
                          <MINMAX>최저</MINMAX>
                          <MINMAX>{Math.round(data.temp.min)}</MINMAX>
                        </DailySubContainer2>
                        <DailySubContainer2>
                          <MINMAX>최대</MINMAX>
                          <MINMAX>{Math.round(data.temp.max)}</MINMAX>
                        </DailySubContainer2>
                      </DailySubContainer4>
                      <DailySubContainer3>
                        <MINMAX>강우/강설</MINMAX>
                        <MINMAX>
                          {Math.round(data.rain * 10 || data.snow * 10 || 0) /
                            10}
                          mm
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
          <EmptySmallSpace></EmptySmallSpace>

          <SemiOpacity>
            <WeeklyView>
              <LeftView>
                <MiddleText>일자</MiddleText>
                <MiddleText>날씨</MiddleText>
                <MiddleText>온도</MiddleText>
              </LeftView>
              {futureData.daily.slice(0, 6).map((data) => (
                <ColumnView>
                  <DateText>{formatFutureDay(data.dt)}</DateText>
                  <MINMAX>{weatherOptions[data.weather[0].main].icon}</MINMAX>
                  <MINMAX>{Math.round(data.temp.day)}</MINMAX>
                </ColumnView>
              ))}
            </WeeklyView>
          </SemiOpacity>
        </RefreshingScroll>
      </BGcolor>
    </LinearGradient>
  );
};
