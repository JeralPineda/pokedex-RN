/* eslint-disable react-hooks/exhaustive-deps */
import React, {useRef, useEffect, useState} from "react";
import {
  StyleSheet,
  View,
  Platform,
  Animated,
  Text,
  FlatList,
  Dimensions,
} from "react-native";
import {useSafeAreaInsets} from "react-native-safe-area-context";

import {Loading, PokemonCard, SearchInput} from "../components";
import {usePokemonSearch} from "../hooks/usePokemonSearch";
import {globalStyles} from "../theme";
import {SimplePokemon} from "../types/pokemon";

const CONTAINER_HEIGHT = 50; //Min Height of the Header

const screenWidth = Dimensions.get("window").width;

export const Search = () => {
  const {top} = useSafeAreaInsets();
  const scrollY = useRef(new Animated.Value(0)).current;

  const {isFetching, simplePokemons} = usePokemonSearch();
  const [pokemonFiltered, setPokemonFiltered] = useState<SimplePokemon[]>([]);
  const [term, setTerm] = useState("");

  const [scrollValue, setScrollValue] = useState(0);
  const [clampedScrollValue, setClampedScrollValue] = useState(0);

  useEffect(() => {
    scrollY.addListener(({value}) => {
      const diff = value - scrollValue;
      setScrollValue(value);
      setClampedScrollValue(Math.min(Math.max(clampedScrollValue * diff, 0)));
      CONTAINER_HEIGHT;
    });
  }, []);

  useEffect(() => {
    if (term.length === 0) {
      return setPokemonFiltered([]);
    }

    setPokemonFiltered(
      simplePokemons.filter(poke =>
        poke.name.toLocaleLowerCase().includes(term.toLocaleLowerCase()),
      ),
    );
  }, [term]);

  if (isFetching) {
    return <Loading />;
  }

  return (
    <View
      style={{
        ...styles.container,
        marginTop: Platform.OS === "ios" ? top : top + 10,
      }}>
      <SearchInput
        onDebounce={value => setTerm(value)}
        style={{
          position: "absolute",
          zIndex: 999,
          width: screenWidth - 40,
          top: Platform.OS === "ios" ? top : top + 30,
        }}
      />

      <FlatList
        data={pokemonFiltered}
        keyExtractor={pokemon => pokemon.id}
        showsVerticalScrollIndicator={false}
        numColumns={2}
        // Header
        ListHeaderComponent={
          <Text
            style={{
              ...globalStyles.title,
              ...globalStyles.margin,
              paddingBottom: 10,
              textTransform: "capitalize",
              marginTop: Platform.OS === "ios" ? top + 60 : top + 80,
            }}>
            {term}
          </Text>
        }
        renderItem={({item}) => <PokemonCard pokemon={item} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",

    // height: 1000,
    // backgroundColor: "#f37e7e",
    // marginHorizontal: 20,
  },
  activityContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  spiner: {
    height: 100,
  },
});
