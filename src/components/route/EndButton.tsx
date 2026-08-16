import { useNavigationStore } from "@/src/store/navigationStore";
import { router } from "expo-router";
import React from "react";
import { Pressable, Text, View } from "react-native";

export default function EndButton() {
  const clearDestination = useNavigationStore((state) => state.clearDestination);
  const stopNavigation = useNavigationStore((state) => state.stopNavigation);
  
  return (
    <View className="absolute bottom-12 w-full items-center">
      <Pressable
        onPress={() => {
          clearDestination();
          stopNavigation();
          router.navigate("/");
        }}
        className="bg-end rounded-full h-14 w-80 items-center justify-center shadow-2xl"
      >
        <Text className="text-2xl text-white font-bold text-slate-900 tracking-tight mb-1">
          END
        </Text>
      </Pressable>
    </View>
  );
}