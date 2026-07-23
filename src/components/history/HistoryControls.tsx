import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { router } from "expo-router";
import React from "react";
import { Pressable, View } from "react-native";


export default function HistoryControls() {
  return (
    <View className="absolute bottom-10 left-4">
      <Pressable
        onPress={() => router.back()}
        className="bg-primary m-2 rounded-full p-2 shadow-2xl"
      >
        <MaterialIcons
          name="arrow-back-ios-new"
          size={34}
          color="white"
        />
      </Pressable>
    </View>
  );
}