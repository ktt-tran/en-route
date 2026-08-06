import { Camera, type CameraRef, Map, UserLocation } from "@maplibre/maplibre-react-native";
import { forwardRef, useImperativeHandle, useRef } from "react";
import type { MapComponentProps, MapComponentRef } from "./MapComponent.types";

const DEFAULT_CENTER: [number, number] = [-76.4702, 38.9559];

const MapComponent = forwardRef<MapComponentRef, MapComponentProps>(
  ({ userLocation }, ref) => {
    const cameraRef = useRef<CameraRef>(null);

    useImperativeHandle(ref, () => ({
      animateToCoordinates: (latitude, longitude, zoom = 16) => {
        cameraRef.current?.setStop({
          center: [longitude, latitude],
          zoom,
          duration: 500,
          easing: "fly",
        });
      },
    }));

    return (
      <Map style={{ flex: 1 }} mapStyle="https://demotiles.maplibre.org/style.json">
        <Camera
          ref={cameraRef}
          initialViewState={{
            center: userLocation
              ? [userLocation.coordinates.longitude, userLocation.coordinates.latitude]
              : DEFAULT_CENTER,
            zoom: 14,
          }}
        />
        <UserLocation accuracy />
      </Map>
    );
  }
);

export default MapComponent;