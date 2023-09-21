import React from "react";
import {StyleSheet, Text, View} from "react-native";

export const Header = () => {
  return (
    <View style={styles.container}>
      <Text>Header</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    // margin: 0,
    // padding: 0,
    height: 60,
    // position: "absolute",
    top: 0,
    left: 0,
    // marginTop: -10,

    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
});
