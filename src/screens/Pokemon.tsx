import {StackScreenProps} from "@react-navigation/stack";
import React from "react";
import {StyleSheet, Text, View} from "react-native";
import {RootStackParams} from "../navigation/AppNavigation";
import {globalStyles} from "../theme";

interface PokemonProps extends StackScreenProps<RootStackParams, "Pokemon"> {}

export const Pokemon = ({navigation, route}: PokemonProps) => {
  const {colors, simplePokemon} = route.params;

  console.log("colors", JSON.stringify(simplePokemon, null, 3));
  console.log(colors);
  return (
    <View>
      <Text style={globalStyles.text}>Pokemon: {simplePokemon.name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({});
