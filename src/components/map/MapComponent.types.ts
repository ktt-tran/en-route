import type { UserLocation } from "@/src/features/location/location.types";

export type MapComponentProps = {
  userLocation: UserLocation | null;
};

export type MapComponentRef = {
  animateToCoordinate: (
    latitude: number,
    longitude: number,
    zoomLevel?: number
  ) => void;
};