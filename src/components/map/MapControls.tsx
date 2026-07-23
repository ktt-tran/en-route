import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { router } from "expo-router";
import React from "react";
import { Pressable, View } from "react-native";


export default function MapControls() {
  return (
    <View className="absolute top-20 right-4">
      <Pressable
        onPress={() => router.push("/history")}
        className="bg-primary m-2 rounded-full p-2 shadow-2xl"
      >
        <MaterialIcons
          name="history"
          size={34}
          color="white"
        />
      </Pressable>

      <Pressable
        onPress={() => router.push("/history")}
        className="bg-primary m-2 rounded-full p-2 shadow-2xl"
      >
        <MaterialIcons
          name="place"
          size={34}
          color="white"
        />
      </Pressable>
    </View>
  );
}