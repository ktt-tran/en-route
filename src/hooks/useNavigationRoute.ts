import { useNavigationStore } from "@/src/store/navigationStore";
import { buildRouteRequest } from "../features/routing/route.builder";
import { useTripStore } from "../store/tripStore";
import { useRoute } from "./useRoute";

export function useNavigationRoute() {
    const origin = useTripStore((state) => state.origin);
    const destination = useTripStore((state) => state.destination);
    const checkpoints = useTripStore((state) => state.totalCheckpoints);
    const transportMode = useTripStore((state) => state.transportMode);
    const startNavigation = useNavigationStore((state) => state.startNavigation);

    const request = 
        origin && destination
            ? buildRouteRequest({
                origin,
                checkpoints,
                destination,
                transportMode,
            }) : undefined;

    const { refetch, isLoading, error } = useRoute(request);

    async function beginNavigation(): Promise<boolean> {
        if (!request) { return false; }

        try {
            const result = await refetch();
            if (!result.data) { return false; }
            const started = startNavigation(result.data);

            return started;
        } catch (error) {
            console.log("[Navigation] failed:", error);
            return false;
        }
    }

    return { beginNavigation, isLoading, error };
}   