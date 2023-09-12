import React from "react";
import {Image, StyleSheet, Text, View} from "react-native";
import {globalStyles} from "../theme";
import {useSafeAreaInsets} from "react-native-safe-area-context";

export const Home = () => {
  const {top} = useSafeAreaInsets();
  return (
    <>
      <Image
        source={require("../assets/pokebola.png")}
        style={globalStyles.pokebolaBg}
      />

      <Text
        style={{...globalStyles.title, ...globalStyles.margin, top: top + 20}}>
        Pokedex
      </Text>
    </>
  );
};

const styles = StyleSheet.create({
  container: {},
});
