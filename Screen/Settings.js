import React, { useEffect } from "react";
import { Dimensions, Text, View, StyleSheet, Alert } from "react-native";
import MapView from "react-native-maps";
import * as Location from "expo-location";

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
  const showLocation = (latitude, longitude) => {
    console.log(latitude);
    console.log(longitude);
  };

  const getLocation = async () => {
    try {
      await Location.requestPermissionsAsync();
      const {
        coords: { latitude, longitude },
      } = await Location.getCurrentPositionAsync();
      showLocation(latitude, longitude);
    } catch (error) {
      Alert.alert("Can't find you.", "So sad");
    }
  };

  useEffect(() => {
    getLocation();
  }, []);

  return (
    <View>
      <Text></Text>
      <MapView
        style={styles.map}
        showsUserLocation={true}
        showsMyLocationButton={true}
      ></MapView>
    </View>
  );
};
