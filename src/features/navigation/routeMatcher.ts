import { Coordinates } from "@/src/types/coordinates";
import { distanceBetweenCoordinates, toRadians } from "@/src/utils/distance";
import { RouteMatch } from "./navigation.types";

export function matchLocationToRoute(
    location: Coordinates,
    route: Coordinates[]
): RouteMatch | null {

    if (route.length < 2) {
        return null;
    }

    let closestPoint = route[0];
    let closestDistance = Infinity;
    let distanceAlongRoute = 0;
    let accumulatedDistance = 0;

    for (let i = 0; i < route.length - 1; i++) {
        const start = route[i];
        const end = route[i + 1];

        const segmentLength = distanceBetweenCoordinates(start, end);

        if (segmentLength === 0) {
            continue;
        }

        const projection = projectPointOntoSegment(
            location,
            start,
            end
        );

        const distanceToProjection =
            distanceBetweenCoordinates(location, projection);

        if (distanceToProjection < closestDistance) {
            closestDistance = distanceToProjection;
            closestPoint = projection;

            const distanceToProjectionAlongSegment =
                distanceBetweenCoordinates(start, projection);

            distanceAlongRoute =
                accumulatedDistance +
                distanceToProjectionAlongSegment;
        }

        accumulatedDistance += segmentLength;
    }

    return {
        matchedLocation: closestPoint,
        distanceFromRoute: closestDistance,
        distanceAlongRoute,
    };
}

function projectPointOntoSegment(
    point: Coordinates,
    start: Coordinates,
    end: Coordinates
): Coordinates {

    const latScale = 111_320;

    const lonScale =
        111_320 *
        Math.cos(toRadians(point.latitude));

    const x =
        (point.longitude - start.longitude) *
        lonScale;

    const y =
        (point.latitude - start.latitude) *
        latScale;

    const endX =
        (end.longitude - start.longitude) *
        lonScale;

    const endY =
        (end.latitude - start.latitude) *
        latScale;

    const segmentSquared =
        endX * endX +
        endY * endY;

    if (segmentSquared === 0) {
        return start;
    }

    const t =
        (x * endX + y * endY) /
        segmentSquared;

    const clampedT =
        Math.max(0, Math.min(1, t));

    return {
        latitude:
            start.latitude +
            (end.latitude - start.latitude) *
            clampedT,

        longitude:
            start.longitude +
            (end.longitude - start.longitude) *
            clampedT,
    };
}