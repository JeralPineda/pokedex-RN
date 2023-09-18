import React from "react";
import {StyleSheet, Text, View, ScrollView} from "react-native";
import {PokemonFull} from "../types/pokemon";
import {globalStyles} from "../theme";

interface PokemonDetailsProps {
  pokemon: PokemonFull;
}

globalStyles;

export const PokemonDetails = ({pokemon}: PokemonDetailsProps) => {
  return (
    <ScrollView
      style={{
        ...StyleSheet.absoluteFillObject,
        //...globalStyles.margin
      }}>
      {/* Types y Peso */}
      <View style={{...styles.container, ...globalStyles.margin}}>
        <Text style={styles.title}>Types</Text>
        <View style={styles.typeContainer}>
          {pokemon.types.map(({type}) => (
            <Text key={type.name} style={{...styles.typeText, marginRight: 10}}>
              {type.name}
            </Text>
          ))}
        </View>
      </View>

      <View style={{...globalStyles.margin}}>
        <Text style={styles.title}>Sprites</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 370,
    // marginHorizontal: 20,
  },
  title: {
    color: "#000",
    fontSize: 22,
    fontWeight: "bold",
  },
  typeContainer: {
    flexDirection: "row",
  },
  typeText: {
    color: "#000",
    fontSize: 19,
    marginRight: 10,
  },
});
