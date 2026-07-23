import { Checkpoint } from "../checkpoints/checkpoint.types";

export interface OptimizationRequest {
  start:string;
  destination:string;
  checkpoints:Checkpoint[];
}

export interface OptimizedRoute {
  checkpoints:Checkpoint[];
  totalDistance:number;
  totalDuration:number;
}