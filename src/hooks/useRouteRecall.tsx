import { getCheckpointsByTripId } from "../features/checkpoint/checkpoint.service";
import { getTripById } from "../features/trip/trip.service";
import { useTripStore } from "../store/tripStore";

export function useTripRecall(id: number) {
    const setDestination = useTripStore((state) => state.setDestination);
    const setCheckpoints = useTripStore((state) => state.setCheckpoints);
    

    async function recallTrip(): Promise<boolean> {
        try {
            const trip = await getTripById(id);

            if (!trip) { return false; }

            const checkpoints = await getCheckpointsByTripId(id);

            setDestination(trip.destination);

            setCheckpoints(checkpoints);

            return true;

        } catch (error) {
            console.log("[TripRecall] Failed to recall trip: ", error);
            return false;
        }
    }
   
    return { recallTrip }
}