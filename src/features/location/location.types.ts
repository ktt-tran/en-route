import { Coordinate } from "@/src/types/coordinates";


export interface UserLocation {
  coordinate:Coordinate;
  accuracy:number;
  altitude?:number;
  speed?:number;
  heading?:number;
  timestamp:number;
}

export interface LocationPermission {
  granted:boolean;
}