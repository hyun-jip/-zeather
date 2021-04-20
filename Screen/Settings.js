import React, { useEffect, useState } from "react";
import { Dimensions, Text, View, StyleSheet, Button } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import axios from "axios";

import Geocoder from "react-native-geocoding";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 50,
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height * 0.7,
  },
});

const Google_API_KEY = "AIzaSyAqe6s7YjvCTBbZSaYWayULASiO180dHCM";

export default ({ coordsState, setCoordsState, aa }) => {
  const [currentCoordsState, setCurrentCoordsState] = useState({
    loading: true,
    currentLatitude: null,
    currentLongitude: null,
    markers: null,
    geocodeResult: null,
  });

  const [searchCoordsState, setSearchCoordsState] = useState({
    latitude: null,
    longitude: null,
  });

  const getGeocodeName = async (Lat, Long) => {
    try {
      console.log(Lat);
      console.log(Long);
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

  const [value, onChangeText] = useState("입력");

  return coordsState.loading ? null : (
    <View>
      <TextInput
        style={{ height: 40, borderColor: "gray", borderWidth: 1 }}
        onChangeText={(text) => onChangeText(text)}
        value={value}
      />
      <Button
        title="검색"
        onPress={() => {
          searchGeocode(value);
          <MapView
            region={{
              latitude: currentCoordsState.currentLatitude,
              longitude: currentCoordsState.currentLongitude,
            }}
          />;
        }}
      />
      <TouchableOpacity onPress={setCodeName}>
        <Text>마커 위치로 설정</Text>
        <Text>{aa}</Text>
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
          console.log(currentCoordsState.markers);
        }}
      >
        {currentCoordsState.markers && (
          <Marker coordinate={currentCoordsState.markers} />
        )}
      </MapView>
    </View>
  );
};
