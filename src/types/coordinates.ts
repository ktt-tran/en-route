export interface Coordinates {
  latitude:number;
  longitude:number;
}

export interface PlaceID {
    name?: string,
    coordinates: Coordinates,
}