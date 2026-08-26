import { Coordinates } from "../types/coordinates";

const EARTH_RADIUS_METERS = 6_371_000;

export function toRadians(value: number) {
    return (value * Math.PI) / 180;
}

export function distanceBetweenCoordinates(a: Coordinates, b: Coordinates): number {
    const lat1 = toRadians(a.latitude);
    const lat2 = toRadians(b.latitude);

    const deltaLat = toRadians(b.latitude - a.latitude);
    const deltaLon = toRadians(b.longitude - a.longitude);

    const sinLat = Math.sin(deltaLat / 2);
    const sinLon = Math.sin(deltaLon / 2);

    const h =
        sinLat * sinLat +
        Math.cos(lat1) *
        Math.cos(lat2) *
        sinLon *
        sinLon;

    const angularDistance =
        2*Math.atan2(Math.sqrt(h), Math.sqrt(1 - h));

    return EARTH_RADIUS_METERS * angularDistance
}