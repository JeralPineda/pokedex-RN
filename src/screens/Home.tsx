import React from "react";
import {
  Image,
  StyleSheet,
  Text,
  FlatList,
  ActivityIndicator,
} from "react-native";
import {useSafeAreaInsets} from "react-native-safe-area-context";

import {globalStyles} from "../theme";
import {usePokemonPaginated} from "../hooks";

export const Home = () => {
  const {top} = useSafeAreaInsets();

  const {simplePokemons, loadPokemons} = usePokemonPaginated();

  return (
    <>
      <Image
        source={require("../assets/pokebola.png")}
        style={globalStyles.pokebolaBg}
      />

      <FlatList
        data={simplePokemons}
        keyExtractor={pokemon => pokemon.id.toString()}
        showsVerticalScrollIndicator={false}
        renderItem={({item}) => (
          <Image source={{uri: item.picture}} style={styles.image} />
        )}
        //infinite scroll
        onEndReached={loadPokemons}
        onEndReachedThreshold={0.4}
        ListFooterComponent={
          <ActivityIndicator style={styles.spiner} size={20} color="grey" />
        }
      />

      {/* <Text
        style={{...globalStyles.title, ...globalStyles.margin, top: top + 20}}>
        Pokedex
      </Text> */}
    </>
  );
};

const styles = StyleSheet.create({
  spiner: {
    height: 100,
  },
  image: {
    width: 100,
    height: 100,
  },
});
