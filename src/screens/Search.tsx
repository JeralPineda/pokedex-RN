import React from "react";
import {StyleSheet, Text, View, Platform} from "react-native";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import {SearchInput} from "../components";

export const Search = () => {
  const {top} = useSafeAreaInsets();
  return (
    <View
      style={{
        ...styles.container,
        marginTop: Platform.OS === "ios" ? top : top + 10,
      }}>
      <SearchInput />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 20,
  },
});
