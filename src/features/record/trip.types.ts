import { Coordinates, PlaceID } from "@/src/types/coordinates";
import { TransportMode } from "../routing/routing.types";
export interface TripHistory {
  id: number;
  origin: PlaceID;
  destination: PlaceID;
  finalLocation: Coordinates;
  distanceMiles: number;
  durationSeconds: number;
  transportMode: TransportMode;
  fullRoute?:PlaceID[];
  startedAt: number;
  endedAt: number;
  arrived: boolean;
}