import React, {useRef, useEffect, useState} from "react";
import {
  StyleSheet,
  View,
  Platform,
  Animated,
  Text,
  FlatList,
} from "react-native";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import {PokemonCard, SearchInput} from "../components";
import {usePokemonSearch} from "../hooks/usePokemonSearch";
import {ActivityIndicator} from "react-native";
import {globalStyles} from "../theme";

const CONTAINER_HEIGHT = 50; //Min Height of the Header

export const Search = () => {
  const {top} = useSafeAreaInsets();
  const scrollY = useRef(new Animated.Value(0)).current;

  const {isFetching, simplePokemons} = usePokemonSearch();

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

  if (isFetching) {
    return (
      <View style={styles.activityContainer}>
        <ActivityIndicator size={50} color="grey" />
        <Text style={styles.activityText}>Cargando...</Text>
      </View>
    );
  }

  return (
    <View
      style={{
        ...styles.container,
        marginTop: Platform.OS === "ios" ? top : top + 10,
      }}>
      <SearchInput />

      {/* <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: scrollY}}}],
          {useNativeDriver: true},
        )}> */}
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
              // top: top + 20,
              // marginBottom: top + 20,
            }}>
            Pokedex
          </Text>
        }
      />
      {/* </Animated.ScrollView> */}
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
  activityText: {
    color: "#000",
  },
  spiner: {
    height: 100,
  },
});
