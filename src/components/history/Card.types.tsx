export type InfoCardProp = {
    TOTAL_DISTANCE: number,
    TOTAL_DURATION: number,
}

export type RouteCardStop = {
  name: string;
  label?: string;
  distanceFromPrev?: number; // miles
  durationFromPrev?: number; // minutes
};

export type TripRouteCardProps = {
  stops: RouteCardStop[];
};