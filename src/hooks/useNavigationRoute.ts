import { useNavigationStore } from "@/src/store/navigationStore";
import { fetchRoute } from "../features/routing/routing.service";
import { RouteRequest } from "../features/routing/routing.types";
import { useLocation } from "./useLocation";

export function useNavigationRoute() {
    const { userLocation } = useLocation();
    const destination = useNavigationStore((state) => state.destination);
    const transportMode = useNavigationStore((state) => state.transportMode);
    const startNavigation = useNavigationStore((state) => state.startNavigation);

    async function beginNavigation(): Promise<boolean> {
        if (!userLocation || !destination) { return false; }

        const request: RouteRequest = {
            origin: userLocation.coordinates,
            destination: destination.coordinates,
            mode: transportMode,
        };

        try {
            const route = await fetchRoute(request);
            const started = startNavigation(userLocation?.coordinates, route);
            if (!started) { return false; }
            return true;
        } catch (error) {
            return false;
        }
    }

    return { beginNavigation };
}   