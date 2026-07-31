import MapComponent from "@/src/components/map/MapComponent";
import type { MapComponentRef } from "@/src/components/map/MapComponent.types";
import MapControls from "@/src/components/map/MapControls";
import MapSearchBar from "@/src/components/map/MapSearchBar";
import { useLocation } from "@/src/hooks/useLocation";
import { useRef } from "react";
import { View } from "react-native";

export default function MapScreen() {
  const { userLocation } = useLocation();
  const mapRef = useRef<MapComponentRef | null>(null);

  const centerOnUser = () => {
    if (!userLocation) return;
    mapRef.current?.animateToCoordinate(
      userLocation.coordinate.latitude,
      userLocation.coordinate.longitude,
      16
    );
  };

  return (
    <View className="flex-1 relative">
      <MapComponent ref={mapRef} userLocation={userLocation} />
      <MapSearchBar />
      <MapControls onCenterUser={centerOnUser} />
    </View>
  );
}