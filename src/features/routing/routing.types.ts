import { Coordinates } from "@/src/types/coordinates";

export type TransportationMode =
    | "auto"
    | "walking"
    | "bicycling";

export interface RouteRequest {
    origin: Coordinates
    destination: Coordinates
    mode: TransportationMode
}

export interface Maneuver {
    instruction: string;
    distance_miles: number;
    duration_seconds: number;
}

export interface RouteResponse {
    distance_miles: number
    duration_seconds: number
    geometry: Coordinates[]
    maneuvers: Maneuver[]
}

export interface Route {
    id?: string;
    geometry: Coordinates[];
    distance: number;
    duration: number;
    maneuvers: Maneuver[];
    mode: TransportationMode;
    origin: Coordinates;
    destination: Coordinates;
}

export interface RouteLeg {
  distance:number;
  duration:number;
  maneuvers:Maneuver[];
}