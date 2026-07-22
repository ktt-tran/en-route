import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { router } from "expo-router";
import React from "react";
import { Pressable, View } from "react-native";


export default function MapControls() {
  return (
    <View className="absolute">
      <Pressable
        onPress={() => router.push("/history")}
        className="bg-surface absolute left-4 top-16 m-2 rounded-full bg-white p-4 shadow-2xl"
      >
        <MaterialIcons
          name="history"
          size={34}
          color="white"
        />
      </Pressable>
    </View>
  );
}