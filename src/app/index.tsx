import MapComponent from "@/src/components/map/MapComponent";
import MapControls from "@/src/components/map/MapControls";
import MapSearchBar from "@/src/components/map/MapSearchBar";
import { useLocation } from "@/src/hooks/useLocation";
import { useRef } from "react";
import { View } from "react-native";
import MapView from "react-native-maps";

export default function MapScreen() {
  const { userLocation } = useLocation();

  const mapRef = useRef<MapView | null>(null);


  const centerOnUser = () => {
    if (!userLocation) return;

    mapRef.current?.animateToRegion({
      latitude: userLocation.coordinate.latitude,
      longitude: userLocation.coordinate.longitude,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    });
  };


  return (
    <View className="flex-1 relative">

      <MapComponent
        ref={mapRef}
        userLocation={userLocation}
      />

      <MapSearchBar />

      <MapControls
        onCenterUser={centerOnUser}
      />

    </View>
  );
}
