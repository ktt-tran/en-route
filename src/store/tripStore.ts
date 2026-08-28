import type { Checkpoint } from "@/src/features/checkpoint/checkpoint.types";
import type { TransportMode } from "@/src/features/routing/routing.types";
import type { Coordinates, PlaceID } from "@/src/types/coordinates";
import { create } from "zustand";

export type RoutePlanningMode =
    | "exact"
    | "optimize";

interface TripStore {
    // Trip planning state
    origin: Coordinates | null;
    destination: PlaceID | null;
    checkpoints: Checkpoint[];
    transportMode: TransportMode;

    // Route planning mode
    routePlanningMode: RoutePlanningMode;

    // Origin / destination
    setOrigin: (origin: Coordinates) => void;
    clearOrigin: () => void;

    setDestination: (destination: PlaceID) => void;
    clearDestination: () => void;

    // Transport
    setTransportMode: (mode: TransportMode) => void;

    // Mode
    setPlanningMode: (mode: RoutePlanningMode) => void;

    // Checkpoints
    addCheckpoint: (checkpoint: Checkpoint) => void;
    removeCheckpoint: (id: string) => void;
    updateCheckpoint: (id: string, updates: Partial<Omit<Checkpoint, "id">>) => void;
    reorderCheckpoints: (checkpoints: Checkpoint[]) => void;

    // Reset
    clearTrip: () => void;
}

export const useTripStore = create<TripStore>((set) => ({
    origin: null,
    destination: null,
    checkpoints: [],
    transportMode: "auto",
    routePlanningMode: "exact",

    setOrigin: (origin) => set({ origin }),
    clearOrigin: () => set({ origin: null }),

    setDestination: (destination) => set({ destination }),
    clearDestination: () => set({ destination: null }),

    setTransportMode: (transportMode) => set({ transportMode }),

    setPlanningMode: (routePlanningMode) => set({ routePlanningMode }),

    addCheckpoint: (checkpoint) =>
        set((state) => ({
            checkpoints: [
                ...state.checkpoints,
                {
                    ...checkpoint,
                    order: state.checkpoints.length,
                },
            ],
        })),

    removeCheckpoint: (id) =>
        set((state) => {
            const checkpoints = state.checkpoints
                .filter(
                    (checkpoint) =>
                        checkpoint.id !== id
                )
                .map((checkpoint, index) => ({
                    ...checkpoint,
                    order: index,
                }));

            return { checkpoints };
        }),

    updateCheckpoint: (id, updates) =>
        set((state) => ({
            checkpoints: state.checkpoints.map(
                (checkpoint) =>
                    checkpoint.id === id
                        ? {
                            ...checkpoint,
                            ...updates,
                        }
                        : checkpoint
            ),
        })),

    reorderCheckpoints: (checkpoints) =>
        set({
            checkpoints: checkpoints.map(
                (checkpoint, index) => ({
                    ...checkpoint,
                    order: index,
                })
            ),
        }),

    clearTrip: () =>
        set({
            origin: null,
            destination: null,
            checkpoints: [],
            transportMode: "auto",
        }),
}));