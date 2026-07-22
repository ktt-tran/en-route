import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { router } from "expo-router";
import React from "react";
import { Pressable, View } from "react-native";


export default function MapSearchBar() {
  return (
    <View>
      <Pressable
        onPress={() => router.push("/search")}
        className="bg-surface absolute left-1/2 -translate-x-1/2 bottom-12 rounded-full bg-white h-16 w-80 items-center justify-center shadow-2xl"
      >
        <MaterialIcons
          name="search"
          size={38}
          color="white"
        />
      </Pressable>
    </View>
  );
}