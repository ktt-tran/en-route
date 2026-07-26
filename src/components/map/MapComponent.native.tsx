import { UserLocation } from "@/src/features/location/location.types";
import { forwardRef } from "react";
import MapView from "react-native-maps";

type MapComponentProps = {
  userLocation: UserLocation | null;
};

const MapComponent = forwardRef<MapView, MapComponentProps>(
  ({ userLocation }, ref) => {
    return (
      <MapView
        ref={ref}
        style={{ flex: 1 }}
        showsUserLocation
        initialRegion={
          userLocation
            ? {
                latitude: userLocation.coordinate.latitude,
                longitude: userLocation.coordinate.longitude,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
              }
            : undefined
        }
      />
    );
  }
);

export default MapComponent;