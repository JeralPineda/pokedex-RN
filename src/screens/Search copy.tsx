import React, {useRef} from "react";
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

const Header_Max_Height = 100; //Max Height of the Header
const Header_Min_Height = 0; //Min Height of the Header

export const Search = () => {
  const {top} = useSafeAreaInsets();
  let AnimatedHeaderValue = new Animated.Value(0);
  const scrollY = useRef(new Animated.Value(0));

  const animateHeaderBackgroundColor = AnimatedHeaderValue.interpolate({
    inputRange: [0, Header_Max_Height - Header_Min_Height],
    outputRange: ["blue", "red"],
    extrapolate: "clamp",
  });

  const animateHeaderHeight = AnimatedHeaderValue.interpolate({
    inputRange: [0, Header_Max_Height - Header_Min_Height],
    outputRange: [Header_Max_Height, Header_Min_Height],
    extrapolate: "clamp",
  });

  return (
    <View
      style={{
        ...styles.container,
        marginTop: Platform.OS === "ios" ? top : top + 10,
      }}>
      <SearchInput animateHeaderHeight={animateHeaderHeight} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: AnimatedHeaderValue}}}],
          {useNativeDriver: false},
        )}
        // onScroll={Animated.event([
        //   {nativeEvent: {contentOffset: {y: scrollY}}},
        // ])}
      >
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
            backgroundColor: "#65db7f",
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
            backgroundColor: "#65db7f",
          }}></View>
      </ScrollView>
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
