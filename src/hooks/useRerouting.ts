import { useNavigationStore } from "@/src/store/navigationStore";
import { useCallback, useRef } from "react";
import { UserLocation } from "../features/location/location.types";
import { buildRouteRequest } from "../features/routing/route.builder";
import { useTripStore } from "../store/tripStore";
import { useRoute } from "./useRoute";

export function useRerouting(userLocation: UserLocation | null) {
    const destination = useTripStore((state) => state.destination);
    const checkpoints = useTripStore((state) => state.unfinishedCheckpoints);
    const transportMode = useTripStore((state) => state.transportMode);
    const updateNavigationRoute = useNavigationStore((state) => state.updateNavigationRoute);
    const setRerouting = useNavigationStore((state) => state.setRerouting);
    const reroutingRef = useRef(false);

    const request = 
        userLocation && destination
            ? buildRouteRequest({
                origin: userLocation.coordinates,
                checkpoints,
                destination,
                transportMode,
            }): undefined;

    const { refetch } = useRoute(request);

    const reroute = useCallback(async (): Promise<boolean> => {
        if (reroutingRef.current) { return false; }
        if (!request) { return false; }

        reroutingRef.current = true;
        setRerouting(true);

        try {
            const result = await refetch();
            if(!result.data) { return false; }
            updateNavigationRoute(result.data);

            return true;
        } catch (error) {
            console.log("[Reroute] failed:", error);

            return false
        } finally {
            reroutingRef.current = false;
            setRerouting(false);
        }
    }, [
        request,
        refetch,
        updateNavigationRoute,
        setRerouting,
    ]);

    return { reroute };
}