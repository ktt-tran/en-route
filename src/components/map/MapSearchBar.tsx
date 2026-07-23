import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { router } from "expo-router";
import React from "react";
import { Pressable, Text, View } from "react-native";


export default function MapSearchBar() {
  return (
    <View className="absolute left-1/2 -translate-x-1/2 bottom-12">
      <Pressable
        onPress={() => router.push("/search")}
        className="flex-row bg-primary rounded-full h-14 w-80 items-center justify-center shadow-2xl"
      >
        <Text className="text-2xl text-white font-bold text-slate-900 tracking-tight mr-14 mb-1">
          en route to ...
        </Text>
        <MaterialIcons
          name="search"
          size={34}
          color="white"
        />
      </Pressable>
    </View>
  );
}