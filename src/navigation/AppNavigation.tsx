import React from "react";
import {createStackNavigator} from "@react-navigation/stack";

import {Home} from "../screens/Home";
import {Pokemon} from "../screens/Pokemon";
import {SimplePokemon} from "../types/pokemon";

export type Colors = {
  primary: string;
  secondary: string;
};
export type RootStackParams = {
  Home: undefined;
  Pokemon: {simplePokemon: SimplePokemon; colors: Colors};
};

const Stack = createStackNavigator<RootStackParams>();

const AppNavigation = () => {
  return (
    <Stack.Navigator
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
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Pokemon" component={Pokemon} />
    </Stack.Navigator>
  );
};

export default AppNavigation;
