import type { UserLocation } from "@/src/features/location/location.types";
import { forwardRef } from "react";
import { Text, View } from "react-native";

type MapComponentProps = {
  userLocation: UserLocation | null;
};

const MapComponent = forwardRef<unknown, MapComponentProps>(
  ({ userLocation }, ref) => {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text>
          Web Map Placeholder (Use maplibre-gl / react-maplibre here)
        </Text>
      </View>
    );
  }
);

export default MapComponent;