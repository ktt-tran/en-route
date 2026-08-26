import type { UserLocation } from "@/src/features/location/location.types";
import type { RouteResponse } from "@/src/features/routing/routing.types";

export type MapComponentProps = {
  userLocation: UserLocation | null;
  route?: RouteResponse;
};

export type MapComponentRef = {
  animateToCoordinates: (
    latitude: number,
    longitude: number,
    zoomLevel?: number,
  ) => void;
};