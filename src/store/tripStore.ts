import type { Checkpoint } from "@/src/features/checkpoint/checkpoint.types";
import type { TransportMode } from "@/src/features/routing/routing.types";
import type { Coordinates, PlaceID } from "@/src/types/coordinates";
import { create } from "zustand";
import { distanceBetweenCoordinates } from "../utils/distance";

export type RoutePlanningMode =
    | "exact"
    | "optimize";

const CHECKPOINT_PROXIMITY_METERS = 70;

interface TripStore {
    // Trip planning state
    origin: Coordinates | null;
    destination: PlaceID | null;

    // All checkpoints selected for trip
    totalCheckpoints: Checkpoint[];

    // Checkpoints that have not yet been reached
    unfinishedCheckpoints: Checkpoint[];

    transportMode: TransportMode;

    // Route planning mode
    routeMode: RoutePlanningMode;

    // Origin / destination
    setOrigin: (origin: Coordinates) => void;
    clearOrigin: () => void;

    setDestination: (destination: PlaceID) => void;
    clearDestination: () => void;

    // Transport
    setTransportMode: (mode: TransportMode) => void;

    // Mode
    setRouteMode: (mode: RoutePlanningMode) => void;

    // Checkpoints
    addCheckpoint: (checkpoint: Checkpoint) => void;
    removeCheckpoint: (id: string) => void;
    updateCheckpoint: (id: string, updates: Partial<Omit<Checkpoint, "id">>) => void;
    setCheckpoints: (checkpoints: Checkpoint[]) => void;
    reorderCheckpoints: (checkpoints: Checkpoint[]) => void;

    // Navigation checkpoint progress
    remainingCheckpoints: (location: Coordinates) => boolean;

    // Reset
    clearTrip: () => void;
}

export const useTripStore = create<TripStore>((set, get) => ({
    origin: null,
    destination: null,
    totalCheckpoints: [],
    unfinishedCheckpoints: [],
    transportMode: "auto",
    routeMode: "exact",

    setOrigin: (origin) => set({ origin }),
    clearOrigin: () => set({ origin: null }),

    setDestination: (destination) => set({ destination }),
    clearDestination: () => set({ destination: null }),

    setTransportMode: (transportMode) => set({ transportMode }),

    setRouteMode: (routeMode) => set({ routeMode }),

    addCheckpoint: (checkpoint) =>
        set((state) => ({
          totalCheckpoints: [
            ...state.totalCheckpoints,
            {
                ...checkpoint,
                order: state.totalCheckpoints.length,
            },
          ],

          unfinishedCheckpoints: [
            ...state.totalCheckpoints,
            {
                ...checkpoint,
                order: state.unfinishedCheckpoints.length,
            },
          ],
        })),

    removeCheckpoint: (id) =>
        set((state) => {
            const totalCheckpoints = state.totalCheckpoints
                .filter(
                    (checkpoint) =>
                        checkpoint.id !== id
                )
                .map((checkpoint, index) => ({
                    ...checkpoint,
                    order: index,
                }));

            const unfinishedCheckpoints =
                state.unfinishedCheckpoints
                    .filter(
                        (checkpoint) =>
                            checkpoint.id !== id
                    )
                    .map((checkpoint) => {
                        const updated =
                            totalCheckpoints.find(
                                (item) =>
                                    item.id === checkpoint.id
                            );

                        return updated ?? checkpoint;
                    });

            return {
                totalCheckpoints,
                unfinishedCheckpoints,
            };
        }),

    updateCheckpoint: (id, updates) =>
        set((state) => ({
            totalCheckpoints:
                state.totalCheckpoints.map(
                    (checkpoint) =>
                        checkpoint.id === id
                            ? {
                                ...checkpoint,
                                ...updates,
                            }
                            : checkpoint
                ),

            unfinishedCheckpoints:
                state.unfinishedCheckpoints.map(
                    (checkpoint) =>
                        checkpoint.id === id
                            ? {
                                ...checkpoint,
                                ...updates,
                            }
                            : checkpoint
                ),
        })),

    setCheckpoints: (checkpoints) =>
        set({
            totalCheckpoints: checkpoints,
            unfinishedCheckpoints: checkpoints,
        }),

    reorderCheckpoints: (checkpoints) =>
        set((state) => {
            const reordered = checkpoints.map(
                (checkpoint, index) => ({
                    ...checkpoint,
                    order: index,
                })
            );

            const unfinishedIds = new Set(
                state.unfinishedCheckpoints.map(
                    (checkpoint) => checkpoint.id
                )
            );

            return {
                totalCheckpoints: reordered,

                unfinishedCheckpoints:
                    reordered.filter(
                        (checkpoint) =>
                            unfinishedIds.has(
                                checkpoint.id
                            )
                    ),
            };
        }),

        remainingCheckpoints: (location) => {
            const {
                unfinishedCheckpoints,
            } = get();

            const unfinished =
                [...unfinishedCheckpoints].sort(
                    (a, b) => a.order - b.order
                );

            if (unfinished.length === 0) {
                return false;
            }

            /*
            * Find the first unfinished checkpoint
            * that the user is close enough to.
            */
            const reachedIndex =
                unfinished.findIndex(
                    (checkpoint) => {
                        const distance =
                            distanceBetweenCoordinates(
                                location,
                                checkpoint.placeId.coordinates
                            );

                        return (
                            distance <=
                            CHECKPOINT_PROXIMITY_METERS
                        );
                    }
                );

            if (reachedIndex === -1) {
                return false;
            }

            /*
            * Everything through the reached
            * checkpoint is now complete.
            *
            * Example:
            *
            * unfinished:
            * [A, B, C, D]
            *
            * user reaches C
            *
            * result:
            * [D]
            */
            const remainingCheckpoints =
                unfinished.slice(
                    reachedIndex + 1
                );

            set({
                unfinishedCheckpoints:
                    remainingCheckpoints,
            });

            return true;
        },

    clearTrip: () =>
        set({
            origin: null,
            destination: null,
            totalCheckpoints: [],
            unfinishedCheckpoints: [],
            transportMode: "auto",
            routeMode: "exact",
        }),
}));