import { useNavigationStore } from "../store/navigationStore";
import { useRoute } from "./useRoute";

// instead of waiting to calculate route only when the user begins the destination,
// the route is calculated when the selected destination changes and stored in 
// React Query when the user begins the route it can be pulled from cache.
export function usePreviewRoute() {
    const origin = useNavigationStore((state) => state.origin);
    const destination = useNavigationStore((state) => state.destination);
    const transportMode = useNavigationStore((state) => state.transportMode);

    const request = origin && destination
    ? {
        origin: origin,
        destination: destination.coordinates,
        mode: transportMode,
    }: undefined;

    return useRoute(request)

}