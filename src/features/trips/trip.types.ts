import { Coordinates } from "@/src/types/coordinates";


export interface Trip {

  id:string;

  origin:{
    name?:string;
    coordinates:Coordinates;
  };

  destination:{
    name?:string;
    coordinates:Coordinates;
  };

  distance:number;
  duration:number;
  route?:Coordinates[];
  createdAt:string;
  fuelRangeAtStart?:number;
}