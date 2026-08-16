import { useNavigationStore } from "@/src/store/navigationStore";
import { router } from "expo-router";
import React from "react";
import { Pressable, Text, View } from "react-native";

export default function ShowPreview() {
  const destination = useNavigationStore(state => state.destination);

  return (
    <View className="absolute bottom-12 w-full items-center">
      <Pressable
        disabled={!destination}
        onPress={() => {
          router.back();
        }}
        className={`bg-primary rounded-full h-14 w-80 items-center justify-center shadow-2xl ${
            destination
                ? "bg-primary"
                : "bg-gray-400"
        }`}
      >
        <Text className="text-2xl text-white font-bold text-slate-900 tracking-tight mb-1">
          Show
        </Text>
      </Pressable>
    </View>
  );
}