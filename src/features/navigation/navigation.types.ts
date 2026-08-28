import { Coordinates } from "@/src/types/coordinates";

export interface RouteMatch {
    matchedLocation: Coordinates;
    distanceFromRoute: number;
    distanceAlongRoute: number;
}