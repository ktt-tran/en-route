import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { router } from "expo-router";
import React from "react";
import { Pressable, Text, View } from "react-native";

type MapControlsProps = {
  onCenterUser: () => void;
};

export function MapControls({ onCenterUser }: MapControlsProps) {
  return (
    <View className="absolute top-20 right-4">
      {/* Open history */}
      <Pressable
        onPress={() => router.push("/history")}
        className="bg-primary m-2 rounded-full p-2 shadow-2xl"
      >
        <MaterialIcons name="history" size={34} color="white" />
      </Pressable>

      {/* Center map on user current position */}
      <Pressable
        onPress={onCenterUser}
        className="bg-primary m-2 rounded-full p-2 shadow-2xl"
      >
        <MaterialIcons name="place" size={34} color="white" />
      </Pressable>
    </View>
  );
}

export function MapSearchBar() {
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