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

export const Search = () => {
  const {top} = useSafeAreaInsets();
  const scrollY = useRef(new Animated.Value(0));

  return (
    <View
      style={{
        ...styles.container,
        marginTop: Platform.OS === "ios" ? top : top + 10,
      }}>
      <SearchInput />

      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        // onScroll={Animated.event([
        //   {nativeEvent: {contentOffset: {y: scrollY}}},
        //   {useNativeDriver: true},
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
