import type { TripHistory } from "@/src/features/trip/trip.types";
import type { RouteCardStop } from "./Card.types";

export function buildRouteCard(trip: TripHistory): RouteCardStop[] {

    const stops: RouteCardStop[] = [];

    // Origin
    stops.push({
        name: trip.origin.name ?? "Current Location",
        label: "Start",
    });

    // Checkpoints
    trip.checkpoints
        .sort((a, b) => a.order - b.order)
        .forEach((checkpoint, index) => {

            const leg = trip.legs[index];

            stops.push({
                name:
                    checkpoint.placeId?.name ??
                    "Unnamed Stop",

                label: `Stop ${index + 1}`,

                distanceFromPrev:
                    leg
                        ? Number(
                            leg.distance_miles.toFixed(1)
                        )
                        : undefined,

                durationFromPrev:
                    leg
                        ? Math.round(
                            leg.duration_seconds / 60
                        )
                        : undefined,
            });
        });

    // Destination
    const destinationLeg =
        trip.legs[trip.checkpoints.length];

    stops.push({
        name:
            trip.destination.name ??
            "Destination",

        label: "Destination",

        distanceFromPrev:
            destinationLeg
                ? Number(
                    destinationLeg.distance_miles.toFixed(1)
                )
                : undefined,

        durationFromPrev:
            destinationLeg
                ? Math.round(
                    destinationLeg.duration_seconds / 60
                )
                : undefined,
    });

    return stops;
}