import { fetchRoute } from "@/src/features/routing/routing.service";
import { RouteRequest, RouteResponse } from "@/src/features/routing/routing.types";
import { useQuery } from "@tanstack/react-query";

// returns function that stores the route data until it is updated
// or gets accessed for the routing information.
export function useRoute(request?: RouteRequest) {
    const { data: route, isLoading, error, refetch } = useQuery<RouteResponse>({
        queryKey: ["route", request],
        queryFn: () => {
            if (!request) {
                throw new Error("Route request is required");
            }
            return fetchRoute(request);
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