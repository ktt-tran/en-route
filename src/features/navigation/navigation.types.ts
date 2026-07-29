import { Coordinate } from "@/src/types/coordinates";
import { UserLocation } from "../location/location.types";
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
  location:UserLocation;
  progress:RouteProgress;
  nextManeuver?:Maneuver;
}