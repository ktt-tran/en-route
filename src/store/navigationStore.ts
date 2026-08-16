import { RouteResponse, TransportationMode } from "@/src/features/routing/routing.types";
import { Coordinates, Destination } from "@/src/types/coordinates";
import { create } from "zustand";

interface NavigationStore {
    // route preview
    origin: Coordinates | null;
    destination: Destination | null;
    transportationMode: TransportationMode;
    // active navigation
    navigationOrigin: Coordinates | null;
    navigationRoute: RouteResponse | null;
    liveLocation: Coordinates | null;
    // GPS route matching
    matchedLocation: Coordinates | null;
    distanceAlongRoute: number;
    distanceFromRoute: number;
    routeProgress: number;
    // route progress data
    distanceRemaining: number;
    remainingDuration: number;
    // active navigation session
    navigationActive: boolean;
    setOrigin: (origin: Coordinates) => void;
    clearOrigin: () => void;
    setDestination: (destination: Destination) => void;
    clearDestination: () => void;
    setTransportationMode: (mode: TransportationMode) => void;
    setLiveLocation: (location: Coordinates) => void;
    updateRouteMatch: (
        matchedLocation: Coordinates,
        distanceAlongRoute: number,
        distanceFromRoute: number
    ) => void;
    startNavigation: (origin: Coordinates, route: RouteResponse) => boolean;
    stopNavigation: () => void;
}

export const useNavigationStore = create<NavigationStore>((set, get) => ({
    origin: null,
    destination: null,
    transportationMode: "auto",
    navigationOrigin: null,
    navigationRoute: null,
    liveLocation: null,
    matchedLocation: null,
    distanceAlongRoute: 0,
    distanceFromRoute: 0,
    routeProgress: 0,
    distanceRemaining: 0,
    remainingDuration: 0,
    navigationActive: false,
    setOrigin: (origin) => set({origin}),
    clearOrigin: () => set({origin: null}),
    setDestination: (destination) => set({destination}),
    clearDestination: () => set({destination: null}),
    setTransportationMode: (transportationMode) => set({transportationMode}),
    setLiveLocation: (liveLocation) => set({liveLocation}),
    updateRouteMatch: (matchedLocation,distanceAlongRoute,distanceFromRoute) => {
        const { navigationRoute } = get();

        if (!navigationRoute) { console.log("[NavigationStore] No route"); return; }

        // existing calculations
        const routeDistanceMeters = navigationRoute.distance_miles * 1609.344;

        const routeProgress =
            routeDistanceMeters > 0
                ? Math.min(
                    1,
                    Math.max(
                        0,
                        distanceAlongRoute / routeDistanceMeters
                    )
                )
                : 0;

        // new calculations
        const distanceRemaining = Math.max(routeDistanceMeters - distanceAlongRoute);
        const remainingDuration = navigationRoute.duration_seconds * (1 - routeProgress);

        console.log("[NavigationStore] Route progress:", {
            distanceAlongRoute,
            distanceFromRoute,
            routeDistanceMeters,
            routeProgress,
            distanceRemaining,
            remainingDuration,
        });

        set({
            matchedLocation,
            distanceAlongRoute,
            distanceFromRoute,
            routeProgress,
            distanceRemaining,
            remainingDuration,
        });
    },
    startNavigation: (origin, route) => {
        if (!origin) { return false; }

        set({
            origin: origin,
            navigationOrigin: origin,
            navigationRoute: route,
            navigationActive: true,
        });

        return true;
    },  
    stopNavigation: () => set({
        navigationOrigin: null,
        navigationRoute: null,
        liveLocation: null, 
        matchedLocation: null,
        distanceAlongRoute: 0,
        distanceFromRoute: 0,
        routeProgress: 0,
        navigationActive: false,
    }),
}));