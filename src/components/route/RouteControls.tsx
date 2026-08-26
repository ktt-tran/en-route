import { useNavigationEnd } from "@/src/hooks/useNavigationEnd";
import { useNavigationRoute } from "@/src/hooks/useNavigationRoute";
import { useNavigationStore } from "@/src/store/navigationStore";
import { router } from "expo-router";
import React from "react";
import { Pressable, Text, View } from "react-native";
import type { RoutePreviewSheetProps } from "./Route.types";

export function EndButton() {
  const clearDestination = useNavigationStore((state) => state.clearDestination);
  const { commitNavigation } = useNavigationEnd();

  async function handleEndNavigation() {
    commitNavigation();
    clearDestination();
    router.dismissTo("/");
  }
  
  return (
    <View className="absolute bottom-12 w-full items-center">
      <Pressable
        onPress={handleEndNavigation}
        className="bg-end rounded-full h-14 w-80 items-center justify-center shadow-2xl"
      >
        <Text className="text-2xl text-white font-bold text-slate-900 tracking-tight mb-1">
          END & SAVE
        </Text>
      </Pressable>
    </View>
  );
}

export function PreviewControls({ route, isLoading, error }: RoutePreviewSheetProps) {
  const destination = useNavigationStore((state) => state.destination);
  const clearDestination = useNavigationStore((state) => state.clearDestination);
  const canStartNavigation = !!destination && !!route && !isLoading && !error;
  
  // the user location can change during the route preview and if it does the route should
  // be recalculated using the newest user origin position.
  const { beginNavigation } = useNavigationRoute();

  return (
    <View className="flex-row gap-3">
      <Pressable
        onPress={() => {
          clearDestination();
          router.push("/search");
        }}
        className="rounded-full h-14 flex-1 items-center justify-center shadow-2xl bg-gray-200"
      >
        <Text className="text-2xl text-gray-700 font-bold tracking-tight">
          Cancel
        </Text>
      </Pressable>

      <Pressable
        disabled={!canStartNavigation}
        onPress={ async () => {
          const started = await beginNavigation();
          if (started) { router.push("/route"); }
        }}
        className={`rounded-full h-14 flex-1 items-center justify-center shadow-2xl ${
          canStartNavigation ? "bg-primary" : "bg-gray-400"
        }`}
      >
        <Text className="text-2xl text-white font-bold tracking-tight">
          Start
        </Text>
      </Pressable>
    </View>
  )
}