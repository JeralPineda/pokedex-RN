import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  Image,
} from "react-native";
import {SimplePokemon} from "../types/pokemon";
import {FadeInImage} from "./FadeInImage";

const windowWidth = Dimensions.get("window").width;

interface PokemonCardProps {
  pokemon: SimplePokemon;
}

export const PokemonCard = ({pokemon}: PokemonCardProps) => {
  return (
    <TouchableOpacity activeOpacity={0.8}>
      <View style={styles.cardContainer}>
        <View>
          <Text style={{...styles.name, width: windowWidth * 0.4}}>
            {pokemon.name}
            {"\n#" + pokemon.id}
          </Text>
        </View>

        <View style={styles.pokebolaContainer}>
          <Image
            source={require("../assets/pokebola-blanca.png")}
            style={styles.pokebola}
          />
        </View>

        <FadeInImage uri={pokemon.picture} style={styles.pokemonImage} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    marginHorizontal: 10,
    backgroundColor: "red",
    height: 120,
    width: 160,
    marginBottom: 25,
    borderRadius: 10,

    //shadown
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.41,
    shadowRadius: 9.11,

    elevation: 14,
  },
  name: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    top: 20,
    left: 10,
  },
  pokebolaContainer: {
    width: 100,
    height: 100,
    bottom: 0,
    right: 0,
    position: "absolute",
    overflow: "hidden",
    opacity: 0.5,
  },
  pokebola: {
    width: 100,
    height: 100,
    position: "absolute",
    bottom: -25,
    right: -25,
  },
  pokemonImage: {
    width: 100,
    height: 100,
    position: "absolute",
    right: -8,
    bottom: -5,
  },
});
