import { Coordinate } from "@/src/types/coordinates";

export interface SearchQuery {
  text:string;
}

export interface Address {
  street?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  country?: string;
  formatted?: string;
}

export interface SearchResult {
  name: string;
  address: Address;
  coordinate: Coordinate;
}