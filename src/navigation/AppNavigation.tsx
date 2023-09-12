import React from "react";
import {createStackNavigator} from "@react-navigation/stack";

import {Home} from "../screens/Home";
import {Pokemon} from "../screens/Pokemon";

const Stack = createStackNavigator();

const AppNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        // headerShown: false,
        // headerStyle: {
        //   elevation: 0,
        //   // shadowColor: "transparent", //IOS
        // },
        cardStyle: {
          // backgroundColor: "white",
        },
      }}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Pokemon" component={Pokemon} />
    </Stack.Navigator>
  );
};

export default AppNavigation;
