import React, { useEffect, useState } from "react";
import { Dimensions, Text, View, StyleSheet, Alert } from "react-native";
import MapView from "react-native-maps";
import * as Location from "expo-location";
import RefreshingScroll from "../Component/RefreshingScroll";
import { TouchableOpacity } from "react-native-gesture-handler";

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

export default () => {
  const [coordsState, setCoordsState] = useState({
    loading: true,
    latitude: null,
    longitude: null,
  });

  const [weatherCoordsState, setWeatherCoordsState] = useState({
    weatherLatitude: null,
    weatherLongitude: null,
  });

  const getLocation = async () => {
    try {
      await Location.requestPermissionsAsync();
      const {
        coords: { latitude, longitude },
      } = await Location.getCurrentPositionAsync();
      setCoordsState({
        loading: false,
        latitude,
        longitude,
      });
    } catch (error) {
      Alert.alert("Can't find you.", "So sad");
    }
  };

  const showLocation = (latitude, longitude) => {
    console.log(latitude);
    console.log(longitude);
  };

  useEffect(() => {
    getLocation();
  }, []);

  return coordsState.loading ? null : (
    <RefreshingScroll refreshFn={getLocation} loading={coordsState.loading}>
      <View>
        <TouchableOpacity
          onPress={() =>
            setWeatherCoordsState({
              weatherLatitude: coordsState.latitude,
              weatherLongitude: coordsState.longitude,
            })
          }
        >
          <Text>현재 위치로 설정</Text>
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
        ></MapView>
      </View>
    </RefreshingScroll>
  );
};
