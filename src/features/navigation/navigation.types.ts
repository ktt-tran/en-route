import { Coordinates } from "@/src/types/coordinates";
import { Maneuver } from "../routing/routing.types";

export interface RouteMatch {
    matchedLocation: Coordinates;
    distanceFromRoute: number;
    distanceAlongRoute: number;
}



export interface NavigationSession {
  active:boolean;
  routeId:string;
  currentLocation:Location;
  progress:RouteProgress;
  nextManeuver?:Maneuver;
}

export interface RouteProgress {
  distanceTraveled:number;
  distanceRemaining:number;
  percentage:number;
}