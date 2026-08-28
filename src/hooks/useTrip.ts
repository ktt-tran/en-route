import { deleteTrip, getRecentTrips, getTripById } from "@/src/features/trip/trip.service";
import type { TripHistory } from "@/src/features/trip/trip.types";
import { useCallback, useEffect, useState } from "react";

// load all trips in the database
export function useTripHistory() {
    const [trips, setTrips] = useState<TripHistory[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const loadTrips = useCallback(async () => {
        try {
            setIsLoading(true);
            setError(null);

            const result = await getRecentTrips();

            setTrips(result);
        } catch (error) {
            console.error(
                "[TripHistory] Failed to load:",
                error
            );

            setError("Failed to load trip history");
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        loadTrips();
    }, [loadTrips]);

    return {
        trips,
        isLoading,
        error,
        reload: loadTrips,
    };
}

// obtain a specific trip using the id
export function useTrip(id: number) {
    const [trip, setTrip] = useState<TripHistory | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        async function loadTrip() {
            try {
                setIsLoading(true);
                setError(null);

                const result = await getTripById(id);

                setTrip(result);
            } catch (error) {
                console.error(
                    "[TripHistory] Failed to load trip:",
                    error
                );

                setError("Failed to load trip");
            } finally {
                setIsLoading(false);
            }
        }

        loadTrip();
        
    }, [id]);

    const removeTrip = useCallback(async (): Promise<boolean> => {
        if (isDeleting) { return false; }

        try {
            setIsDeleting(true);

            await deleteTrip(id);

            return true;
        } catch (error) {
            console.error(
                "[TripHistory] Failed to delete:",
                error
            );

            return false;
        } finally {
            setIsDeleting(false);
        }
    }, [id, isDeleting]);

    return {
        trip,
        isLoading,
        error,
        isDeleting,
        removeTrip,
    };
}