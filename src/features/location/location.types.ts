import { Coordinates } from "@/src/types/coordinates";


export interface UserLocation {
  coordinates:Coordinates;
  accuracy?:number | null; // measured in meters
  altitude?:number | null;
  heading?:number | null;
  speed?:number | null;
  timestamp:number;
}