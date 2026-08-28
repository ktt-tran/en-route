import { Coordinates, PlaceID } from "@/src/types/coordinates";
import { Checkpoint } from "../checkpoint/checkpoint.types";
import { TransportMode } from "../routing/routing.types";

export interface TripRouteLeg {
    order: number;
    from: Coordinates;
    to: Coordinates;
    distance_miles: number;
    duration_seconds: number;
}

export interface TripHistory {
  id: number;
  origin: PlaceID;
  checkpoints: Checkpoint[];
  destination: PlaceID;
  finalLocation: Coordinates;
  distanceMiles: number;
  durationSeconds: number;
  transportMode: TransportMode;
  legs: TripRouteLeg[];
  startedAt: number;
  endedAt: number;
  arrived: boolean;
}