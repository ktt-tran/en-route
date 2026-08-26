import { useNavigationStore } from "@/src/store/navigationStore";
import { formatDuration } from "@/src/utils/formatting";
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import React, { useEffect, useMemo, useRef } from "react";
import { Text } from "react-native";
import type { RoutePreviewSheetProps } from "./Route.types";
import { PreviewControls } from "./RouteControls";

export default function RoutePreviewSheet({ route, isLoading, error }: RoutePreviewSheetProps) {
  const destination = useNavigationStore((state) => state.destination);
  const sheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ["20%", "40%"], []);

  useEffect(() => {
    if (destination) {  
      sheetRef.current?.snapToIndex(0);
    } else {
      sheetRef.current?.close();
    }
  }, [destination]);

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

        <PreviewControls route={route} isLoading={isLoading} error={error} />
      </BottomSheetScrollView>
    </BottomSheet>
  );
}