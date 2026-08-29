import { Coordinates } from "@/src/types/coordinates";

export function routeToGeoJSON(coordinates: Coordinates[]) {
  return {
    type: "Feature" as const,
    properties: {},
    geometry: {
      type: "LineString" as const,
      coordinates: coordinates.map((coordinate) => [
        coordinate.longitude,
        coordinate.latitude,
      ]),
    },
  };
}