import { getDatabase } from "@/src/database/sqlite-database";
import type { Checkpoint } from "./checkpoint.types";

interface CheckpointRow {
    id: number;
    trip_id: number;
    name?: string;
    latitude: number;
    longitude: number;
    checkpoint_order: number;
}

function mapCheckpointRow(row: CheckpointRow): Checkpoint {
    return {
        id: row.id.toString(),

        placeId: {
            name: row.name,

            coordinates: {
                latitude: row.latitude,
                longitude: row.longitude,
            },
        },

        order: row.checkpoint_order,
    };
}

export async function saveCheckpoint(tripId: number, checkpoint: Checkpoint): Promise<void> {
    const db = await getDatabase();

    console.log("[CheckpointService] Saving Checkpoint initialized");

    await db.runAsync(
        `
        INSERT INTO checkpoints (
            trip_id,
            name,
            latitude,
            longitude,
            checkpoint_order
        )
        VALUES (?, ?, ?, ?, ?)
        `,
        tripId,
        checkpoint.placeId.name ?? null,
        checkpoint.placeId.coordinates.latitude,
        checkpoint.placeId.coordinates.longitude,
        checkpoint.order
    );
    
}

export async function getCheckpointsByTripId(tripId: number): Promise<Checkpoint[]> {
    const db = await getDatabase();

    const rows = await db.getAllAsync<CheckpointRow>(
        `
        SELECT
            id,
            trip_id,
            name,
            latitude,
            longitude,
            checkpoint_order
        FROM checkpoints
        WHERE trip_id = ?
        ORDER BY checkpoint_order ASC
        `,
        tripId
    );

    return rows.map(mapCheckpointRow);
}

export async function deleteCheckpoint(id: string): Promise<void> {
    const db = await getDatabase();

    await db.runAsync(
        `
        DELETE FROM checkpoints
        WHERE id = ?
        `,
        Number(id)
    );
}

export async function deleteCheckpointsForTrip(tripId: number): Promise<void> {
    const db = await getDatabase();

    await db.runAsync(
        `
        DELETE FROM checkpoints
        WHERE trip_id = ?
        `,
        tripId
    );
}

export async function reorderCheckpoints(tripId: number, checkpoints: Checkpoint[]): Promise<void> {
    const db = await getDatabase();

    await db.withTransactionAsync(async () => {
        for (
            let index = 0;
            index < checkpoints.length;
            index++
        ) {
            await db.runAsync(
                `
                UPDATE checkpoints
                SET checkpoint_order = ?
                WHERE id = ?
                AND trip_id = ?
                `,
                index,
                Number(checkpoints[index].id),
                tripId
            );
        }
    });
}