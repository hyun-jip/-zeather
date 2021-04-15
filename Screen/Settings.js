import React, { useEffect, useState } from "react";
import { Dimensions, Text, View, StyleSheet, Alert } from "react-native";
import MapView from "react-native-maps";
import * as Location from "expo-location";
import RefreshingScroll from "../Component/RefreshingScroll";
import { TouchableOpacity } from "react-native-gesture-handler";
import Tabs from "../Navigation/Tabs";

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

export default ({ setCoordsState, aa }) => {
  const [currentCoordsState, setCurrentCoordsState] = useState({
    loading: true,
    currentLatitude: null,
    currentLongitude: null,
  });

  const getLocation = async () => {
    try {
      await Location.requestPermissionsAsync();
      const {
        coords: { latitude, longitude },
      } = await Location.getCurrentPositionAsync();
      setCurrentCoordsState({
        loading: false,
        currentLatitude: latitude,
        currentLongitude: longitude,
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

  return currentCoordsState.loading ? null : (
    <RefreshingScroll
      refreshFn={getLocation}
      loading={currentCoordsState.loading}
    >
      <View>
        <TouchableOpacity
          onPress={() =>
            setCoordsState({
              latitude: currentCoordsState.currentLatitude,
              longitude: currentCoordsState.currentLongitude,
            })
          }
        >
          <Text>현재 위치로 설정</Text>
          <Text>{aa}</Text>
        </TouchableOpacity>
        <MapView
          style={styles.map}
          showsUserLocation={true}
          showsMyLocationButton={true}
          initialRegion={{
            latitude: currentCoordsState.currentLatitude,
            longitude: currentCoordsState.currentLongitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        ></MapView>
      </View>
    </RefreshingScroll>
  );
};
