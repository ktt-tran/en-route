import { routeToGeoJSON } from "@/src/features/routing/route.geometry";
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
  const totalCheckpoints = useTripStore((state) => state.totalCheckpoints);
  const unfinishedCheckpoints = useTripStore((state) => state.unfinishedCheckpoints);
  const cameraRef = useRef<CameraRef>(null);
  const routeGeoJSON = route? routeToGeoJSON(route.geometry): null;

  const unfinishedIds =
    new Set(
      unfinishedCheckpoints.map(
          (checkpoint) =>
              checkpoint.id
      )
    );

  const locations =
    origin && destination
      ? [
        {
            type: "origin",
            name: "Start",
            coordinates: origin,
            completed: true,
        },

        ...totalCheckpoints.map((checkpoint) => ({
            type: "checkpoint",
            name: checkpoint.placeId.name,
            coordinates: checkpoint.placeId.coordinates,
            completed: !unfinishedIds.has(checkpoint.id),
        })),

        {
            type: "destination",
            name: destination.name ?? "Destination",
            coordinates: destination.coordinates,
            completed: false,
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
                      /*
                        * Completed checkpoint = green
                        * Incomplete checkpoint = white
                        * Origin = blue
                        * Destination = dark
                      */
                      "circle-color": [
                          "case",
                          ["==",
                              ["get", "type"],
                              "origin",
                          ],
                          "#2563EB",

                          ["==",
                              ["get", "type"],
                              "destination",
                          ],
                          "#0F172A",

                          ["==",
                              ["get", "completed"],
                              true,
                          ],
                          "#22C55E",
                          "#FFFFFF",
                      ],

                      "circle-radius": 7,
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