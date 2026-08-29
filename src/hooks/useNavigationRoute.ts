import { useNavigationStore } from "@/src/store/navigationStore";
import { buildRouteRequest } from "../features/routing/route.builder";
import { fetchRoute } from "../features/routing/routing.service";
import { useTripStore } from "../store/tripStore";

export function useNavigationRoute() {
    const origin = useTripStore((state) => state.origin);
    const destination = useTripStore((state) => state.destination);
    const checkpoints = useTripStore((state) => state.totalCheckpoints);
    const transportMode = useTripStore((state) => state.transportMode);
    const startNavigation = useNavigationStore((state) => state.startNavigation);

    async function beginNavigation(): Promise<boolean> {
        if (!destination) { return false; }

        const request = buildRouteRequest({
            origin,
            checkpoints,
            destination,
            transportMode,
        });

        try {
            const route = await fetchRoute(request);
            const started = startNavigation(route);
            if (!started) { return false; }
            return true;
        } catch (error) {
            return false;
        }
    }

    return { beginNavigation };
}   