import {StackScreenProps} from "@react-navigation/stack";
import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import LinearGradient from "react-native-linear-gradient";
import Icon from "react-native-vector-icons/Ionicons";

import {RootStackParams} from "../navigation/AppNavigation";
import {FadeInImage} from "../components";
import {usePokemon} from "../hooks";

interface PokemonProps extends StackScreenProps<RootStackParams, "Pokemon"> {}

export const Pokemon = ({navigation, route}: PokemonProps) => {
  const {colors, simplePokemon} = route.params;
  const {name, id, picture} = simplePokemon;

  const {top} = useSafeAreaInsets();
  const {pokemon, isLoading} = usePokemon(id);
  console.log(pokemon);

  return (
    <View style={styles.pokemonContainer}>
      {/* Header Container */}
      <View style={{...styles.headerContainer}}>
        {/* Gradient */}
        <LinearGradient
          colors={[colors.secondary, colors.primary]}
          start={{x: 0.1, y: 0.1}}
          end={{x: 0.5, y: 0.5}}
          style={{...StyleSheet.absoluteFillObject, ...styles.gradient}}
        />

        {/* Back Buttom */}
        <TouchableOpacity
          activeOpacity={0.8}
          style={{...styles.backButtom, top: top + 5}}
          onPress={() => navigation.pop()}>
          <Icon name="arrow-back-outline" color="white" size={26} />
        </TouchableOpacity>

        {/* Pokemon Name */}
        <Text style={{...styles.pokemonName, top: top + 40}}>
          {name + "\n#"}
          {id}
        </Text>

        {/* Pokebola Blanca */}
        <Image
          source={require("../assets/pokebola-blanca.png")}
          style={styles.pokeball}
        />

        <FadeInImage uri={picture} style={styles.pokemonImage} />
      </View>

      {/* Detalles y loading */}
      <View style={styles.activityIndicator}>
        <ActivityIndicator color={colors.primary} size={50} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  pokemonContainer: {
    flex: 1,
  },
  headerContainer: {
    height: 370,
    zIndex: 999,
    borderBottomRightRadius: 1000,
    borderBottomLeftRadius: 1000,
    alignItems: "center",
  },
  gradient: {
    borderBottomRightRadius: 1000,
    borderBottomLeftRadius: 1000,
  },
  backButtom: {
    position: "absolute",
    left: 20,
  },
  pokemonName: {
    color: "#fff",
    fontSize: 40,
    alignSelf: "flex-start",
    left: 20,
    textTransform: "capitalize",
  },
  pokeball: {
    height: 250,
    width: 250,
    bottom: -20,
    opacity: 0.7,
  },
  pokemonImage: {
    width: 250,
    height: 250,
    position: "absolute",
    bottom: -15,
  },
  activityIndicator: {
    flex: 1,
    // height: 200,
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
  },
});
