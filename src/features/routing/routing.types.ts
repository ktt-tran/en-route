import { Coordinate } from "@/src/types/coordinates";

export interface Route {
  id:string;
  geometry:Coordinate[];
  distance:number;
  duration:number;
  legs:RouteLeg[];

}

export interface RouteLeg {
  distance:number;
  duration:number;
  maneuvers:Maneuver[];
}


export interface Maneuver {
  instruction:string;
  type:string;
  distance:number;
  coordinate:Coordinate;
}