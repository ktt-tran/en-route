import { Coordinates } from "@/src/types/coordinates";
import { Checkpoint } from "../checkpoint/checkpoint.types";

export type TransportMode =
    | "auto"
    | "walking"
    | "bicycling";

export interface OptimizationRequest {
  checkpoints: Checkpoint[];
  mode: TransportMode;
}

export interface RouteLeg {
    from_location: Coordinates;
    to_location: Coordinates;
    distance_miles: number;
    duration_seconds: number;
}

export interface OptimizedRoute {
  //fullRoute: Coordinates[];
  distance_miles: number;
  duration_seconds: number;
  geometry: Coordinates[];
  legs: RouteLeg[];
}