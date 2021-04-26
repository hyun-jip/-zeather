import React, { useEffect, useState } from "react";
import {
  Dimensions,
  Text,
  View,
  StyleSheet,
  Button,
  Keyboard,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import axios from "axios";

import Geocoder from "react-native-geocoding";
import styled from "styled-components";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#d7f1f0",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 50,
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height * 0.6,
  },
  touchableOpacity: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
  },
});

const Google_API_KEY = "AIzaSyAqe6s7YjvCTBbZSaYWayULASiO180dHCM";

const SearchView = styled.View`
  margin-vertical: 10px;
  flex-direction: row;
  justify-content: center;
`;

const InfoView = styled.View`
  background-color: #3ba2b9;
  height: 30px;
  align-items: center;
  justify-content: center;
`;

const SettedLocationView = styled.View`
  height: 30px;
  align-items: center;
  justify-content: center;
  margin-top: 7px;
`;

const SettedLocationText = styled.Text`
  color: black;
`;

const InfoText = styled.Text`
  color: white;
`;

const BGcolor = styled.View`
  background-color: #eef2f3;
`;

const SettingView = styled.View`
  background-color: #3ba2b9;
  height: 37px;
  align-items: center;
  justify-content: center;
  width: 170px;
  border-radius: 2px;
`;

export default ({ coordsState, setCoordsState }) => {
  const [currentCoordsState, setCurrentCoordsState] = useState({
    loading: true,
    currentLatitude: null,
    currentLongitude: null,
    markers: null,
    geocodeResult: null,
  });

  const getGeocodeName = async (Lat, Long) => {
    try {
      const { data } = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${
          Lat || 37.35446511617107
        },${Long || 126.96066018193959}&key=${Google_API_KEY}&language=ko`
      );
      return data;
    } catch (e) {
      console.log(e);
      return e;
    }
  };

  const setCodeName = async () => {
    const geocodeAPI = await getGeocodeName(
      currentCoordsState.markers.latitude,
      currentCoordsState.markers.longitude
    );
    setCoordsState({
      latitude: currentCoordsState.markers.latitude,
      longitude: currentCoordsState.markers.longitude,
      geocodeAPI,
      geoCodeName: geocodeAPI.results[0].address_components[1].short_name,
    });
  };

  const searchGeocode = async (keyword) => {
    try {
      Geocoder.init(Google_API_KEY, { language: "ko" });

      const geocodeResult = await Geocoder.from(keyword);
      //  const location = json.results[0].geometry.location;
      setCurrentCoordsState({
        currentLatitude: geocodeResult.results[0].geometry.location.lat,
        currentLongitude: geocodeResult.results[0].geometry.location.lng,
        geocodeResult,
        markers: {
          latitude: geocodeResult.results[0].geometry.location.lat,
          longitude: geocodeResult.results[0].geometry.location.lng,
        },
      });
    } catch (e) {
      console.warn(error);
    }
  };

  const [value, onChangeText] = useState();

  const buttonPress = () => {
    searchGeocode(value);
    <MapView
      region={{
        latitude: currentCoordsState.currentLatitude,
        longitude: currentCoordsState.currentLongitude,
      }}
    />;
    Keyboard.dismiss();
  };

  return coordsState.loading ? null : (
    <BGcolor>
      <InfoView>
        <InfoText>지도를 탭하거나 지명을 검색하여 마커를 설정하세요</InfoText>
      </InfoView>
      <SettedLocationView>
        <SettedLocationText>
          현재 설정위치: {coordsState.geoCodeName || "설정된 마커없음"}
        </SettedLocationText>
      </SettedLocationView>
      <SearchView>
        <TextInput
          style={{
            height: 40,
            width: Dimensions.get("window").width * 0.6,
            borderColor: "gray",
            backgroundColor: "white",
            borderWidth: 1,
          }}
          onChangeText={(text) => onChangeText(text)}
          placeholder={" 검색어를 입력하세요"}
          value={value}
          onSubmitEditing={buttonPress}
        />
        <Button title="검색" onPress={buttonPress} color={"#3ba2b9"} />
      </SearchView>

      <TouchableOpacity onPress={setCodeName} style={styles.touchableOpacity}>
        <SettingView>
          <InfoText>마커 위치로 날씨 설정</InfoText>
        </SettingView>
      </TouchableOpacity>

      <MapView
        style={styles.map}
        showsUserLocation={true}
        showsMyLocationButton={true}
        initialRegion={{
          latitude: coordsState.latitude,
          longitude: coordsState.longitude,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        }}
        region={{
          latitude: currentCoordsState.currentLatitude,
          longitude: currentCoordsState.currentLongitude,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        }}
        onPress={(e) => {
          setCurrentCoordsState({ markers: e.nativeEvent.coordinate });
        }}
      >
        {currentCoordsState.markers && (
          <Marker coordinate={currentCoordsState.markers} />
        )}
      </MapView>
    </BGcolor>
  );
};
