import { Coordinates } from "@/src/types/coordinates";

export type TransportMode =
    | "auto"
    | "walking"
    | "bicycling";

export interface RouteRequest {
    locations: Coordinates[];
    mode: TransportMode;
}

export interface RouteLeg {
    from_location: Coordinates;
    to_location: Coordinates;
    distance_miles: number;
    duration_seconds: number;
}

export interface RouteResponse {
    //fullRoute: Coordinates[];
    distance_miles: number;
    duration_seconds: number;
    geometry: Coordinates[];
    legs: RouteLeg[];
}