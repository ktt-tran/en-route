import { useNavigationStore } from "@/src/store/navigationStore";
import { useCallback, useRef } from "react";
import { UserLocation } from "../features/location/location.types";
import { buildRouteRequest } from "../features/routing/route.builder";
import { fetchRoute } from "../features/routing/routing.service";
import { RouteRequest } from "../features/routing/routing.types";
import { useTripStore } from "../store/tripStore";

export function useRerouting(userLocation: UserLocation | null) {
    const destination = useTripStore((state) => state.destination);
    const checkpoints = useTripStore((state) => state.unfinishedCheckpoints);
    const transportMode = useTripStore((state) => state.transportMode);
    const updateNavigationRoute = useNavigationStore((state) => state.updateNavigationRoute);
    const setRerouting = useNavigationStore((state) => state.setRerouting);
    const reroutingRef = useRef(false);

    const reroute = useCallback(async (): Promise<boolean> => {
        if (reroutingRef.current) { return false; }
        if (!userLocation || !destination) { return false; }

        reroutingRef.current = true;
        setRerouting(true);

        try {

            const request: RouteRequest = buildRouteRequest({
                origin: userLocation.coordinates,
                checkpoints,
                destination,
                transportMode,
            });

            const route = await fetchRoute(request);

            updateNavigationRoute(route);

            return true;
        } catch (error) {
            console.log("[Reroute] failed:", error);

            return false
        } finally {
            reroutingRef.current = false;
            setRerouting(false);
        }
    }, [
        userLocation,
        destination,
        transportMode,
        updateNavigationRoute,
        setRerouting,
    ]);

    return { reroute };
}