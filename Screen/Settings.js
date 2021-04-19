import React, { useEffect, useState } from "react";
import { Dimensions, Text, View, StyleSheet, Alert } from "react-native";
import MapView, { Marker } from "react-native-maps";
import Geocode from "react-geocode";
import RefreshingScroll from "../Component/RefreshingScroll";
import { TouchableOpacity } from "react-native-gesture-handler";
import Tabs from "../Navigation/Tabs";
import axios from "axios";
import { geocodeAsync } from "expo-location";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});

const Google_API_KEY = "AIzaSyAqe6s7YjvCTBbZSaYWayULASiO180dHCM";

export default ({ coordsState, setCoordsState, aa, bb }) => {
  const [currentCoordsState, setCurrentCoordsState] = useState({
    loading: true,
    currentLatitude: null,
    currentLongitude: null,
    markers: null,
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
      const geoCodeName = data.results[0].address_components[1].short_name;

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

  return coordsState.loading ? null : (
    <View>
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
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        onPress={(e) => {
          setCurrentCoordsState({ markers: e.nativeEvent.coordinate });
        }}
      >
        {currentCoordsState.markers && (
          <Marker coordinate={currentCoordsState.markers} />
        )}
      </MapView>
    </View>
  );
};
