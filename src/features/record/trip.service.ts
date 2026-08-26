import type { TransportMode } from "@/src/features/routing/routing.types";
import { getDatabase } from "./trip.database";
import type { TripHistory } from "./trip.types";

interface TripRow {
    id: number;
    origin_name?: string;
    origin_latitude: number;
    origin_longitude: number;
    destination_name?: string;
    destination_latitude: number;
    destination_longitude: number;
    final_latitude: number;
    final_longitude: number;
    distance_miles: number;
    duration_seconds: number;
    transport_mode: TransportMode;
    started_at: number;
    ended_at: number;
    arrived: number;
}

function mapTripRow(row: TripRow): TripHistory {
    return {
        id: row.id,

        origin: {
            name: row.origin_name,
            coordinates: {
                latitude: row.origin_latitude,
                longitude: row.origin_longitude,
            },
        },

        destination: {
            name: row.destination_name,
            coordinates: {
                latitude: row.destination_latitude,
                longitude: row.destination_longitude,
            },
        },

        finalLocation: {
            latitude: row.final_latitude,
            longitude: row.final_longitude,
        },

        distanceMiles: row.distance_miles,

        durationSeconds: row.duration_seconds,

        transportMode:
            row.transport_mode,

        startedAt: row.started_at,

        endedAt: row.ended_at,

        arrived: row.arrived === 1,
    };
}

export async function saveTrip(trip: Omit<TripHistory, "id">): Promise<number> {
    const db = await getDatabase();

    const result = await db.runAsync(
        `
        INSERT INTO trips (
            origin_name,
            origin_latitude,
            origin_longitude,

            destination_name,
            destination_latitude,
            destination_longitude,

            final_latitude,
            final_longitude,

            distance_miles,
            duration_seconds,

            transportation_mode,

            started_at,
            ended_at,

            arrived
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `,
        
        trip.origin.name ?? null,
        trip.origin.coordinates.latitude,
        trip.origin.coordinates.longitude,

        trip.destination.name ?? null,
        trip.destination.coordinates.latitude,
        trip.destination.coordinates.longitude,

        trip.finalLocation.latitude,
        trip.finalLocation.longitude,

        trip.distanceMiles,
        trip.durationSeconds,

        trip.transportMode,

        trip.startedAt,
        trip.endedAt,

        trip.arrived ? 1 : 0
    );

    return result.lastInsertRowId;
}

export async function getRecentTrips(limit = 20): Promise<TripHistory[]> {
    const db = await getDatabase();

    const rows = await db.getAllAsync<TripRow>(
        `
        SELECT *
        FROM trips
        ORDER BY ended_at DESC
        LIMIT ?
        `,
        limit
    );

    return rows.map(mapTripRow);
}

export async function getTripById(id: number): Promise<TripHistory | null> {
    const db = await getDatabase();

    const row = await db.getFirstAsync<TripRow>(
        `
        SELECT *
        FROM trips
        WHERE id = ?
        `,
        id
    );

    if (!row) { return null; }

    return mapTripRow(row);
}

export async function deleteTrip(id: number): Promise<void> {
    const db = await getDatabase();

    await db.runAsync(
        `
        DELETE FROM trips
        WHERE id = ?
        `,
        id
    );
}