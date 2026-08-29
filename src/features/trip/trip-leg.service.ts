import { getDatabase } from "@/src/database/sqlite-database";
import type { TripRouteLeg } from "../trip/trip.types";

interface TripLegRow {
    id: number;
    trip_id: number;
    leg_order: number;
    from_latitude: number;
    from_longitude: number;
    to_latitude: number;
    to_longitude: number;
    distance_miles: number;
    duration_seconds: number;
}

function mapTripLegRow(row: TripLegRow): TripRouteLeg {
    return {
        order: row.leg_order,

        from: {
            latitude: row.from_latitude,
            longitude: row.from_longitude,
        },

        to: {
            latitude: row.to_latitude,
            longitude: row.to_longitude,
        },

        distance_miles: row.distance_miles,
        duration_seconds: row.duration_seconds,
    };
}

export async function saveTripLeg(tripId: number, leg: TripRouteLeg): Promise<void> {

    const db = await getDatabase();

    await db.runAsync(
        `
        INSERT INTO trip_legs (
            trip_id,
            leg_order,

            from_latitude,
            from_longitude,

            to_latitude,
            to_longitude,

            distance_miles,
            duration_seconds
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `,
        tripId,
        leg.order,

        leg.from.latitude,
        leg.from.longitude,

        leg.to.latitude,
        leg.to.longitude,

        leg.distance_miles,
        leg.duration_seconds,
    );
}

export async function saveTripLegs(tripId: number, legs: TripRouteLeg[]): Promise<void> {

    for (const leg of legs) {
        await saveTripLeg(tripId, leg);
    }
}

export async function getTripLegs(tripId: number): Promise<TripRouteLeg[]> {

    const db = await getDatabase();

    const rows = await db.getAllAsync<TripLegRow>(
        `
        SELECT *
        FROM trip_legs
        WHERE trip_id = ?
        ORDER BY leg_order ASC
        `,
        tripId
    );

    return rows.map(mapTripLegRow);
}

export async function deleteTripLegs(tripId: number): Promise<void> {

    const db = await getDatabase();

    await db.runAsync(
        `
        DELETE FROM trip_legs
        WHERE trip_id = ?
        `,
        tripId
    );
}