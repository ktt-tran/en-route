import { Coordinate } from "@/src/types/coordinates";

export type CheckpointType =
  | "gas"
  | "food"
  | "rest"
  | "custom";

export interface Checkpoint {
  id:string;
  name:string;
  type:CheckpointType;
  coordinate:Coordinate;
  order:number;
}