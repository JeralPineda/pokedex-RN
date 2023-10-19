import React from "react";
import {createStackNavigator} from "@react-navigation/stack";

import {Pokemon} from "../screens/Pokemon";
import {SimplePokemon} from "../types/pokemon";
import {Search} from "../screens/Search";

export type Colors = {
  primary: string;
  secondary: string;
};
export type RootStackParams = {
  HomeScreen: undefined;
  Pokemon: {simplePokemon: SimplePokemon; colors: Colors};
};

const Tab = createStackNavigator<RootStackParams>();

export const Tab2 = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        headerStyle: {
          elevation: 0,
          // shadowColor: "transparent", //IOS
        },
        cardStyle: {
          backgroundColor: "white",
        },
      }}>
      <Tab.Screen name="HomeScreen" component={Search} />
      <Tab.Screen name="Pokemon" component={Pokemon} />
    </Tab.Navigator>
  );
};
