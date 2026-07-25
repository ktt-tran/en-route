import { UserLocation } from "@/src/features/location/location.types";
import MapView from "react-native-maps";

type MapComponentProps = {
  userLocation : UserLocation | null;
};

export default function MapComponent({userLocation}: MapComponentProps) {
  return (
    <MapView
      style={{ flex: 1 }}
      showsUserLocation
      region={
        userLocation
          ? {
              latitude: userLocation?.coordinate.latitude,
              longitude: userLocation?.coordinate.longitude,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            }
          : undefined
      }
    />
  );
}


