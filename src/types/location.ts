import { Coordinate } from "./coordinates";


export interface Location {
  coordinate: Coordinate;
  accuracy?: number;
  altitude?: number;
  speed?: number;
  heading?: number;
  timestamp: number;
}