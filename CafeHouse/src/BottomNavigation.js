import {
  AppRegistry,
  PermissionsAndroid,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "@expo/vector-icons/Ionicons";
import HomeScreen from "./HomeScreen/HomeScreen";
import { wp } from "../utils/responsive";
import OrdersScreen from "./OrdersScreen";
import PersonsScreen from "./PersonsScreen";
import SalaryScreen from "./SalaryScreen";
import UserScreen from "./UserScreen";

const BottomNavigation = () => {
  const Tab = createBottomTabNavigator();

  const customTabBarButton = ({ onPress }) => {
    return (
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.9}
        style={styles.buttonStyle}
      >
        <View style={styles.buttonContainerStyle}>
          <Ionicons name="home" size={wp(8)} color={"white"}></Ionicons>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <Tab.Navigator
      initialRouteName="HomeScreen"
      screenOptions={{
        tabBarActiveTintColor: "#002FA7",
        tabBarInactiveTintColor: "#C1C2CF",
        tabBarStyle: {
          elevation: 8, // Android'de gölgelendirme
          shadowColor: "rgba(0, 0, 0, 0.1)", // iOS ve Android'de gölgelendirme rengi
          shadowOffset: { width: 0, height: -4 }, // iOS ve Android'de gölgelendirme yönlendirmesi
          shadowOpacity: 0.8, // iOS'da gölgelendirme şeffaflığı
          shadowRadius: 6, // iOS'da gölgelendirme yarıçapı
        },
      }}
    >
      <Tab.Screen
        name="PersonScreen"
        component={PersonsScreen}
        options={{
          tabBarLabel: "Çalışanlar",
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="people" size={size} color={color} />
          ),
          tabBarStyle: {
            elevation: 0,
            borderTopWidth: 0,
          },
        }}
      />
      <Tab.Screen
        name="PeopleScreen"
        component={OrdersScreen}
        options={{
          tabBarLabel: "Siparişler",
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="book" size={size} color={color} />
          ),
          tabBarStyle: {
            elevation: 0,
            borderTopWidth: 0,
          },
        }}
      />
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="compass" size={size} color={color} />
          ),
          tabBarButton: (props) => {
            return customTabBarButton(props);
          },
          tabBarStyle: {
            elevation: 0,
            borderTopWidth: 0,
          },
        }}
      />
      <Tab.Screen
        name="ProfileScreen"
        component={UserScreen}
        options={{
          headerShown: false,
          tabBarLabel: "Profil",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" color={color} size={size} />
          ),
          tabBarStyle: {
            elevation: 0,
            borderTopWidth: 0,
          },
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SalaryScreen}
        options={{
          headerShown: false,
          tabBarLabel: "Ayarlar",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="settings" color={color} size={size} />
          ),
          tabBarStyle: {
            elevation: 0,
            borderTopWidth: 0,
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomNavigation;

const styles = StyleSheet.create({
  buttonStyle: {
    top: -10,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContainerStyle: {
    width: wp(15),
    height: wp(15),
    borderRadius: wp(15),
    backgroundColor: "#00288D",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "white",
  },
});
