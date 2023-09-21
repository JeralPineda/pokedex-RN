import "react-native-gesture-handler";

import React from "react";
import {NavigationContainer} from "@react-navigation/native";

// import {AppNavigation} from "./navigation";
import {Tabs} from "./navigation";

export default function App() {
  return (
    <NavigationContainer>
      {/* <AppNavigation /> */}
      <Tabs />
    </NavigationContainer>
  );
}
