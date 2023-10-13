import React, {useRef, useEffect, useState} from "react";
import {StyleSheet, View, Platform, Animated} from "react-native";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import {SearchInput} from "../components";
import {usePokemonSearch} from "../hooks/usePokemonSearch";

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
    return <View></View>;
  }

  return (
    <View
      style={{
        ...styles.container,
        marginTop: Platform.OS === "ios" ? top : top + 10,
      }}>
      <SearchInput />

      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: scrollY}}}],
          {useNativeDriver: true},
        )}></Animated.ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // height: 1000,
    // backgroundColor: "#f37e7e",
    // marginHorizontal: 20,
  },
});
