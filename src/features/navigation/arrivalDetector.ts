import type { Coordinates } from "@/src/types/coordinates";
import { distanceBetweenCoordinates } from "@/src/utils/distance";

const ARRIVAL_THRESHOLD_METERS = 30;

export function isArrived(userLocation: Coordinates, destination: Coordinates): boolean {
    const distance = distanceBetweenCoordinates(userLocation, destination);

    return distance <= ARRIVAL_THRESHOLD_METERS;
}