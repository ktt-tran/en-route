export type Checkpoint = {
  name: string;
  label?: string;
  distanceFromPrev?: number; // miles
  durationFromPrev?: number; // minutes
};

export type InfoCardProp = {
    TOTAL_DISTANCE: number,
    TOTAL_DURATION: number,
}

export type TripRouteCardProps = {
  stops: Checkpoint[];
};