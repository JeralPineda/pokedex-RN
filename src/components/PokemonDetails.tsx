import React from "react";
import {StyleSheet, Text, View, ScrollView} from "react-native";
import {PokemonFull} from "../types/pokemon";
import {globalStyles} from "../theme";
import {FadeInImage} from "./FadeInImage";

interface PokemonDetailsProps {
  pokemon: PokemonFull;
}

export const PokemonDetails = ({pokemon}: PokemonDetailsProps) => {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
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
        <Text style={styles.title}>Peso</Text>
        <Text style={styles.typeText}>{pokemon.weight}kg</Text>
      </View>

      <View style={{...globalStyles.margin}}>
        <Text style={styles.title}>Sprites</Text>
      </View>

      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        <FadeInImage
          uri={pokemon.sprites.front_default}
          style={styles.basicSprite}
        />

        <FadeInImage
          uri={pokemon.sprites.back_default}
          style={styles.basicSprite}
        />

        <FadeInImage
          uri={pokemon.sprites.front_shiny}
          style={styles.basicSprite}
        />

        <FadeInImage
          uri={pokemon.sprites.back_shiny}
          style={styles.basicSprite}
        />
      </ScrollView>

      {/* Habilidades */}
      <View style={{...globalStyles.margin}}>
        <Text style={styles.title}>Habilidades Base</Text>
        <View style={styles.typeContainer}>
          {pokemon.abilities.map(({ability}) => (
            <Text
              key={ability.name}
              style={{...styles.typeText, marginRight: 10}}>
              {ability.name}
            </Text>
          ))}
        </View>
      </View>

      {/* Movimientos */}
      <View style={{...globalStyles.margin}}>
        <Text style={styles.title}>Movimientos</Text>
        <View
          style={{
            ...styles.typeContainer,
            flexWrap: "wrap",
          }}>
          {pokemon.moves.map(({move}) => (
            <Text key={move.name} style={{...styles.typeText, marginRight: 10}}>
              {move.name}
            </Text>
          ))}
        </View>
      </View>

      {/* Stats */}
      <View style={{...globalStyles.margin}}>
        <Text style={styles.title}>Stats</Text>
        <View
          style={{
            ...styles.typeContainer,
            flexDirection: "column",
          }}>
          {pokemon.stats.map((stat, i) => (
            <View key={stat.stat.name + i} style={{flexDirection: "row"}}>
              <Text style={{...styles.typeText, marginRight: 10, width: 150}}>
                {stat.stat.name}
              </Text>

              <Text style={{...styles.typeText, fontWeight: "bold"}}>
                {stat.base_stat}
              </Text>
            </View>
          ))}
        </View>

        {/* Sprite Final */}
        <View
          style={{
            marginBottom: 20,
            alignItems: "center",
          }}>
          <FadeInImage
            uri={pokemon.sprites.front_default}
            style={styles.basicSprite}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 370,
  },
  title: {
    color: "#000",
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 20,
  },
  typeContainer: {
    flexDirection: "row",
  },
  typeText: {
    color: "#000",
    fontSize: 19,
    marginRight: 10,
  },
  basicSprite: {
    width: 100,
    height: 100,
  },
});
