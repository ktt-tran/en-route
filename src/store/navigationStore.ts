import { TransportationMode } from "@/src/features/routing/routing.types";
import { Coordinates, Destination } from "@/src/types/coordinates";
import { create } from "zustand";

interface NavigationStore {
    origin: Coordinates | null;
    destination: Destination | null;
    transportationMode: TransportationMode;
    navigationActive: boolean;
    setOrigin: (origin: Coordinates) => void;
    clearOrigin: () => void;
    setDestination: (destination: Destination) => void;
    clearDestination: () => void;
    setTransportationMode: (mode: TransportationMode) => void;
    beginNavigation: () => void;
    stopNavigation: () => void;
}

export const useNavigationStore = create<NavigationStore>((set) => ({
        origin: null,
        destination: null,
        transportationMode: "auto",
        navigationActive: false,

        setOrigin: (origin) => set({origin}),
        clearOrigin: () => set({origin: null}),
        setDestination: (destination) => set({destination}),
        clearDestination: () => set({destination: null}),
        setTransportationMode: (transportationMode) => set({transportationMode}),
        beginNavigation: () => set({navigationActive: true}),
        stopNavigation: () => set({navigationActive: false}),
    }));