import { Coordinates } from "@/src/types/coordinates";

export type CheckpointType =
  | "gas"
  | "food"
  | "rest"
  | "custom";

export interface Checkpoint {
  id:string;
  name:string;
  type:CheckpointType;
  coordinates:Coordinates;
  order:number;
}