import { Coordinate } from "@/src/types/coordinates";


export interface Trip {

  id:string;

  origin:{
    name?:string;
    coordinate:Coordinate;
  };

  destination:{
    name?:string;
    coordinate:Coordinate;
  };

  distance:number;
  duration:number;
  route?:Coordinate[];
  createdAt:string;
  fuelRangeAtStart?:number;
}