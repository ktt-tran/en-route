export interface FuelStatus {
  rangeRemaining:number; // miles
}

export interface FuelRequirement {
  tripDistance:number;
  rangeRemaining:number;
  needsFuelStop:boolean;
}

export interface FuelStop {
  id:string
  name:string;
  coordinate:{
    latitude:number;
    longitude:number;
  };
  price?:number;
}