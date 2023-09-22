import React, {useRef, useEffect, useState} from "react";
import {
  StyleSheet,
  Text,
  View,
  Platform,
  ScrollView,
  Animated,
} from "react-native";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import {SearchInput} from "../components";
// import Animated from "react-native-reanimated";

const Header_Max_Height = 100; //Max Height of the Header
const CONTAINER_HEIGHT = 50; //Min Height of the Header

export const Search = () => {
  const {top} = useSafeAreaInsets();
  const scrollY = useRef(new Animated.Value(0)).current;
  const offsetAnim = useRef(new Animated.Value(0)).current;

  const [scrollValue, setScrollValue] = useState(0);
  const [clampedScrollValue, setClampedScrollValue] = useState(0);
  const [offsetValue, setOffsetValue] = useState(0);

  const clampedScroll = Animated.diffClamp(
    Animated.add(
      scrollY.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1],
        extrapolateLeft: "clamp",
      }),
      offsetAnim,
    ),
    0,
    CONTAINER_HEIGHT,
  );

  // let _clampedScrollValue = 0;
  // let _offsetValue = 0;
  // let _scrollValue = 0;

  useEffect(() => {
    scrollY.addListener(({value}) => {
      const diff = value - scrollValue;
      setScrollValue(value);
      setClampedScrollValue(Math.min(Math.max(clampedScrollValue * diff, 0)));
      CONTAINER_HEIGHT;
    });
    offsetAnim.addListener(({value}) => {
      setOffsetValue(value);
    });
  }, []);

  // const headerTraslate = clampedScrollValue.interpolate({});

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
        // onScroll={Animated.event(
        //   [{nativeEvent: {contentOffset: {y: AnimatedHeaderValue}}}],
        //   {useNativeDriver: false},
        // )}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: scrollY}}}],
          {useNativeDriver: true},
        )}>
        <View
          style={{
            width: "100%",
            height: 500,
            backgroundColor: "#65dbb4",
          }}></View>
        <View
          style={{
            width: "100%",
            height: 500,
            backgroundColor: "#65db7f",
          }}></View>
        <View
          style={{
            width: "100%",
            height: 500,
            backgroundColor: "#6584db",
          }}></View>
        <View
          style={{
            width: "100%",
            height: 500,
            backgroundColor: "#db65d5",
          }}></View>
        <View
          style={{
            width: "100%",
            height: 500,
            backgroundColor: "#65db7f",
          }}></View>
      </Animated.ScrollView>
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
