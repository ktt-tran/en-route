import type { UserLocation } from "@/src/features/location/location.types";
import React from "react";
import { Text, View } from "react-native";

type MapComponentProps = {
  userLocation: UserLocation | null;
};

export default function MapComponent({
  userLocation,
}: MapComponentProps) {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>
        Web Map Placeholder (Use maplibre-gl / react-maplibre here)
      </Text>
    </View>
  );
}