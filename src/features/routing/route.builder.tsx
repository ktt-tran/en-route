import type { Checkpoint } from "@/src/features/checkpoint/checkpoint.types";
import type { Coordinates, PlaceID } from "@/src/types/coordinates";
import type { RouteRequest, TransportMode } from "./routing.types";

interface TripRoutingInput {
    origin: Coordinates | null;
    checkpoints: Checkpoint[];
    destination: PlaceID;
    transportMode: TransportMode;
}

export function buildRouteRequest(trip: TripRoutingInput): RouteRequest {
    if (!trip.origin) { throw new Error("[RouteBuilder] Origin is required."); }
    if (!trip.destination) { throw new Error("[RouteBuilder] Destination is required."); }
    

    const orderedCheckpoints = [...trip.checkpoints]
        .sort((a, b) => a.order - b.order);

    const checkpointLocations = orderedCheckpoints
        .filter((checkpoint) => checkpoint.placeId)
        .map(
            (checkpoint) =>
                checkpoint.placeId!.coordinates
        );

    const locations: Coordinates[] = [
        trip.origin,
        ...checkpointLocations,
        trip.destination.coordinates,
    ];

    if (locations.length < 2) {
        throw new Error(
            "A route requires at least an origin and destination."
        );
    }

    return {
        locations,
        mode: trip.transportMode,
    };
}