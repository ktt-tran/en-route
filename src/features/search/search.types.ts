import { Coordinate } from "@/src/types/coordinates";

export interface SearchQuery {
  text:string;
}

export interface SearchResult {
  id:string;
  name:string;
  address?:string;
  coordinate:Coordinate;
}