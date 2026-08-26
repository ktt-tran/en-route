import MapComponent from "@/src/components/map/MapComponent";
import type { MapComponentRef } from "@/src/components/map/MapComponent.types";
import { useLocation } from "@/src/hooks/useLocation";
import { usePreviewRoute } from "@/src/hooks/usePreviewRoute";
import { useEffect, useRef } from "react";
import { View } from "react-native";
import { MapControls, MapSearchBar } from "../components/map/MapControls";
import RoutePreviewSheet from "../components/route/RoutePreviewSheet";
import { useNavigationStore } from "../store/navigationStore";


  export default function MapScreen() {
    const { userLocation } = useLocation();
    const origin = useNavigationStore((state) => state.origin);
    const setOrigin = useNavigationStore((state) => state.setOrigin);
    const mapRef = useRef<MapComponentRef | null>(null);

    useEffect(() => {
      if (!userLocation || origin) return;
      setOrigin(userLocation.coordinates);
    }, [userLocation, origin, setOrigin]);

    const {
        route,
        isLoading,
        error,
    } = usePreviewRoute();

    const centerOnUser = () => {
      if (!userLocation) { return; }
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