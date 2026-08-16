import { useNavigationRoute } from "@/src/hooks/useNavigationRoute";
import { useNavigationStore } from "@/src/store/navigationStore";
import { formatDuration } from "@/src/utils/formatting";
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { router } from "expo-router";
import React, { useEffect, useMemo, useRef } from "react";
import { Pressable, Text, View } from "react-native";
import type { RoutePreviewSheetProps } from "./Route.types";

export default function RoutePreviewSheet({ route, isLoading, error }: RoutePreviewSheetProps) {
  const destination = useNavigationStore((state) => state.destination);
  const clearDestination = useNavigationStore((state) => state.clearDestination);
  const canStartNavigation = !!destination && !!route && !isLoading && !error;
  const sheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ["20%", "40%"], []);

  useEffect(() => {
    if (destination) {  
      sheetRef.current?.snapToIndex(0);
    } else {
      sheetRef.current?.close();
    }
  }, [destination]);

  // the user location can change during the route preview and if it does the route should
  // be recalculated using the newest user origin position.
  const { beginNavigation } = useNavigationRoute();

  return (
    <BottomSheet
      ref={sheetRef}
      index={-1}
      snapPoints={snapPoints}
      enablePanDownToClose
      backgroundStyle={{ backgroundColor: "white" }}
      handleIndicatorStyle={{ backgroundColor: "#ccc" }}
    >
      <BottomSheetScrollView contentContainerStyle={{ padding: 20 }}>
        <Text className="text-xl font-bold mb-2">
          {route ? 
            `${route.distance_miles.toFixed(1)} mi · ${formatDuration(route.duration_seconds)}` : "--"}
        </Text>
        <Text className="text-gray-500 mb-4">To: {destination?.name}</Text>

        <View className="flex-row gap-3">
          <Pressable
            onPress={() => {
              clearDestination();
              router.back();
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
      </BottomSheetScrollView>
    </BottomSheet>
  );
}