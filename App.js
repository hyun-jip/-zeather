import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import AppLoading from "expo-app-loading";
import { Asset } from "expo-asset";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import * as Font from "expo-font";
import { NavigationContainer } from "@react-navigation/native";
import Stack from "./Navigation/Stack";
import axios from "axios";
import { getWeather } from "./API";
import AntIcon from "react-native-vector-icons/AntDesign";

const cacheImages = (images) =>
  images.map((image) => {
    if (typeof image === "string") {
      return Image.prefetch(image);
    } else {
      return Asset.fromModule(image).downloadAsync();
    }
  });

const cacheFonts = (fonts) => fonts.map((font) => Font.loadAsync(font));

export default function App() {
  const [isReady, setIsReady] = useState(false);
  const loadAssets = () => {
    const images = cacheImages([
      "https://unsplash.com/photos/Vv45XEMJWZk",
      require("./assets/splash.png"),
    ]);

    const fonts = cacheFonts([Ionicons.font, AntIcon.font, AntDesign.font]);

    return Promise.all([...images, ...fonts]);
  };

  const onFinish = () => setIsReady(true);
  return isReady ? (
    <NavigationContainer>
      <Stack />
    </NavigationContainer>
  ) : (
    <AppLoading
      startAsync={loadAssets}
      onFinish={onFinish}
      onError={console.error}
    />
  );
}
