import { fetchRoute } from "@/src/features/routing/routing.service";
import { RouteRequest, RouteResponse } from "@/src/features/routing/routing.types";
import { useQuery } from "@tanstack/react-query";
import { reorderCheckpointsFromRoute } from "../features/checkpoint/checkpoint.mapping";
import { fetchOptimizedRoute } from "../features/optimization/optimization.service";
import { useTripStore } from "../store/tripStore";

// Backend API fetch hook returns function that stores the route data until it is 
// updated or gets accessed for the routing information.
export function useRoute(request?: RouteRequest) {
    const checkpoints = useTripStore((state) => state.totalCheckpoints);
    const routeMode = useTripStore((state) => state.routeMode);
    const setCheckpoints = useTripStore((state) => state.setCheckpoints);
    const { data: route, isLoading, error, refetch } = useQuery<RouteResponse>({
        queryKey: ["route", request, routeMode],
        queryFn: async () => {
            if (!request) {
                throw new Error("Route request is required");
            }
            
            const newRoute = 
                routeMode === "optimize"
                    ? await fetchOptimizedRoute(request)
                    : await fetchRoute(request)

            if (routeMode === "optimize") {
                const mappedOptimizedCheckpoints =
                    reorderCheckpointsFromRoute(
                    newRoute.fullRoute.slice(1, -1),
                    checkpoints,
                );
                
                setCheckpoints(mappedOptimizedCheckpoints);
            }
            
            return newRoute
        },
        enabled: !!request,
    });

    return {
        route,
        isLoading,
        error,
        refetch,
    }
}