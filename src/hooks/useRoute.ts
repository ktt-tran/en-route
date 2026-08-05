import { fetchRoute } from "@/src/features/routing/routing.service";
import { RouteRequest } from "@/src/features/routing/routing.types";
import { useQuery } from "@tanstack/react-query";

// returns function that stores the route data until it is updated
// or gets accessed for the routing information.
export function useRoute(request?: RouteRequest) {
    return useQuery({
        queryKey: [
            "route",
            request,
        ],
        queryFn: () => fetchRoute(request!),
        enabled: !!request,
    });
}