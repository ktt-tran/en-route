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
  coordinates:{
    latitude:number;
    longitude:number;
  };
  price?:number;
}