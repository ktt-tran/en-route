import MapComponent from "@/src/components/map/MapComponent";
import MapControls from "@/src/components/map/MapControls";
import MapSearchBar from "@/src/components/map/MapSearchBar";
import { View } from "react-native";

export default function MapScreen() {
  return (
    <View style={{ flex: 1 }}>
      <MapComponent />
      <MapSearchBar />
      <MapControls />
    </View>
  );
}