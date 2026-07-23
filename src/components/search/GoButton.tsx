import { router } from "expo-router";
import React from "react";
import { Pressable, Text, View } from "react-native";


export default function GoButton() {
  return (
    <View className="absolute bottom-12 w-full items-center">
      <Pressable
        onPress={() => router.push("/search")}
        className="bg-secondary rounded-full h-14 w-80 items-center justify-center shadow-2xl"
      >
        <Text className="text-2xl text-background font-bold text-slate-900 tracking-tight mb-1">
          GO
        </Text>
      </Pressable>
    </View>
  );
}