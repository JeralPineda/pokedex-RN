/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect, useRef} from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  Image,
} from "react-native";
import {useNavigation} from "@react-navigation/native";
import {StackNavigationProp} from "@react-navigation/stack";
import LinearGradient from "react-native-linear-gradient";

import {SimplePokemon} from "../types/pokemon";
import {FadeInImage} from "./FadeInImage";
import {getImageColors} from "../helpers/getColors";
import {RootStackParams} from "../navigation/AppNavigation";

const windowWidth = Dimensions.get("window").width;
const delay = 2;

interface PokemonCardProps {
  pokemon: SimplePokemon;
}

export const PokemonCard = ({pokemon}: PokemonCardProps) => {
  const [bgColor, setBgColor] = useState("#b4b4b4");
  const [bgColor2, setBgColor2] = useState("#808080");
  const isMounted = useRef(true);

  const navigation =
    useNavigation<StackNavigationProp<RootStackParams, "Pokemon">>();

  const getPosterColors = async () => {
    const [primary = "#b4b4b4", secondary = "#808080"] = await getImageColors(
      pokemon.picture,
    );
    setBgColor(primary);
    setBgColor2(secondary);

    // setMainColors({primary, secondary});
  };

  useEffect(() => {
    let timer1 = setTimeout(() => {
      if (!isMounted.current) {
        return;
      }

      getPosterColors();
    }, delay * 1000);

    return () => {
      clearTimeout(timer1);
      isMounted.current = false;
    };
  }, []);

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() =>
        navigation.navigate("Pokemon", {
          simplePokemon: pokemon,
          colors: {
            primary: bgColor,
            secondary: bgColor2,
          },
        })
      }>
      <View
        style={{
          ...styles.cardContainer,

          // backgroundColor: bgcolor,
        }}>
        <LinearGradient
          colors={[bgColor2, bgColor]}
          start={{x: 0.1, y: 0.1}}
          end={{x: 0.5, y: 0.5}}
          style={{...StyleSheet.absoluteFillObject, ...styles.gradient}}
        />

        <View>
          <Text
            style={{
              ...styles.name,
              width: windowWidth * 0.4,
            }}>
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
    // backgroundColor: "grey",
    height: 120,
    width: 160,
    marginBottom: 25,
    borderRadius: 10,
    outline: "1px solid red",

    //shadown
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  gradient: {
    borderRadius: 10,
  },
  name: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    top: 20,
    left: 10,
    textTransform: "capitalize",
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
