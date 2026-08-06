import MapComponent from "@/src/components/map/MapComponent";
import type { MapComponentRef } from "@/src/components/map/MapComponent.types";
import MapControls from "@/src/components/map/MapControls";
import MapSearchBar from "@/src/components/map/MapSearchBar";
import { useLocation } from "@/src/hooks/useLocation";
import { usePreviewRoute } from "@/src/hooks/usePreviewRoute";
import { useRef } from "react";
import { View } from "react-native";


export default function MapScreen() {
  const { userLocation } = useLocation();
  const mapRef = useRef<MapComponentRef | null>(null);

  const {
      route,
      isLoading,
      error,
  } = usePreviewRoute();

  const centerOnUser = () => {
    if (!userLocation) return;
    mapRef.current?.animateToCoordinates(
      userLocation.coordinates.latitude,
      userLocation.coordinates.longitude,
      16
    );
  };

  return (
    <View className="flex-1 relative">
      <MapComponent ref={mapRef} userLocation={userLocation} route={route} />
      <MapSearchBar />
      <MapControls onCenterUser={centerOnUser} />
    </View>
  );
}