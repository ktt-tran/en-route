import { saveTrip } from "@/src/features/record/trip.service";
import { useNavigationStore } from "@/src/store/navigationStore";

export function useNavigationEnd() {
    const originCoords = useNavigationStore((state) => state.origin);
    const destination = useNavigationStore((state) => state.destination);
    const navigationRoute = useNavigationStore((state) => state.navigationRoute);
    const liveLocation = useNavigationStore((state) => state.liveLocation);
    const transportMode = useNavigationStore((state) => state.transportMode);
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

            const endedAt = Date.now();

            const originAddress = "None";

            const trip = {
                origin: {
                    name: originAddress,
                    coordinates: originCoords,
                },
                destination,
                finalLocation: liveLocation,
                distanceMiles: navigationRoute.distance_miles,
                durationSeconds: navigationRoute.duration_seconds,
                transportMode,
                startedAt: navigationStartedAt,
                endedAt,
                arrived,
            };

            const tripId = await saveTrip(trip);

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