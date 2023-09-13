import React from "react";
import {
  Image,
  StyleSheet,
  View,
  Text,
  FlatList,
  ActivityIndicator,
} from "react-native";
import {useSafeAreaInsets} from "react-native-safe-area-context";

import {globalStyles} from "../theme";
import {usePokemonPaginated} from "../hooks";
import {PokemonCard} from "../components";

export const Home = () => {
  const {top} = useSafeAreaInsets();

  const {simplePokemons, loadPokemons} = usePokemonPaginated();

  return (
    <>
      <Image
        source={require("../assets/pokebola.png")}
        style={globalStyles.pokebolaBg}
      />

      <View style={styles.container}>
        <FlatList
          data={simplePokemons}
          keyExtractor={pokemon => pokemon.id.toString()}
          showsVerticalScrollIndicator={false}
          numColumns={2}
          renderItem={({item}) => <PokemonCard pokemon={item} />}
          //Header
          ListHeaderComponent={
            <Text
              style={{
                ...globalStyles.title,
                ...globalStyles.margin,
                top: top + 20,
                marginBottom: top + 20,
              }}>
              Pokedex
            </Text>
          }
          //infinite scroll
          onEndReached={loadPokemons}
          onEndReachedThreshold={0.4}
          ListFooterComponent={
            <ActivityIndicator style={styles.spiner} size={20} color="grey" />
          }
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  spiner: {
    height: 100,
  },
  image: {
    width: 100,
    height: 100,
  },
});
