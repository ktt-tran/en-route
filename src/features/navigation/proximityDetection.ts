import type { Coordinates } from "@/src/types/coordinates";
import { distanceBetweenCoordinates } from "@/src/utils/distance";

const ARRIVAL_THRESHOLD_METERS = 30;
const OFF_ROUTE_THRESHOLD_METERS = 50;

export function isArrived(userLocation: Coordinates, destination: Coordinates): boolean {
    const distance = distanceBetweenCoordinates(userLocation, destination);

    return distance <= ARRIVAL_THRESHOLD_METERS;
}

export function isLocationOffRoute(distanceFromRoute: number): boolean {
    return distanceFromRoute > OFF_ROUTE_THRESHOLD_METERS;
}