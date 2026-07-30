import { Coordinates } from "@/src/types/coordinates";


export interface Trip {

  id:string;

  origin:{
    name?:string;
    coordinate:Coordinates;
  };

  destination:{
    name?:string;
    coordinate:Coordinates;
  };

  distance:number;
  duration:number;
  route?:Coordinates[];
  createdAt:string;
  fuelRangeAtStart?:number;
}