import { Coordinates } from "@/src/types/coordinates";

export type TransportMode =
    | "auto"
    | "walking"
    | "bicycling";

export interface RouteRequest {
    origin: Coordinates;
    destination: Coordinates;
    mode: TransportMode;
}

export interface Maneuver {
    instruction: string;
    distance_miles: number;
    duration_seconds: number;
}

export interface RouteResponse {
    //id: string;
    distance_miles: number;
    duration_seconds: number;
    geometry: Coordinates[];
    maneuvers: Maneuver[];
}

export interface Route {
    id?: string;
    geometry: Coordinates[];
    distance: number;
    duration: number;
    maneuvers: Maneuver[];
    mode: TransportMode;
    origin: Coordinates;
    destination: Coordinates;
}