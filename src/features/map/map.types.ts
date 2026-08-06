import { Coordinates } from "@/src/types/coordinates";

export interface MapRegion {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
}

export interface MapMarker {
  id: string;
  coordinates: Coordinates;
  title?: string;
  description?: string;
}

export interface MapRouteLine {
  coordinates: Coordinates[];
}

export interface MapCamera {
  center: Coordinates;
  zoom: number;
  heading?: number;
  pitch?: number;
}