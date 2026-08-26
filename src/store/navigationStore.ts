import { RouteResponse, TransportMode } from "@/src/features/routing/routing.types";
import { Coordinates, PlaceID } from "@/src/types/coordinates";
import { create } from "zustand";

type NavigationStatus =
    | "idle"
    | "navigating"
    | "arrived";

interface NavigationStore {
    // route preview
    origin: Coordinates | null;
    destination: PlaceID | null;
    transportMode: TransportMode;
    // active navigation session
    navigationRoute: RouteResponse | null;
    liveLocation: Coordinates | null;
    isRerouting: boolean;
    // GPS route matching
    matchedLocation: Coordinates | null;
    distanceAlongRoute: number;
    distanceFromRoute: number;
    routeProgress: number;
    // route progress data
    distanceRemaining: number;
    remainingDuration: number;
    // navigation robustness
    isOffRoute: boolean
    // session status
    navigationActive: boolean;
    navigationStatus: NavigationStatus;
    arrivalDetected: boolean;
    // timestamp data
    navigationStartedAt: number | null;
    navigationEndedAt: number | null;
    setOrigin: (origin: Coordinates) => void;
    clearOrigin: () => void;
    setDestination: (destination: PlaceID) => void;
    clearDestination: () => void;
    setTransportMode: (mode: TransportMode) => void;
    updateNavigationRoute: (route: RouteResponse) => void;
    setLiveLocation: (position: Coordinates) => void;
    setRerouting: (isRerouting: boolean) => void;
    updateRouteMatch: (
        matchedLocation: Coordinates,
        distanceAlongRoute: number,
        distanceFromRoute: number
    ) => void;
    startNavigation: (origin: Coordinates, route: RouteResponse) => boolean;
    stopNavigation: () => void;
    setOffRoute: (isOffRoute: boolean) => void;
    setNavigationStatus: (state: NavigationStatus) => void;
}

export const useNavigationStore = create<NavigationStore>((set, get) => ({
    origin: null,
    destination: null,
    transportMode: "auto",
    navigationRoute: null,
    liveLocation: null,
    isRerouting: false,
    matchedLocation: null,
    distanceAlongRoute: 0,
    distanceFromRoute: 0,
    routeProgress: 0,
    distanceRemaining: 0,
    remainingDuration: 0,
    isOffRoute: false,
    navigationActive: false,
    navigationStatus: "idle",
    arrivalDetected: false,
    navigationStartedAt: null,
    navigationEndedAt: null,
    setOrigin: (origin) => set({origin}),
    clearOrigin: () => set({origin: null}),
    setDestination: (destination) => set({destination}),
    clearDestination: () => set({destination: null}),
    setTransportMode: (transportMode) => set({transportMode}),
    updateNavigationRoute: (navigationRoute) => set({navigationRoute}),
    setLiveLocation: (liveLocation) => set({liveLocation}),
    setRerouting: (isRerouting) => set({isRerouting}),
    //
    // update route progress
    //
    updateRouteMatch: (matchedLocation,distanceAlongRoute,distanceFromRoute) => {
        // grab snapshot of state ad calculate the accuracy of the user's trip en-route
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
    //
    // create the route store for an active trip
    //
    startNavigation: (origin, route) => {
        if (!origin) { return false; }

        set({
            origin: origin,
            navigationRoute: route,
            navigationStatus: "navigating",
            navigationActive: true,
            navigationStartedAt: Date.now(),
        });

        return true;
    },  
    //
    // reset the route store when the trip ends
    //
    stopNavigation: () => set({
        navigationRoute: null,
        isRerouting: false,
        matchedLocation: null,
        distanceAlongRoute: 0,
        distanceFromRoute: 0,
        routeProgress: 0,
        isOffRoute: false,
        navigationStatus: "idle",
        navigationActive: false,
        navigationEndedAt: Date.now(),
    }),
    setOffRoute: (isOffRoute) => set({isOffRoute}),
    setNavigationStatus: (navigationStatus) => set({navigationStatus}),
}));