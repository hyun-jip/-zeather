import React, { useState, useCallback } from "react";
import {
  ScrollView,
  RefreshControl,
  StyleSheet,
  Text,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";

const RefreshingScroll = ({ loading, refreshFn, children }) => {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await refreshFn();
    setRefreshing(false);
  };

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      {loading ? <ActivityIndicator color="black" size="small" /> : children}
    </ScrollView>
  );
};

export default RefreshingScroll;
