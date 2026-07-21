import { Location } from "@/src/types/location";

export interface Route {
  coordinates: Location[];

  distance: number;

  duration: number;
}