import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import AppLoading from "expo-app-loading";
import { Asset } from "expo-asset";
import { Ionicons } from "@expo/vector-icons";
import * as Font from "expo-font";

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

    return Promise.all([...images, ...fonts]);
  };

  const onFinish = async () => setIsReady(true);
  return isReady ? (
    <Text>I'm Done</Text>
  ) : (
    <AppLoading
      startAsync={loadAssets}
      onFinish={onFinish}
      onError={console.error}
    />
  );
}
