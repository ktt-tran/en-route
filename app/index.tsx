import MapComponent from "@/src/components/map/MapComponent";
import MapControls from "@/src/components/map/MapControls";
import MapSearchBar from "@/src/components/map/MapSearchBar";
import { useLocation } from "@/src/hooks/useLocation";
import { View } from "react-native";

export default function MapScreen() {
  const { userLocation, errorMsg } = useLocation();

  return (
    <View className="flex-1 relative">
      <MapComponent userLocation={userLocation} />
      <MapSearchBar />
      <MapControls />
    </View>
  );
}