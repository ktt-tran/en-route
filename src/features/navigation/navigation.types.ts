import { Coordinate } from "@/src/types/coordinates";
import { Location } from "@/src/types/location";
import { Maneuver } from "../routing/routing.types";

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

export interface MapMatchingResult {
  snappedLocation:Coordinate;
  distanceFromRoute:number;
  segmentIndex:number;
}

export interface NavigationUpdate {
  location:Location;
  progress:RouteProgress;
  nextManeuver?:Maneuver;
}