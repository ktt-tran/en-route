import { saveTrip } from "@/src/features/trip/trip.service";
import { useNavigationStore } from "@/src/store/navigationStore";
import { geocodeToAddress } from "../features/search/geocoding.service";
import { useTripStore } from "../store/tripStore";

export function useNavigationEnd() {
    const originCoords = useTripStore((state) => state.origin);
    const destination = useTripStore((state) => state.destination);
    const checkpoints = useTripStore((state) => state.checkpoints);
    const navigationRoute = useNavigationStore((state) => state.navigationRoute);
    const liveLocation = useNavigationStore((state) => state.liveLocation);
    const transportMode = useTripStore((state) => state.transportMode);
    const navigationStartedAt = useNavigationStore((state) => state.navigationStartedAt);
    const arrived = useNavigationStore((state) => state.arrivalDetected);
    const stopNavigation = useNavigationStore((state) => state.stopNavigation);
    

    async function commitNavigation() {
        if (
            !originCoords ||
            !destination ||
            !navigationRoute ||
            !liveLocation ||
            !navigationStartedAt
        ) {
            console.log(
                "[Navigation] Cannot save trip: missing navigation data"
            );

            return false;
        }

        try {

            const address = await geocodeToAddress(originCoords);

            const endedAt = Date.now();

            const trip = {
                origin: {
                    name: address?.name ?? "Un Named",
                    coordinates: originCoords,
                },
                checkpoints,
                destination,
                finalLocation: liveLocation,
                distanceMiles: navigationRoute.distance_miles,
                durationSeconds: navigationRoute.duration_seconds,
                transportMode,
                startedAt: navigationStartedAt,
                endedAt,
                arrived,
            };

            const tripId = await saveTrip(trip, navigationRoute.legs);

            console.log(
                "[Navigation] Trip saved:",
                tripId
            );

            // Only end the navigation session after
            // the trip has successfully been persisted.
            stopNavigation();

        } catch (error) {
            console.error(
                "[Navigation] Failed to save trip:",
                error
            );

        }
    }

    return { commitNavigation };
}