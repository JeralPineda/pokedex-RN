import React from "react";
import {StyleSheet, Text, View} from "react-native";

export const Home = () => {
  return (
    <View style={styles.container}>
      <Text>HomeScreen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 60,
  },
});
