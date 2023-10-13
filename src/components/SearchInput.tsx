import React from "react";
import {StyleSheet, View, TextInput, Animated} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

export const SearchInput = () => {
  return (
    <Animated.View style={[styles.header, {}]}>
      <View style={styles.container}>
        <View style={styles.iconContainer}>
          <Icon name="search-outline" size={20} color="#000" />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Buscar"
            placeholderTextColor="#7e7d7d"
            cursorColor="#000"
          />
        </View>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  header: {
    width: "100%",
    // margin: 0,
    // padding: 0,
    height: 60,
    // position: "absolute",
    // top: 0,
    // left: 0,
    marginTop: -10,
    padding: 20,
    elevation: 8,
    // alignItems: "center",
    justifyContent: "center",

    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  container: {
    height: 45,
    backgroundColor: "#eee",
    borderRadius: 10,
    alignItems: "center",
    flexDirection: "row",
  },
  iconContainer: {
    flex: 0.1,
    // marginLeft: 3,
    alignItems: "center",
    // justifyContent: "center",
  },
  inputContainer: {
    flex: 1,
    // borderWidth: 0,
  },
  input: {
    color: "#000",
    // borderWidth: 0,
  },
});
