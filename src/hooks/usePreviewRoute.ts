import { buildRouteRequest } from "../features/routing/route.builder";
import { useRoute } from "../lib/routeCore";
import { useTripStore } from "../store/tripStore";

// instead of waiting to calculate route only when the user begins the destination,
// the route is calculated when the selected destination changes and stored in 
// React Query when the user begins the route it can be pulled from cache.
export function usePreviewRoute() {
    const origin = useTripStore((state) => state.origin);
    const destination = useTripStore((state) => state.destination);
    const checkpoints = useTripStore((state) => state.totalCheckpoints);
    const transportMode = useTripStore((state) => state.transportMode);

    const request = 
        origin && destination
            ? buildRouteRequest({
                origin,
                checkpoints,
                destination,
                transportMode,
            }): undefined;

    return useRoute(request)

}