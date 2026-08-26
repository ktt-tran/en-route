const OFF_ROUTE_THRESHOLD_METERS = 50;

export function isLocationOffRoute(distanceFromRoute: number): boolean {
    return distanceFromRoute > OFF_ROUTE_THRESHOLD_METERS;
}