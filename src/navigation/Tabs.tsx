import React from "react";
import {Platform} from "react-native";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/Ionicons";

import AppNavigation from "./AppNavigation";
import {Search} from "../screens/Search";

const Tab = createBottomTabNavigator();

export const Tabs = () => {
  return (
    <Tab.Navigator
      sceneContainerStyle={{
        backgroundColor: "#fff",
      }}
      screenOptions={() => ({
        tabBarActiveTintColor: "#5856d6",
        headerShown: false,
        tabBarShowIcon: true,

        tabBarLabelStyle: {
          fontSize: 12,
          marginBottom: Platform.OS === "ios" ? 0 : 10,
        },
        tabBarStyle: {
          position: "absolute",
          backgroundColor: "rgba(255,255,255,0.92)",
          borderWidth: 0,
          elevation: 0,
          height: Platform.OS === "ios" ? 80 : 60,

          shadowColor: "transparent",
        },
      })}>
      <Tab.Screen
        name="Home"
        component={AppNavigation}
        options={{
          tabBarLabel: "Listado",
          tabBarIcon: ({color}) => (
            <Icon color={color} size={25} name="list-outline" />
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={Search}
        options={{
          tabBarLabel: "Busqueda",
          tabBarIcon: ({color}) => (
            <Icon color={color} size={25} name="search-outline" />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
