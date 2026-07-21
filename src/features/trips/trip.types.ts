import { Location } from "@/src/types/location";

export interface Trip {
  id: string;

  origin: Location;

  destination: Location;

  checkpoints: Location[];

  distance: number;

  duration: number;

  createdAt: string;
}