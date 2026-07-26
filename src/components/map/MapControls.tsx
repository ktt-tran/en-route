import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { router } from "expo-router";
import React from "react";
import { Pressable, View } from "react-native";

type MapControlsProps = {
  onCenterUser: () => void;
};

export default function MapControls({ onCenterUser }: MapControlsProps) {
  return (
    <View className="absolute top-20 right-4">
      {/* Open history */}
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

      {/* Center map on user current position */}
      <Pressable
        onPress={() => {onCenterUser}}
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