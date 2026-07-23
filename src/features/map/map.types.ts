import { Coordinate } from "@/src/types/coordinates";

export interface MapRegion {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
}

export interface MapMarker {
  id: string;
  coordinate: Coordinate;
  title?: string;
  description?: string;
}

export interface MapRouteLine {
  coordinates: Coordinate[];
}

export interface MapCamera {
  center: Coordinate;
  zoom: number;
  heading?: number;
  pitch?: number;
}