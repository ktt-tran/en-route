import { Coordinate } from "@/src/types/coordinates";


export interface UserLocation {
  coordinate:Coordinate;
  accuracy?:number | null; // measured in meters
  altitude?:number | null;
  heading?:number | null;
  speed?:number | null;
  timestamp:number;
}