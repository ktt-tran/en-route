import { routeToGeoJSON } from "@/src/features/routing/routeGeometry";
import { useTripStore } from "@/src/store/tripStore";
import { Camera, type CameraRef, GeoJSONSource, Layer, Map, UserLocation } from "@maplibre/maplibre-react-native";
import { forwardRef, useImperativeHandle, useRef } from "react";
import type { MapComponentProps, MapComponentRef } from "./MapComponent.types";

const DEFAULT_CENTER: [number, number] = [-77.036385, 38.895098];
const MAP_STYLE = "https://tiles.openfreemap.org/styles/bright";

const MapComponent = forwardRef<MapComponentRef, MapComponentProps>(
  ({ userLocation, route }, ref) => {
  const origin = useTripStore((state) => state.origin);
  const destination = useTripStore((state) => state.destination);
  const checkpoints = useTripStore((state) => state.checkpoints);
  const cameraRef = useRef<CameraRef>(null);
  const routeGeoJSON = route? routeToGeoJSON(route.geometry): null;

  const locations =
    origin && destination
      ? [
        {
            type: "origin",
            name: "None",
            coordinates: origin,
        },

        ...checkpoints.map((checkpoint) => ({
            type: "checkpoint",
            name: checkpoint.placeId.name,
            coordinates: checkpoint.placeId.coordinates,
        })),

        {
            type: "destination",
            name: destination.name,
            coordinates: destination.coordinates,
        },
    ] : [];

    const locationGeoJSON = {
        type: "FeatureCollection" as const,
        features: locations.map((location) => ({
            type: "Feature" as const,
            properties: {
                type: location.type,
            },
            geometry: {
                type: "Point" as const,
                coordinates: [
                    location.coordinates.longitude,
                    location.coordinates.latitude,
                ],
            },
        })),
    };
    

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
            zoom: 10, // Default change zoom out into the entire world in production
          }}
        />
        <UserLocation accuracy />

        {/* Route geometry */}
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

        {/* Location indicators */}
        {locationGeoJSON.features.length > 0 && (
          <GeoJSONSource
              id="location-source"
              data={locationGeoJSON}
          >
              <Layer
                  id="location-points"
                  type="circle"
                  paint={{
                      "circle-radius": 6,
                      "circle-color": "#22C55E",
                      "circle-stroke-color": "#2563EB",
                      "circle-stroke-width": 2,
                  }}
              />
          </GeoJSONSource>
        )}
        
      </Map>
    );
  }
);

export default MapComponent;