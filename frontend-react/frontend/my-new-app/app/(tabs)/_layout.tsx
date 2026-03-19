import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import React from "react";
import { Platform } from "react-native";

export default function TabLayout() {
  // Цвета Т-Банка
  const tintColorLight = "#FFDD2D"; // Активный желтый
  const unTintColorLight = "#666666"; // Неактивный серый

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: tintColorLight,
        tabBarInactiveTintColor: unTintColorLight,
        headerShown: false, // Отключаем стандартный хедер, будем делать свой
        tabBarStyle: {
          backgroundColor: "#FFFFFF",
          borderTopWidth: 1,
          borderTopColor: "#EAEAEA",
          height: Platform.OS === "ios" ? 90 : 70, // Высота для разных платформ
          paddingBottom: Platform.OS === "ios" ? 30 : 10,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: "500",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Главная",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "home" : "home-outline"}
              size={24}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="budget"
        options={{
          title: "Бюджет",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "wallet" : "wallet-outline"}
              size={24}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="savings"
        options={{
          title: "Накопления",
          tabBarIcon: ({ color, focused }) => (
            <MaterialCommunityIcons
              name={focused ? "piggy-bank" : "piggy-bank-outline"}
              size={28}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="targets"
        options={{
          title: "Цели",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "disc" : "disc-outline"}
              size={24}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
