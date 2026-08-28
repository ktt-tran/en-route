import MapComponent from "@/src/components/map/MapComponent";
import type { MapComponentRef } from "@/src/components/map/MapComponent.types";
import { useLocation } from "@/src/hooks/useLocation";
import { usePreviewRoute } from "@/src/hooks/usePreviewRoute";
import { useEffect, useRef } from "react";
import { Alert, View } from "react-native";
import { MapControls, MapSearchBar } from "../components/map/MapControls";
import RoutePreviewSheet from "../components/route/RoutePreviewSheet";
import { useTripStore } from "../store/tripStore";


export default function MapScreen() {
  const { userLocation, errorMsg } = useLocation();
  const origin = useTripStore((state) => state.origin);
  const setOrigin = useTripStore((state) => state.setOrigin);
  const mapRef = useRef<MapComponentRef | null>(null);

  useEffect(() => {
    if (!userLocation || origin) return;
    setOrigin(userLocation.coordinates);
  }, [userLocation, origin, setOrigin]);

  useEffect(() => {
    if (!errorMsg) return;
    Alert.alert(
      "Location Unavailable",
      errorMsg
    );
  }, [errorMsg]);

  const {
      route,
      isLoading,
      error,
  } = usePreviewRoute();

  const centerOnUser = () => {
    if (!userLocation) {
      Alert.alert(
        "Location Unavailable",
        "Your current location is not available."
      );
      return;
    }

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
      <RoutePreviewSheet route={route} isLoading={isLoading} error={error} />
    </View>
  );
}