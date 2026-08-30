import { Coordinates } from "@/src/types/coordinates";
import { Checkpoint } from "../checkpoint/checkpoint.types";

export function reorderCheckpointsFromRoute(
    routeCoordinates: Coordinates[],
    checkpoints: Checkpoint[],
): Checkpoint[] {
    return routeCoordinates
        .map((coordinate, index) => {
            const checkpoint = checkpoints.find(
                (checkpoint) =>
                    checkpoint.placeId.coordinates.latitude === coordinate.latitude &&
                    checkpoint.placeId.coordinates.longitude === coordinate.longitude
            );

            return {
                ...checkpoint,
                order: index
            }
        })
        .filter((checkpoint): checkpoint is Checkpoint => checkpoint !== undefined);
}