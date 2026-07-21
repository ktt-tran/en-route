import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#000",
      }}
    >

      <Tabs.Screen
        name="map"
        options={{
          title: "Map",
          tabBarIcon: ({color}) => (
            <Ionicons
              name="map"
              size={24}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="history"
        options={{
          title: "History",
          tabBarIcon: ({color}) => (
            <Ionicons
              name="time"
              size={24}
              color={color}
            />
          ),
        }}
      />

    </Tabs>
  );
}