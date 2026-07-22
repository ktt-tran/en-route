import MapComponent from "@/src/components/map/MapComponent";
import MapControls from "@/src/components/map/MapControls";
import MapSearch from "@/src/components/map/MapSearchBar";
import { View } from "react-native";

export default function MapScreen() {
  return (
    <View className="flex-1 relative">
      <MapComponent />
      <MapSearch />
      <MapControls />
    </View>
  );
}