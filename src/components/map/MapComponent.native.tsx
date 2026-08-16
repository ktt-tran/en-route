import { routeToGeoJSON } from "@/src/features/routing/routeGeometry";
import { Camera, type CameraRef, GeoJSONSource, Layer, Map, UserLocation } from "@maplibre/maplibre-react-native";
import { forwardRef, useImperativeHandle, useRef } from "react";
import type { MapComponentProps, MapComponentRef } from "./MapComponent.types";

const DEFAULT_CENTER: [number, number] = [-76.94205377393386, 39.00236985];
const MAP_STYLE = "https://tiles.openfreemap.org/styles/bright";

const MapComponent = forwardRef<MapComponentRef, MapComponentProps>(
  ({ userLocation, route }, ref) => {
    const cameraRef = useRef<CameraRef>(null);
    const routeGeoJSON = route? routeToGeoJSON(route.geometry): null;
    
    /*
    console.log("FIRST COORDINATE:",routeGeoJSON?.geometry.coordinates[0]);
    console.log("LAST COORDINATE:",
      routeGeoJSON?.geometry.coordinates[
        routeGeoJSON.geometry.coordinates.length - 1
      ]);
    */

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
      <Map style={{ flex: 1 }} mapStyle={MAP_STYLE}>
        <Camera
          ref={cameraRef}
          initialViewState={{
            center: userLocation
              ? [userLocation.coordinates.longitude, 
                  userLocation.coordinates.latitude]
              : DEFAULT_CENTER,
            zoom: 10,
          }}
        />
        <UserLocation accuracy />

        {routeGeoJSON && (
          <GeoJSONSource
            id="route-source"
            data={routeGeoJSON}
          >
            <Layer
              id="route-line"
              type="line"
              layout={{
                'line-cap': "round",
                'line-join': "round",
              }}
              paint={{
                'line-color': "#2563EB",
                'line-width': 5,
              }}
            />
          </GeoJSONSource>
        )}
      </Map>
    );
  }
);

export default MapComponent;